/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROPERTIES, BROKER_DEFAULT } from './data/properties';
import { Property } from './types/property';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExploreScreen } from './screens/ExploreScreen';
import { PropertyDetailsScreen } from './screens/PropertyDetailsScreen';
import { BrokerDashboardScreen } from './screens/BrokerDashboardScreen';
import { AddPropertyWizardScreen } from './screens/AddPropertyWizardScreen';
import { VirtualToursGalleryScreen } from './screens/VirtualToursGalleryScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { WhatsAppModal } from './components/WhatsAppModal';

export type ScreenType =
  | 'explore'
  | 'details'
  | 'tours360'
  | 'favorites'
  | 'broker'
  | 'addProperty';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property>(PROPERTIES[0]);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('explore');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('explore');
  const [favorites, setFavorites] = useState<string[]>(['mansao-alphaville']);
  const [whatsAppModalProperty, setWhatsAppModalProperty] = useState<Property | null>(null);

  // Toggle favorite property
  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  // Navigate to details screen
  const handleNavigateToDetails = (property: Property) => {
    setSelectedProperty(property);
    setPreviousScreen(currentScreen);
    setCurrentScreen('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button handler
  const handleBack = () => {
    if (currentScreen === 'details') {
      setCurrentScreen(previousScreen === 'details' ? 'explore' : previousScreen);
    } else if (currentScreen === 'addProperty') {
      setCurrentScreen('broker');
    } else {
      setCurrentScreen('explore');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tab navigation handler
  const handleSelectTab = (tab: 'explore' | 'tours360' | 'favorites' | 'broker') => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // New property published handler
  const handlePublishNewProperty = (data: Partial<Property>) => {
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title: data.title || 'Nova Residência Exclusiva SAJ',
      category: 'mansao',
      categoryLabel: 'Lançamento Exclusivo',
      neighborhood: data.neighborhood || 'Centro',
      city: data.city || 'Santo Antônio de Jesus • BA',
      price: data.price || 1850000,
      condoFee: 950,
      iptu: 'R$ 280/mês',
      suites: data.suites || 4,
      bathrooms: 5,
      areaM2: data.areaM2 || 340,
      garageSlots: data.garageSlots || 4,
      hasVirtualTour: true,
      exclusive: true,
      featuredTag: '⭐ Tour 360° Recém Cadastrado',
      rating: 5.0,
      ratingLabel: 'Lançamento',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBvfpzZIWe7BpnJVFMSR4czkNU0PdcNvL1kv86ZWxCtxoeQZWqzIFAjn3nKRKu7ztqLyesAWE-FW1o71DU6pIiMUl-SAnh3PUazdOe95XrTmtHewKFa1wJnUNMPcG0Qj4LLc1opBRSAGjtQHoTx9oq8-dqQY6u24xuKaT3DGxdO3qz-DRX-4d967g33HqzTA7LDkU3yTtXkkoFAc7LpAkTua4gnQewCLuij-zWxKBbP83iN9pihV902qA',
      descriptionParagraphs: [
        'Imóvel recém incorporado com especificações construtivas de altíssimo padrão, localizado em região nobre de Santo Antônio de Jesus.',
        'Totalmente equipado para tour virtual WebXR com giroscópio e óculos 3D.'
      ],
      smartHomeFeatures: 'Automação residencial completa com cabeamento estruturado e controle por voz.',
      leisureFeatures: 'Área gourmet integrada com piscina e solarium.',
      mapCoordinates: { x: 42, y: 38, lat: -12.9700, lng: -39.2600 },
      pinLabel: `R$ ${( (data.price || 1850000) / 1000000 ).toFixed(2)}M`,
      rooms360: PROPERTIES[0].rooms360,
      broker: BROKER_DEFAULT,
    };

    setProperties([newProperty, ...properties]);
    setSelectedProperty(newProperty);
    setCurrentScreen('explore');
  };

  // Screen Title for Header
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'details':
        return 'Detalhes Do Imóvel';
      case 'addProperty':
        return 'Cadastrar Imóvel 360°';
      case 'broker':
        return 'Painel Corretor';
      case 'tours360':
        return 'Imóveis 360°';
      case 'favorites':
        return 'Meus Favoritos';
      default:
        return undefined; // default brand logo + SAJ
    }
  };

  // Determine which tab is visually active
  const currentActiveTab: 'explore' | 'tours360' | 'favorites' | 'broker' =
    currentScreen === 'details'
      ? 'explore'
      : currentScreen === 'addProperty'
      ? 'broker'
      : currentScreen;

  return (
    <div className="min-h-screen bg-[#121316] text-[#e3e2e6] flex flex-col antialiased selection:bg-[#d4af37] selection:text-[#3c2f00]">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onBack={handleBack}
        screenTitle={getScreenTitle()}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pt-16 flex flex-col">
        {currentScreen === 'explore' && (
          <ExploreScreen
            properties={properties}
            selectedProperty={selectedProperty}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onNavigateToDetails={handleNavigateToDetails}
            onOpenWhatsApp={(prop) => setWhatsAppModalProperty(prop)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentScreen === 'details' && (
          <PropertyDetailsScreen
            property={selectedProperty}
            onOpenWhatsApp={(prop) => setWhatsAppModalProperty(prop)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentScreen === 'tours360' && (
          <VirtualToursGalleryScreen
            properties={properties}
            onSelectPropertyDetails={handleNavigateToDetails}
            onOpenWhatsApp={(prop) => setWhatsAppModalProperty(prop)}
          />
        )}

        {currentScreen === 'favorites' && (
          <FavoritesScreen
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToDetails={handleNavigateToDetails}
            onNavigateToExplore={() => setCurrentScreen('explore')}
          />
        )}

        {currentScreen === 'broker' && (
          <BrokerDashboardScreen
            properties={properties}
            onOpenAddProperty={() => setCurrentScreen('addProperty')}
            onNavigateToDetails={handleNavigateToDetails}
          />
        )}

        {currentScreen === 'addProperty' && (
          <AddPropertyWizardScreen
            onPublishSuccess={handlePublishNewProperty}
            onCancel={() => setCurrentScreen('broker')}
          />
        )}
      </main>

      {/* Bottom Tab Bar (hidden when on full screen details or wizard with dedicated actions) */}
      {currentScreen !== 'details' && currentScreen !== 'addProperty' && (
        <BottomNav
          currentTab={currentActiveTab}
          onSelectTab={handleSelectTab}
          favoritesCount={favorites.length}
        />
      )}

      {/* WhatsApp Concierge Modal */}
      {whatsAppModalProperty && (
        <WhatsAppModal
          isOpen={!!whatsAppModalProperty}
          onClose={() => setWhatsAppModalProperty(null)}
          property={whatsAppModalProperty}
        />
      )}
    </div>
  );
}
