import { Property } from '../types/property';

export const BROKER_DEFAULT = {
  name: 'Carlos Eduardo Mendonça',
  creci: 'CRECI 18.420-BA',
  phone: '5575998876543',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfDbukAmKHCIdvYxnk4bEL46r_QEJQWmfGLV68aDQj0Ft3Can82tNxWiSxzWfYl3R9m_wHr0UKlrTv0SukjECXiYESNxE6iEf3to6HS0gAmahM32mJg0J8qUYk-iKx1D_dr8vptns4_ocqLvlJbCadfpt96Ioi6PEwvCqMgHY_ccMAmlnghKv9QHFF1WcVdMxImMIc8YFxQdDe1u3EIMy-9_E0Q0qx2_-keDoL-_TPKW-PG9_hkVtshA',
  rating: 5.0,
  responseTime: '3 min',
  isOnline: true,
};

export const PROPERTIES: Property[] = [
  {
    id: 'mansao-alphaville',
    title: 'Mansão Alphaville Recôncavo',
    category: 'mansao',
    categoryLabel: 'Condomínio Fechado',
    neighborhood: 'Bairro Urbis III',
    city: 'Santo Antônio de Jesus - BA',
    price: 3850000,
    condoFee: 1100,
    iptu: 'Isento 2024',
    suites: 4,
    bathrooms: 5,
    areaM2: 520,
    garageSlots: 4,
    hasVirtualTour: true,
    exclusive: true,
    featuredTag: '⭐ Tour Virtual 360° Disponível',
    rating: 5.0,
    ratingLabel: 'Imóvel Singular',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlGec1S9-uWoyKbGBVsdaF9sFRbljFpZbR2qLOcrcvkVl_Vy1Uyf2Z2HSuV5m4r-5AqvJqNY37iEVhiXQ2u12itEs_IPzDyLyzmqDevkcU0aHWbI7PxmipT7T3OmZuz1ZR3I-e7r7fNHgNhakBfKNqf-qIAAFgitKNmcG8ziN1staHIy8lWwdG3QjbLr9lQmOahaZtseaF8ilKtgtCbcUvk0_tRL_jJaD84SOowIeHL3xY0Xntg9bdFg',
    descriptionParagraphs: [
      'Erguida no ponto mais nobre do condomínio fechado mais reservado de Santo Antônio de Jesus, a Mansão Alphaville sintetiza o encontro da arquitetura modernista brasileira com a serenidade do Recôncavo Baiano.',
      'Suas linhas arrojadas valorizam a ventilação cruzada nativa, mármores nacionais nobres e marcenaria assinada. O projeto prioriza privacidade absoluta com isolamento acústico perimetral e jardins tropicais com irrigação automatizada.'
    ],
    smartHomeFeatures: 'Energia solar fotovoltaica 100% autônoma, automação Control4 com controle via iPad e biometria integrada.',
    leisureFeatures: 'Borda infinita com raia de 18m, hidro aquecida, espaço gourmet climatizado com churrasqueira a carvão e parrilla.',
    mapCoordinates: { x: 54, y: 48, lat: -12.9714, lng: -39.2608 },
    pinLabel: 'R$ 3.85M',
    rooms360: [
      {
        id: 'living',
        name: '1. Living & Lareira',
        icon: 'chair',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3GUV26sLAycamI1Qpcyw8_MwQWrGA_8wq8WvKBGVCs-2aut0ins3wene6zACGPbZzMmlvQtjGpa_45Da-oou6ChO4ID27jBmg6_a_2lihJZbjqJofRzW-eR9ZlhB7HMba__bWaLdasliKf9vB132hiJjrIqcjv0MVC_-hydEvegPCAREHSH_EkSw39p7NWP0HSMf9Mciko4e6SZvW-wBkxnjfeCfsbSiJZK5CUxGI__IA8YBaNzj-lg',
        hotspots: [
          { id: 'h1', title: 'Pé-direito Duplo 6.8m', description: 'Revestimento em Travertino Navona', yaw: 45, pitch: 10 },
          { id: 'h2', title: 'Ir para Suíte Master', targetRoomId: 'suite', yaw: 130, pitch: -5 },
          { id: 'h3', title: 'Área Gourmet Externa', targetRoomId: 'gourmet', yaw: 240, pitch: 0 }
        ]
      },
      {
        id: 'suite',
        name: '2. Suíte Master',
        icon: 'king_bed',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3DUTDfPHrbUlUxkd9ZIxaC2pYLn6nBgxIjjdm_cY481ZyPiEolnBI9yAH3R7w5qujgvc4kFnsL9iugBAFTfVE3iqAiXOcWdant9q_FjBSFPqcvY9cNDuQEfZkTMwBQcDPSt0QViYbfFOQ4Pr8RHa1Z6yqI-dumsetAs53j-6dQ3xn6KtWRhVAP7OCGXjXrJjPyZV_B9-rYkkr7Q0o52Y4Nqj0eyI2zDaHcJ7A-seyinwVdabP8ykA_w',
        hotspots: [
          { id: 'h4', title: 'Varanda com Vista Privativa', yaw: 90, pitch: 5 },
          { id: 'h5', title: 'Retornar ao Living', targetRoomId: 'living', yaw: 270, pitch: -8 }
        ]
      },
      {
        id: 'gourmet',
        name: '3. Gourmet & Piscina',
        icon: 'pool',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvfpzZIWe7BpnJVFMSR4czkNU0PdcNvL1kv86ZWxCtxoeQZWqzIFAjn3nKRKu7ztqLyesAWE-FW1o71DU6pIiMUl-SAnh3PUazdOe95XrTmtHewKFa1wJnUNMPcG0Qj4LLc1opBRSAGjtQHoTx9oq8-dqQY6u24xuKaT3DGxdO3qz-DRX-4d967g33HqzTA7LDkU3yTtXkkoFAc7LpAkTua4gnQewCLuij-zWxKBbP83iN9pihV902qA',
        hotspots: [
          { id: 'h6', title: 'Piscina com Borda Infinita', yaw: 180, pitch: -15 },
          { id: 'h7', title: 'Acesso à Adega Subterrânea', targetRoomId: 'adega', yaw: 310, pitch: -10 }
        ]
      },
      {
        id: 'adega',
        name: '4. Adega Climatizada',
        icon: 'wine_bar',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcUTQyaVMvJRzTjebEjVvbnQkk58ptepnI5-uLS4-iw2rI8l2_3salblwB_x2jJqvGKM-FdbeBB1oIIJtWFSOIu3pTAzXhBnzq5BQMh2jmMpY4cF6MIyeF3YuYjju1qQU2C58OlZ2YW08xLlP4XYVnJ8pHj4u0aE75XNwwPVqnYAJ44nfxnvn17f3OFqe-7UqbaTzmPOyyJ3IQx0MBbQiUPLK3WWipfdiGbeDVtztfmraLTrVNhCiG2g',
        hotspots: [
          { id: 'h8', title: 'Capacidade 850 Rótulos', yaw: 60, pitch: 0 },
          { id: 'h9', title: 'Retornar ao Living', targetRoomId: 'living', yaw: 210, pitch: -5 }
        ]
      }
    ],
    broker: BROKER_DEFAULT
  },
  {
    id: 'residencia-villa-imperial',
    title: 'Residência Villa Imperial Recôncavo',
    category: 'mansao',
    categoryLabel: 'Exclusividade Prime',
    neighborhood: 'Bairro Andaiá / Zona Nobre',
    city: 'Santo Antônio de Jesus • BA',
    price: 4200000,
    condoFee: 1200,
    iptu: 'R$ 450/mês',
    suites: 5,
    bathrooms: 6,
    areaM2: 680,
    garageSlots: 6,
    hasVirtualTour: true,
    exclusive: true,
    featuredTag: '⭐ Imóvel de Revista',
    rating: 5.0,
    ratingLabel: 'Imóvel Singular',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTggx-sZHwnw8Ak2pemn8wdD6hrIikrCinukOCTXqTVvQBtiIgD0d2jRi0xjY64_FD_53MagNUTpb-KRAl_mKEg6eBIDlODU6i4N8sghbuvR02Av6ewhf8ei8k34WwP8Dq2gUnaPJXErYcKqandCj63LrZvV8rCz_4maIk56xMfWIlM-_U9yZ85p5voV0UaOASI--dVQCWRJa15Vt5cA-uYQHQFNPhkqFmxNI1bFe4PHVc65Kb27Cyyg',
    descriptionParagraphs: [
      'Erguida no ponto mais nobre do condomínio fechado mais reservado de Santo Antônio de Jesus, a Villa Imperial sintetiza o encontro da arquitetura modernista brasileira com a serenidade do Recôncavo Baiano.',
      'Suas linhas arrojadas valorizam a ventilação cruzada nativa, mármores nacionais nobres e marcenaria assinada. O projeto prioriza privacidade absoluta com isolamento acústico perimetral, jardins tropicais com irrigação automatizada e vista ininterrupta para as colinas verdes da região.'
    ],
    smartHomeFeatures: 'Energia solar fotovoltaica 100% autônoma, automação Control4 com controle via iPad e biometria integrada.',
    leisureFeatures: 'Piscina aquecida com borda infinita, espaço fitness privativo Technogym e fireplace externo em pedra sabão.',
    mapCoordinates: { x: 22, y: 64, lat: -12.9680, lng: -39.2680 },
    pinLabel: 'R$ 4.5M',
    rooms360: [
      {
        id: 'living',
        name: '1. Living & Lareira',
        icon: 'chair',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3GUV26sLAycamI1Qpcyw8_MwQWrGA_8wq8WvKBGVCs-2aut0ins3wene6zACGPbZzMmlvQtjGpa_45Da-oou6ChO4ID27jBmg6_a_2lihJZbjqJofRzW-eR9ZlhB7HMba__bWaLdasliKf9vB132hiJjrIqcjv0MVC_-hydEvegPCAREHSH_EkSw39p7NWP0HSMf9Mciko4e6SZvW-wBkxnjfeCfsbSiJZK5CUxGI__IA8YBaNzj-lg'
      },
      {
        id: 'suite',
        name: '2. Suíte Master',
        icon: 'king_bed',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3DUTDfPHrbUlUxkd9ZIxaC2pYLn6nBgxIjjdm_cY481ZyPiEolnBI9yAH3R7w5qujgvc4kFnsL9iugBAFTfVE3iqAiXOcWdant9q_FjBSFPqcvY9cNDuQEfZkTMwBQcDPSt0QViYbfFOQ4Pr8RHa1Z6yqI-dumsetAs53j-6dQ3xn6KtWRhVAP7OCGXjXrJjPyZV_B9-rYkkr7Q0o52Y4Nqj0eyI2zDaHcJ7A-seyinwVdabP8ykA_w'
      },
      {
        id: 'gourmet',
        name: '3. Gourmet & Piscina',
        icon: 'pool',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvfpzZIWe7BpnJVFMSR4czkNU0PdcNvL1kv86ZWxCtxoeQZWqzIFAjn3nKRKu7ztqLyesAWE-FW1o71DU6pIiMUl-SAnh3PUazdOe95XrTmtHewKFa1wJnUNMPcG0Qj4LLc1opBRSAGjtQHoTx9oq8-dqQY6u24xuKaT3DGxdO3qz-DRX-4d967g33HqzTA7LDkU3yTtXkkoFAc7LpAkTua4gnQewCLuij-zWxKBbP83iN9pihV902qA'
      },
      {
        id: 'adega',
        name: '4. Adega Climatizada',
        icon: 'wine_bar',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcUTQyaVMvJRzTjebEjVvbnQkk58ptepnI5-uLS4-iw2rI8l2_3salblwB_x2jJqvGKM-FdbeBB1oIIJtWFSOIu3pTAzXhBnzq5BQMh2jmMpY4cF6MIyeF3YuYjju1qQU2C58OlZ2YW08xLlP4XYVnJ8pHj4u0aE75XNwwPVqnYAJ44nfxnvn17f3OFqe-7UqbaTzmPOyyJ3IQx0MBbQiUPLK3WWipfdiGbeDVtztfmraLTrVNhCiG2g'
      }
    ],
    broker: BROKER_DEFAULT
  },
  {
    id: 'cobertura-jardim-brasil',
    title: 'Cobertura Duplex Jardim Brasil',
    category: 'cobertura',
    categoryLabel: 'Destaque Penthouse',
    neighborhood: 'Centro / Jardim Brasil',
    city: 'Santo Antônio de Jesus - BA',
    price: 2400000,
    condoFee: 880,
    iptu: 'R$ 320/mês',
    suites: 3,
    bathrooms: 4,
    areaM2: 265,
    garageSlots: 3,
    hasVirtualTour: true,
    exclusive: false,
    featuredTag: 'Jacuzzi & Deck Panorâmico',
    rating: 4.9,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUnneUTD6Ez3ulA0isvByko5v56BTp_Nab4hO-8LZJLJP3j1htBRai_cmQtt1zTu8Xt8AsOniPsXuL591mJBD11J2c9DHH4Y9RcekdyUUapY9HiADtEvV7QiKeeoxeefEIwkB31E5BJdt22InStpEXNSKa8F54tsBkfcrQucegwUcqYbsDfvu3DAa2NwLuOHDLoyRzq1V5tWk-xnvf24eupJZEK9n5ikJCplcchGqzJ7C1sKxRy0vPnQ',
    descriptionParagraphs: [
      'Cobertura duplex contemporânea no coração da cidade com vista panorâmica definitiva de 360° para o skyline de Santo Antônio de Jesus e morros verdes.',
      'Espaço zen superior com solarium em madeira cumaru, spa aquecido para 6 pessoas e living integrado com lareira ecológica.'
    ],
    smartHomeFeatures: 'Iluminação automatizada Lutron, persianas elétricas somfy e fechadura digital Yale.',
    leisureFeatures: 'Spa aquecido privativo no rooftop, churrasqueira gourmet e adega embutida.',
    mapCoordinates: { x: 78, y: 20, lat: -12.9690, lng: -39.2550 },
    pinLabel: 'R$ 2.8M',
    rooms360: [
      {
        id: 'living',
        name: '1. Living & Lareira',
        icon: 'chair',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3GUV26sLAycamI1Qpcyw8_MwQWrGA_8wq8WvKBGVCs-2aut0ins3wene6zACGPbZzMmlvQtjGpa_45Da-oou6ChO4ID27jBmg6_a_2lihJZbjqJofRzW-eR9ZlhB7HMba__bWaLdasliKf9vB132hiJjrIqcjv0MVC_-hydEvegPCAREHSH_EkSw39p7NWP0HSMf9Mciko4e6SZvW-wBkxnjfeCfsbSiJZK5CUxGI__IA8YBaNzj-lg'
      },
      {
        id: 'suite',
        name: '2. Suíte Master',
        icon: 'king_bed',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3DUTDfPHrbUlUxkd9ZIxaC2pYLn6nBgxIjjdm_cY481ZyPiEolnBI9yAH3R7w5qujgvc4kFnsL9iugBAFTfVE3iqAiXOcWdant9q_FjBSFPqcvY9cNDuQEfZkTMwBQcDPSt0QViYbfFOQ4Pr8RHa1Z6yqI-dumsetAs53j-6dQ3xn6KtWRhVAP7OCGXjXrJjPyZV_B9-rYkkr7Q0o52Y4Nqj0eyI2zDaHcJ7A-seyinwVdabP8ykA_w'
      }
    ],
    broker: BROKER_DEFAULT
  },
  {
    id: 'casa-campo-quinta',
    title: 'Casa de Campo Quinta do Recôncavo',
    category: 'campo',
    categoryLabel: 'Chácara de Alto Luxo',
    neighborhood: 'Mirante do Vale',
    city: 'Santo Antônio de Jesus • BA',
    price: 1950000,
    condoFee: 420,
    iptu: 'R$ 180/mês',
    suites: 4,
    bathrooms: 5,
    areaM2: 420,
    garageSlots: 6,
    hasVirtualTour: true,
    exclusive: true,
    featuredTag: 'Natureza & Tranquilidade',
    rating: 4.8,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAheWGnGtBO58RAsBAMy5HbGUGGTLvgeqY4-4YqUuXPvPaCLLVACdzJOs79ttFJiLYNkw256rbIjz_p37lQxWCcrl5P3XyHpp7qJYaGJxyloepPIoR-rxy-xrLGqHdAkXQipfxLkKRZuzBZHZKZeUjLvSIMK0uhRgupnOC4OwGuzMY5kmn_Ec2RflL4DF_Mm6kLctuOcFZ6j0tl06NQ-KxQNdikINsa_gyTxkf1ERXFbLjIL9CMwL4X9A',
    descriptionParagraphs: [
      'Refúgio de luxo campestre com 3.000m² de terreno privativo arborizado com árvores frutíferas e pergolados em eucalipto tratado.',
      'Varanda gourmet de 120m² debruçada sobre o vale, lago ornamental de carpas e arquitetura rústico-chique com madeiramento nobre nativo.'
    ],
    smartHomeFeatures: 'Poço artesiano com sistema de filtragem industrial e gerador a diesel silenciado.',
    leisureFeatures: 'Piscina aquecida em alvenaria com praia molhada, campo de futebol society e horta orgânica.',
    mapCoordinates: { x: 16, y: 28, lat: -12.9800, lng: -39.2700 },
    pinLabel: 'R$ 1.9M',
    rooms360: [
      {
        id: 'living',
        name: '1. Living & Lareira',
        icon: 'chair',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3GUV26sLAycamI1Qpcyw8_MwQWrGA_8wq8WvKBGVCs-2aut0ins3wene6zACGPbZzMmlvQtjGpa_45Da-oou6ChO4ID27jBmg6_a_2lihJZbjqJofRzW-eR9ZlhB7HMba__bWaLdasliKf9vB132hiJjrIqcjv0MVC_-hydEvegPCAREHSH_EkSw39p7NWP0HSMf9Mciko4e6SZvW-wBkxnjfeCfsbSiJZK5CUxGI__IA8YBaNzj-lg'
      }
    ],
    broker: BROKER_DEFAULT
  },
  {
    id: 'reserva-mangueiras-villa-magna',
    title: 'Reserva das Mangueiras Villa Magna',
    category: 'mansao',
    categoryLabel: 'Supremo Padrão',
    neighborhood: 'Alto Sobradinho',
    city: 'Santo Antônio de Jesus • BA',
    price: 6200000,
    condoFee: 1600,
    iptu: 'R$ 720/mês',
    suites: 6,
    bathrooms: 8,
    areaM2: 850,
    garageSlots: 8,
    hasVirtualTour: true,
    exclusive: true,
    featuredTag: 'Ícone Arquitetônico',
    rating: 5.0,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTggx-sZHwnw8Ak2pemn8wdD6hrIikrCinukOCTXqTVvQBtiIgD0d2jRi0xjY64_FD_53MagNUTpb-KRAl_mKEg6eBIDlODU6i4N8sghbuvR02Av6ewhf8ei8k34WwP8Dq2gUnaPJXErYcKqandCj63LrZvV8rCz_4maIk56xMfWIlM-_U9yZ85p5voV0UaOASI--dVQCWRJa15Vt5cA-uYQHQFNPhkqFmxNI1bFe4PHVc65Kb27Cyyg',
    descriptionParagraphs: [
      'A mais imponente residência da história de Santo Antônio de Jesus, posicionada no cume do Alto Sobradinho com vista de 360 graus.',
      'Projeto assinado por escritório de renome internacional com heliponto homologado, subsolo para coleção de supercarros e cinema privativo THX.'
    ],
    smartHomeFeatures: 'Automação Crestron de nível bancário, segurança biométrica com reconhecimento facial e bunker seguro.',
    leisureFeatures: 'Piscina de raia coberta aquecida, quadra de tênis de saibro privativa e adega para 2.000 garrafas.',
    mapCoordinates: { x: 86, y: 56, lat: -12.9620, lng: -39.2500 },
    pinLabel: 'R$ 6.2M',
    rooms360: [
      {
        id: 'living',
        name: '1. Living & Lareira',
        icon: 'chair',
        panoramaUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3GUV26sLAycamI1Qpcyw8_MwQWrGA_8wq8WvKBGVCs-2aut0ins3wene6zACGPbZzMmlvQtjGpa_45Da-oou6ChO4ID27jBmg6_a_2lihJZbjqJofRzW-eR9ZlhB7HMba__bWaLdasliKf9vB132hiJjrIqcjv0MVC_-hydEvegPCAREHSH_EkSw39p7NWP0HSMf9Mciko4e6SZvW-wBkxnjfeCfsbSiJZK5CUxGI__IA8YBaNzj-lg'
      }
    ],
    broker: BROKER_DEFAULT
  }
];
