import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Room360, Hotspot } from '../types/property';

interface PanoramaViewerProps {
  rooms: Room360[];
  initialRoomId?: string;
  onRoomChange?: (roomId: string) => void;
  height?: string;
}

/**
 * Controlador de Orientação do Dispositivo em Three.js para Giroscópio e Óculos VR
 * Converte rotação física (alpha, beta, gamma) diretamente em Quaternion da Câmera 3D.
 */
class DeviceOrientationController {
  camera: THREE.PerspectiveCamera;
  enabled: boolean = true;
  deviceOrientation: { alpha: number; beta: number; gamma: number } | null = null;
  screenOrientation: number = 0;

  private zee = new THREE.Vector3(0, 0, 1);
  private euler = new THREE.Euler();
  private q0 = new THREE.Quaternion();
  private q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 no eixo X

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  setDeviceOrientation(alpha: number, beta: number, gamma: number) {
    this.deviceOrientation = { alpha, beta, gamma };
  }

  setScreenOrientation(angle: number) {
    this.screenOrientation = angle;
  }

  update() {
    if (!this.enabled || !this.deviceOrientation) return;

    const alpha = Number.isFinite(this.deviceOrientation.alpha)
      ? THREE.MathUtils.degToRad(this.deviceOrientation.alpha)
      : 0;
    const beta = Number.isFinite(this.deviceOrientation.beta)
      ? THREE.MathUtils.degToRad(this.deviceOrientation.beta)
      : 0;
    const gamma = Number.isFinite(this.deviceOrientation.gamma)
      ? THREE.MathUtils.degToRad(this.deviceOrientation.gamma)
      : 0;
    const orient = Number.isFinite(this.screenOrientation)
      ? THREE.MathUtils.degToRad(this.screenOrientation)
      : 0;

    // Convenção Three.js para giroscópio de smartphone ('YXZ')
    this.euler.set(beta, alpha, -gamma, 'YXZ');
    this.camera.quaternion.setFromEuler(this.euler);
    this.camera.quaternion.multiply(this.q1); // Câmera aponta para a traseira do celular
    this.camera.quaternion.multiply(this.q0.setFromAxisAngle(this.zee, -orient)); // Alinhamento com a orientação da tela
  }
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  rooms,
  initialRoomId,
  onRoomChange,
  height = '460px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRoomId, setActiveRoomId] = useState<string>(initialRoomId || rooms[0]?.id || '');
  const [isVRMode, setIsVRMode] = useState(false);
  const [isGyro, setIsGyro] = useState(true);
  const [hasSensorData, setHasSensorData] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roomNotification, setRoomNotification] = useState<string | null>(null);
  const [sensorStatusMsg, setSensorStatusMsg] = useState<string>('');

  const isVRModeRef = useRef(false);
  const isGyroRef = useRef(true);
  const hasInteractedRef = useRef(false);

  // Sincroniza refs para uso seguro dentro do loop de animação
  useEffect(() => {
    isVRModeRef.current = isVRMode;
  }, [isVRMode]);

  useEffect(() => {
    isGyroRef.current = isGyro;
  }, [isGyro]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const stereoCameraRef = useRef<THREE.StereoCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const controllerRef = useRef<DeviceOrientationController | null>(null);
  const wakeLockRef = useRef<any>(null);

  // Offset manual de rotação (permite arrastar mesmo com giroscópio ligado)
  const offsetQuaternion = useRef(new THREE.Quaternion());
  const tempQ = useRef(new THREE.Quaternion());

  // Estado para fallback de toque/mouse
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const lonRef = useRef(0);
  const latRef = useRef(0);
  const targetLonRef = useRef(0);
  const targetLatRef = useRef(0);
  const fovRef = useRef(75);

  const deviceOrientationStateRef = useRef<{ alpha: number; beta: number; gamma: number } | null>(null);

  const currentRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  // Textura procedural decorada para fallback instantâneo
  const createLuxuryFallbackTexture = (roomName: string): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 1024);
      grad.addColorStop(0, '#0a0d14');
      grad.addColorStop(0.35, '#191e2b');
      grad.addColorStop(0.55, '#3b2f21');
      grad.addColorStop(0.7, '#6b4d24');
      grad.addColorStop(0.85, '#1f1b17');
      grad.addColorStop(1, '#0c0b0a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 2048, 1024);

      for (let i = 0; i < 8; i++) {
        const x = i * 256 + 60;
        const beamGrad = ctx.createRadialGradient(x, 400, 20, x, 650, 240);
        beamGrad.addColorStop(0, 'rgba(242, 202, 80, 0.45)');
        beamGrad.addColorStop(1, 'rgba(242, 202, 80, 0)');
        ctx.fillStyle = beamGrad;
        ctx.fillRect(x - 200, 300, 400, 500);

        ctx.fillStyle = 'rgba(15, 17, 22, 0.85)';
        ctx.fillRect(x - 18, 200, 36, 700);
      }

      ctx.fillStyle = 'rgba(242, 202, 80, 0.15)';
      for (let y = 650; y < 1024; y += 45) {
        ctx.fillRect(0, y, 2048, 1.5);
      }
      for (let x = 0; x < 2048; x += 120) {
        ctx.fillRect(x, 650, 1.5, 374);
      }

      ctx.fillStyle = 'rgba(242, 202, 80, 0.95)';
      ctx.font = 'bold 38px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText(`RECÔNCAVO PRIME • ${roomName.toUpperCase()}`, 1024, 480);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Imersão Espacial WebXR 360° • Giroscópio Ativo', 1024, 525);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  };

  const loadRoomTexture = useCallback((room: Room360) => {
    if (!sphereRef.current) return;
    setIsLoading(true);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    textureLoader.load(
      room.panoramaUrl,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        if (sphereRef.current) {
          const mat = sphereRef.current.material as THREE.MeshBasicMaterial;
          mat.map = texture;
          mat.needsUpdate = true;
        }
        setIsLoading(false);
      },
      undefined,
      () => {
        const fallbackTex = createLuxuryFallbackTexture(room.name);
        if (sphereRef.current) {
          const mat = sphereRef.current.material as THREE.MeshBasicMaterial;
          mat.map = fallbackTex;
          mat.needsUpdate = true;
        }
        setIsLoading(false);
      }
    );
  }, []);

  // Solicitação Explícita de Sensores (iOS 13+ e Android)
  const requestGyroPermission = async () => {
    try {
      const DeviceOrientationTyped = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      };

      if (
        typeof DeviceOrientationTyped !== 'undefined' &&
        typeof DeviceOrientationTyped.requestPermission === 'function'
      ) {
        const permission = await DeviceOrientationTyped.requestPermission();
        if (permission === 'granted') {
          setIsGyro(true);
          setSensorStatusMsg('Permissão concedida! Mova o aparelho.');
        } else {
          setSensorStatusMsg('Permissão de sensores negada no navegador.');
        }
      } else {
        setIsGyro(true);
        setSensorStatusMsg('Mova seu celular para navegar em 360°');
      }
    } catch (err: any) {
      console.warn('Erro ao solicitar giroscópio:', err);
      setIsGyro(true);
      setSensorStatusMsg('Giroscópio habilitado!');
    }

    setTimeout(() => setSensorStatusMsg(''), 3000);
  };

  // Alterna o Modo VR Box (Óculos VR) com Tela Dividida Estereoscópica
  const toggleVRMode = async () => {
    const nextMode = !isVRMode;
    setIsVRMode(nextMode);

    await requestGyroPermission();

    if (nextMode) {
      // Solicita tela cheia
      try {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if ((elem as any).webkitRequestFullscreen) {
          await (elem as any).webkitRequestFullscreen();
        }
      } catch (e) {
        console.warn('Fullscreen indisponível:', e);
      }

      // Impede o celular de apagar a tela dentro do óculos VR
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        }
      } catch (e) {
        console.warn('WakeLock indisponível:', e);
      }

      // Trava em modo paisagem se suportado
      try {
        if (window.screen?.orientation && 'lock' in window.screen.orientation) {
          await (window.screen.orientation as any).lock('landscape');
        }
      } catch (e) {}

      // Atualiza o viewport do Three.js imediatamente para tela cheia
      setTimeout(() => {
        if (rendererRef.current && cameraRef.current) {
          const w = window.innerWidth;
          const h = window.innerHeight;
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }, 50);
    } else {
      // Sair do VR
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (e) {}

      if (wakeLockRef.current) {
        try {
          wakeLockRef.current.release();
        } catch (e) {}
        wakeLockRef.current = null;
      }

      // Restaura dimensões do container
      setTimeout(() => {
        if (rendererRef.current && cameraRef.current && containerRef.current) {
          const w = containerRef.current.clientWidth || 390;
          const h = containerRef.current.clientHeight || 460;
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }, 50);
    }
  };

  // Escuta os Sensores de Movimento em Tempo Real
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha === null && e.beta === null && e.gamma === null) return;

      const alpha = e.alpha ?? 0;
      const beta = e.beta ?? 0;
      const gamma = e.gamma ?? 0;

      if (!hasSensorData) {
        setHasSensorData(true);
      }

      deviceOrientationStateRef.current = { alpha, beta, gamma };

      if (controllerRef.current) {
        controllerRef.current.setDeviceOrientation(alpha, beta, gamma);
        const screenAngle =
          window.screen?.orientation?.angle ??
          (typeof window.orientation === 'number' ? (window.orientation as number) : 0);
        controllerRef.current.setScreenOrientation(screenAngle);
      }
    };

    const handleScreenChange = () => {
      if (controllerRef.current) {
        const screenAngle =
          window.screen?.orientation?.angle ??
          (typeof window.orientation === 'number' ? (window.orientation as number) : 0);
        controllerRef.current.setScreenOrientation(screenAngle);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('deviceorientationabsolute' as any, handleOrientation, true);
    window.addEventListener('orientationchange', handleScreenChange);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('deviceorientationabsolute' as any, handleOrientation, true);
      window.removeEventListener('orientationchange', handleScreenChange);
    };
  }, [hasSensorData]);

  // Inicialização Única do Three.js e Render Loop Estável
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 390;
    const heightPx = container.clientHeight || 460;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(fovRef.current, width / heightPx, 1, 1100);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    // Câmera Estereoscópica para Óculos VR
    const stereoCamera = new THREE.StereoCamera();
    stereoCamera.aspect = 0.5;
    stereoCamera.eyeSep = 0.064;
    stereoCameraRef.current = stereoCamera;

    const controller = new DeviceOrientationController(camera);
    controllerRef.current = controller;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, heightPx);
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Esfera 360 Invertida
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const initialTexture = createLuxuryFallbackTexture(currentRoom?.name || 'Ambiente');
    const material = new THREE.MeshBasicMaterial({ map: initialTexture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    if (currentRoom) {
      loadRoomTexture(currentRoom);
    }

    // Loop de Renderização Contínuo e Seguro
    let lastTime = performance.now();
    const render = () => {
      animFrameIdRef.current = requestAnimationFrame(render);
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

      const curVR = isVRModeRef.current;
      const curGyro = isGyroRef.current;

      // Atualiza ângulo de rotação da tela
      const currentAngle =
        window.screen?.orientation?.angle ??
        (typeof window.orientation === 'number' ? (window.orientation as number) : 0);
      controller.setScreenOrientation(currentAngle);

      // Controle via Giroscópio
      if (curGyro && deviceOrientationStateRef.current && controllerRef.current) {
        controllerRef.current.update();
        cameraRef.current.quaternion.multiply(offsetQuaternion.current);
      } else {
        // Fallback por arraste/mouse
        lonRef.current += (targetLonRef.current - lonRef.current) * 0.15;
        latRef.current += (targetLatRef.current - latRef.current) * 0.15;

        if (!isDraggingRef.current && !hasInteractedRef.current && !curGyro) {
          targetLonRef.current += delta * 1.5;
        }

        latRef.current = Math.max(-85, Math.min(85, latRef.current));
        const phi = THREE.MathUtils.degToRad(90 - latRef.current);
        const theta = THREE.MathUtils.degToRad(lonRef.current);

        const targetX = 500 * Math.sin(phi) * Math.cos(theta);
        const targetY = 500 * Math.cos(phi);
        const targetZ = 500 * Math.sin(phi) * Math.sin(theta);
        cameraRef.current.lookAt(targetX, targetY, targetZ);
      }

      // RENDERIZAÇÃO ESTEREOSCÓPICA VR OU NORMAL
      if (curVR && stereoCameraRef.current) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const halfW = Math.floor(w / 2);

        rendererRef.current.setSize(w, h);
        rendererRef.current.setScissorTest(true);

        cameraRef.current.updateMatrixWorld();
        stereoCameraRef.current.update(cameraRef.current);

        // Olho Esquerdo
        rendererRef.current.setViewport(0, 0, halfW, h);
        rendererRef.current.setScissor(0, 0, halfW, h);
        rendererRef.current.render(sceneRef.current, stereoCameraRef.current.cameraL);

        // Olho Direito
        rendererRef.current.setViewport(halfW, 0, halfW, h);
        rendererRef.current.setScissor(halfW, 0, halfW, h);
        rendererRef.current.render(sceneRef.current, stereoCameraRef.current.cameraR);

        rendererRef.current.setScissorTest(false);
      } else {
        const curContainer = containerRef.current;
        const w = curContainer?.clientWidth || 390;
        const h = curContainer?.clientHeight || 460;
        rendererRef.current.setSize(w, h);
        rendererRef.current.setViewport(0, 0, w, h);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    render();

    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current) return;
      const isVR = isVRModeRef.current;
      const w = isVR ? window.innerWidth : containerRef.current?.clientWidth || 390;
      const h = isVR ? window.innerHeight : containerRef.current?.clientHeight || 460;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []); // Executa apenas uma vez no mount!

  // Troca de Cômodo
  useEffect(() => {
    if (currentRoom) {
      loadRoomTexture(currentRoom);
    }
  }, [activeRoomId, currentRoom, loadRoomTexture]);

  // Controles de Toque / Mouse
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: clientX, y: clientY };
    hasInteractedRef.current = true;
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - prevMousePosRef.current.x;
    const dy = clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: clientX, y: clientY };

    if (isGyro && deviceOrientationStateRef.current) {
      const speed = 0.004;
      tempQ.current.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -dx * speed);
      offsetQuaternion.current.premultiply(tempQ.current);

      tempQ.current.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -dy * speed);
      offsetQuaternion.current.multiply(tempQ.current);
    } else {
      targetLonRef.current -= dx * 0.22;
      targetLatRef.current += dy * 0.22;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleSelectRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    if (onRoomChange) onRoomChange(roomId);
    setActiveHotspot(null);

    const r = rooms.find((rm) => rm.id === roomId);
    if (r) {
      setRoomNotification(`Cômodo: ${r.name}`);
      setTimeout(() => setRoomNotification(null), 2500);
    }
  };

  const handleNextRoomVR = () => {
    const currentIndex = rooms.findIndex((r) => r.id === activeRoomId);
    const nextIndex = (currentIndex + 1) % rooms.length;
    const nextRoom = rooms[nextIndex];
    if (nextRoom) {
      handleSelectRoom(nextRoom.id);
    }
  };

  const handleRecenter = () => {
    offsetQuaternion.current.identity();
    targetLonRef.current = 0;
    targetLatRef.current = 0;
    lonRef.current = 0;
    latRef.current = 0;
  };

  return (
    <div
      className={
        isVRMode
          ? 'fixed inset-0 z-[9999] w-screen h-screen bg-black select-none overflow-hidden touch-none'
          : 'relative w-full overflow-hidden select-none bg-[#0d0e11]'
      }
      style={isVRMode ? undefined : { height }}
    >
      {/* Viewport 3D Canvas WebGL */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
          if (!hasSensorData) requestGyroPermission();
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handlePointerUp}
      />

      {/* ======================================================== */}
      {/* INTERFACE DO MODO ÓCULOS VR (SPLIT SCREEN CARD / VR BOX)  */}
      {/* ======================================================== */}
      {isVRMode && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          {/* Linha Divisória Óptica Central */}
          <div className="absolute inset-y-0 left-1/2 w-1.5 bg-black shadow-[0_0_15px_rgba(0,0,0,1)] -translate-x-1/2" />

          {/* Mira Olho Esquerdo */}
          <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-5 h-5 border-2 border-primary/80 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
          </div>

          {/* Mira Olho Direito */}
          <div className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-5 h-5 border-2 border-primary/80 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
          </div>

          {/* Notificação no VR */}
          {roomNotification && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex gap-16">
              <div className="px-3.5 py-1.5 bg-black/85 border border-primary/70 rounded-full text-xs text-primary font-bold shadow-xl">
                {roomNotification}
              </div>
              <div className="px-3.5 py-1.5 bg-black/85 border border-primary/70 rounded-full text-xs text-primary font-bold shadow-xl">
                {roomNotification}
              </div>
            </div>
          )}

          {/* Botão Sair do Modo VR */}
          <div className="absolute top-4 right-4 pointer-events-auto z-50">
            <button
              onClick={toggleVRMode}
              className="px-4 py-2 rounded-full bg-black/80 border border-white/30 text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 shadow-2xl cursor-pointer hover:border-red-400"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              <span>Sair do VR</span>
            </button>
          </div>

          {/* Botão Trocar Cômodo no VR */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto z-50">
            <button
              onClick={handleNextRoomVR}
              className="px-5 py-2.5 rounded-full bg-primary text-black font-extrabold text-xs shadow-2xl flex items-center gap-2 active:scale-95 cursor-pointer hover:brightness-110"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">navigate_next</span>
              <span>Próximo Cômodo</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* INTERFACE PADRÃO (QUANDO NÃO ESTÁ EM VR)                 */}
      {/* ======================================================== */}
      {!isVRMode && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-[#121316]/50 pointer-events-none" />

          {/* Notificação de Status do Sensor */}
          {sensorStatusMsg && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-[#1f1f23]/95 border border-primary/60 text-primary text-xs font-bold shadow-2xl animate-bounce">
              {sensorStatusMsg}
            </div>
          )}

          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1f1f23]/90 backdrop-blur-md shadow-lg border border-white/10 pointer-events-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-semibold text-[11px] tracking-wider uppercase text-primary">
                🔴 Tour 360° Recôncavo Prime
              </span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={requestGyroPermission}
                className={`px-3.5 py-1.5 rounded-full backdrop-blur-md border flex items-center gap-1.5 shadow-lg active:scale-95 transition-all text-xs font-semibold cursor-pointer ${
                  hasSensorData && isGyro
                    ? 'bg-primary/25 text-primary border-primary shadow-[0_0_15px_rgba(242,202,80,0.4)]'
                    : 'bg-[#1f1f23]/90 text-white border-white/20 hover:border-primary'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[17px]">
                  {hasSensorData && isGyro ? 'screen_rotation' : 'sensors'}
                </span>
                <span>{hasSensorData && isGyro ? 'Giroscópio Ativo 📱' : 'Ativar Giroscópio 📱'}</span>
              </button>

              <button
                onClick={handleRecenter}
                title="Recentralizar Visão"
                className="w-8 h-8 rounded-full bg-[#1f1f23]/90 backdrop-blur-md border border-white/10 flex items-center justify-center text-secondary hover:text-primary active:scale-95 transition-all cursor-pointer shadow-md"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">filter_center_focus</span>
              </button>
            </div>
          </div>

          {/* Botão de Modo VR */}
          <div className="absolute bottom-20 right-4 z-30 flex flex-col items-end gap-1 pointer-events-auto">
            <button
              onClick={toggleVRMode}
              type="button"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary-container text-black font-extrabold shadow-[0_4px_25px_rgba(242,202,80,0.5)] hover:scale-105 active:scale-95 transition-all text-xs tracking-wider cursor-pointer border border-white/20"
            >
              <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              <span>ÓCULOS VR (SPLIT SCREEN)</span>
            </button>
            <span className="text-[11px] text-[#d0c5af]/80 pr-1">
              Encaixe o smartphone no óculos VR
            </span>
          </div>

          {/* Hotspots */}
          {currentRoom?.hotspots && currentRoom.hotspots.length > 0 && (
            <div className="absolute top-16 left-4 z-20 flex flex-col gap-1.5 pointer-events-auto">
              {currentRoom.hotspots.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => {
                    if (hs.targetRoomId) {
                      handleSelectRoom(hs.targetRoomId);
                    } else {
                      setActiveHotspot(activeHotspot?.id === hs.id ? null : hs);
                    }
                  }}
                  type="button"
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1f23]/90 hover:bg-[#343538] backdrop-blur-md border border-primary/30 text-white shadow-md active:scale-95 transition-all text-[11px]"
                >
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span className="text-primary font-medium">{hs.title}</span>
                  {hs.targetRoomId && (
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      arrow_forward
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Detalhes do Hotspot */}
          {activeHotspot && (
            <div className="absolute top-28 left-4 z-30 max-w-xs p-3 rounded-xl bg-[#1f1f23]/95 backdrop-blur-xl border border-primary/40 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-1">
                <span className="text-primary text-xs font-bold uppercase tracking-wider">
                  {activeHotspot.title}
                </span>
                <button onClick={() => setActiveHotspot(null)} className="text-secondary hover:text-white">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              {activeHotspot.description && (
                <p className="text-xs text-[#d0c5af] leading-relaxed pt-1">
                  {activeHotspot.description}
                </p>
              )}
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-15 flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1f1f23]/90 text-primary text-xs">
                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                <span>Carregando esfera 360°...</span>
              </div>
            </div>
          )}

          {/* Seletor de Cômodos */}
          <div className="absolute bottom-3 inset-x-0 z-30 px-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {rooms.map((room) => {
                const isActive = room.id === activeRoomId;
                return (
                  <button
                    key={room.id}
                    onClick={() => handleSelectRoom(room.id)}
                    type="button"
                    className={`whitespace-nowrap shrink-0 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-[#3c2f00] shadow-[0_2px_12px_rgba(242,202,80,0.35)] font-bold'
                        : 'bg-[#1f1f23]/90 text-white hover:text-primary backdrop-blur-md border border-white/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {room.icon || 'view_in_ar'}
                    </span>
                    <span>{room.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
