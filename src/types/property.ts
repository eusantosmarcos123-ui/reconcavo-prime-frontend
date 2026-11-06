export interface Hotspot {
  id: string;
  title: string;
  description?: string;
  targetRoomId?: string;
  yaw: number; // degrees
  pitch: number; // degrees
}

export interface Room360 {
  id: string;
  name: string;
  icon: string;
  panoramaUrl: string;
  hotspots?: Hotspot[];
}

export interface Property {
  id: string;
  title: string;
  category: 'mansao' | 'apartamento' | 'cobertura' | 'campo';
  categoryLabel: string;
  neighborhood: string;
  city: string;
  price: number;
  condoFee?: number;
  iptu?: string;
  suites: number;
  bathrooms: number;
  areaM2: number;
  garageSlots: number;
  hasVirtualTour: boolean;
  exclusive: boolean;
  featuredTag?: string;
  rating: number;
  ratingLabel?: string;
  coverImage: string;
  descriptionParagraphs: string[];
  smartHomeFeatures: string;
  leisureFeatures: string;
  mapCoordinates: { x: number; y: number; lat: number; lng: number };
  pinLabel: string;
  rooms360: Room360[];
  broker: {
    name: string;
    creci: string;
    phone: string;
    avatarUrl: string;
    rating: number;
    responseTime: string;
    isOnline: boolean;
  };
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  maxPrice: number;
  minSuites: number;
  minGarage: number;
  only360: boolean;
}
