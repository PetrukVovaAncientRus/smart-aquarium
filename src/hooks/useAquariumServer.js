import { useEffect, useState } from 'react';
import { AquariumApi } from '../api/aquariumApi';

export function useAquariumServer() {
  const [isConnected, setIsConnected] = useState(true);
  const [aquarium, setAquarium] = useState(null);

  // Перевірити з'єднання з сервером
  async function checkConnection() {
    const connected = await AquariumApi.checkHealth();
    setIsConnected(connected);
    return connected;
  }

  // Отримати статус
  async function fetchStatus() {
    try {
      const response = await AquariumApi.getStatus();
      if (response.success) {
        setAquarium(response.data);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to fetch status:', error);
      setIsConnected(false);
    }
  }

  // Отримати історію
  async function fetchHistory() {
    try {
      return await AquariumApi.getHistory();
    } catch (error) {
      console.error('Failed to fetch history:', error);
      return null;
    }
  }

  // Перемикнути світло
  async function toggleLight() {
    try {
      const response = await AquariumApi.toggleLight();
      if (response.success) {
        setAquarium(prev => ({ ...prev, lightOn: response.lightOn }));
      }
    } catch (error) {
      console.error('Failed to toggle light:', error);
    }
  }

  // Очистити фільтр
  async function cleanFilter() {
    try {
      const response = await AquariumApi.cleanFilter();
      if (response.success) {
        setAquarium(prev => ({ ...prev, filterWear: response.filterWear }));
      }
    } catch (error) {
      console.error('Failed to clean filter:', error);
    }
  }

  // Запустити автоматичне оновлення
  useEffect(() => {
    checkConnection();
    fetchStatus();

    // Оновлювати кожні 5 секунд
    const statusInterval = setInterval(fetchStatus, 5000);

    // Перевіряти з'єднання кожні 10 секунд
    const connectionInterval = setInterval(checkConnection, 10000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(connectionInterval);
    };
  }, []);

  return {
    aquarium,
    isConnected,
    toggleLight,
    cleanFilter,
    fetchStatus,
    fetchHistory,
  };
}
