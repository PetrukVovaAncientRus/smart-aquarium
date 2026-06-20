const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export class AquariumApi {
  static async getStatus() {
    try {
      const response = await fetch(`${API_URL}/api/status`);
      if (!response.ok) throw new Error('Failed to fetch status');
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching status:', error);
      throw error;
    }
  }

  static async getHistory() {
    try {
      const response = await fetch(`${API_URL}/api/history`);
      if (!response.ok) throw new Error('Failed to fetch history');
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching history:', error);
      throw error;
    }
  }

  static async updateSettings(settings) {
    try {
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error('Failed to update settings');
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating settings:', error);
      throw error;
    }
  }

  static async toggleLight() {
    try {
      const response = await fetch(`${API_URL}/api/light`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to toggle light');
      return await response.json();
    } catch (error) {
      console.error('❌ Error toggling light:', error);
      throw error;
    }
  }

  static async cleanFilter() {
    try {
      const response = await fetch(`${API_URL}/api/filter/clean`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to clean filter');
      return await response.json();
    } catch (error) {
      console.error('❌ Error cleaning filter:', error);
      throw error;
    }
  }

  static async checkHealth() {
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
