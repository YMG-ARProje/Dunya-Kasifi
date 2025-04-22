import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Avatar {
  hair: string;
  eyes: string;
  outfit: string;
  accessory: string;
}

interface ExplorerContextType {
  avatar: Avatar;
  equipment: string[];
  vehicle: string;
  badges: string[];
  updateAvatar: (newAvatar: Partial<Avatar>) => void;
  updateEquipment: (newEquipment: string[]) => void;
  updateVehicle: (newVehicle: string) => void;
  addBadge: (badgeId: string) => void;
  resetExplorer: () => void;
}

const defaultAvatar: Avatar = {
  hair: '',
  eyes: '',
  outfit: '',
  accessory: '',
};

const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined);

export const ExplorerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatar, setAvatar] = useState<Avatar>(defaultAvatar);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState<string>('');
  const [badges, setBadges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExplorerState();
  }, []);

  const loadExplorerState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('explorerState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setAvatar(parsedState.avatar || defaultAvatar);
        setEquipment(parsedState.equipment || []);
        setVehicle(parsedState.vehicle || '');
        setBadges(parsedState.badges || []);
      }
    } catch (error) {
      console.error('Error loading explorer state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveExplorerState = async () => {
    try {
      const state = {
        avatar,
        equipment,
        vehicle,
        badges,
      };
      await AsyncStorage.setItem('explorerState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving explorer state:', error);
    }
  };

  const updateAvatar = (newAvatar: Partial<Avatar>) => {
    setAvatar((prev) => ({ ...prev, ...newAvatar }));
  };

  const updateEquipment = (newEquipment: string[]) => {
    setEquipment(newEquipment);
  };

  const updateVehicle = (newVehicle: string) => {
    setVehicle(newVehicle);
  };

  const addBadge = (badgeId: string) => {
    setBadges((prev) => [...prev, badgeId]);
  };

  const resetExplorer = () => {
    setAvatar(defaultAvatar);
    setEquipment([]);
    setVehicle('');
    setBadges([]);
  };

  useEffect(() => {
    saveExplorerState();
  }, [avatar, equipment, vehicle, badges]);

  if (isLoading) {
    return null; // Or a loading component
  }

  return (
    <ExplorerContext.Provider
      value={{
        avatar,
        equipment,
        vehicle,
        badges,
        updateAvatar,
        updateEquipment,
        updateVehicle,
        addBadge,
        resetExplorer,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (context === undefined) {
    throw new Error('useExplorer must be used within an ExplorerProvider');
  }
  return context;
}; 