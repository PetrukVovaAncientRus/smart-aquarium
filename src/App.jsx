import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TemperatureScreen from './components/TemperatureScreen';
import PhScreen from './components/PhScreen';
import FilterScreen from './components/FilterScreen';
import FeedingScreen from './components/FeedingScreen';

const FEEDING_HOURS = [11, 16, 21];

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [temperature, setTemperature] = useState(24.6);
  const [ph, setPh] = useState(7.4);
  const [filterWear, setFilterWear] = useState(82);
  const [lightOn, setLightOn] = useState(true);
  const [foodLevel, setFoodLevel] = useState(54);
  const [tempHistory, setTempHistory] = useState([24.3, 24.1, 24.7, 24.8, 24.5, 24.4, 24.6]);
  const [phHistory, setPhHistory] = useState([7.2, 7.1, 7.3, 7.5, 7.4, 7.3, 7.4]);
  const [nextFeeding, setNextFeeding] = useState(null);
  const [feedingCountdown, setFeedingCountdown] = useState('');

  const calculateNextFeeding = useCallback(() => {
    const now = new Date();
    for (let hour of FEEDING_HOURS) {
      const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0);
      if (candidate > now) {
        return candidate;
      }
    }
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, FEEDING_HOURS[0], 0, 0, 0);
    return nextDay;
  }, []);

  useEffect(() => {
    setNextFeeding(calculateNextFeeding());
  }, [calculateNextFeeding]);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Number((Math.random() * 1).toFixed(1));
      setTemperature(prev => {
        const next = Math.max(18, Math.min(32, prev + (Math.random() < 0.5 ? delta : -delta)));
        const rounded = Number(next.toFixed(1));
        setTempHistory(h => [...h.slice(1), rounded]);
        return rounded;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Number((Math.random() * 0.3).toFixed(1));
      setPh(prev => {
        const next = Math.max(0, Math.min(14, prev + (Math.random() < 0.5 ? delta : -delta)));
        const rounded = Number(next.toFixed(1));
        setPhHistory(h => [...h.slice(1), rounded]);
        return rounded;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilterWear(prev => Math.min(100, prev + 2));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!nextFeeding) return;
      const now = new Date();
      let diff = nextFeeding - now;
      if (diff <= 0) {
        const newNext = calculateNextFeeding();
        setNextFeeding(newNext);
        diff = newNext - now;
      }
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setFeedingCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [nextFeeding, calculateNextFeeding]);

  const toggleLight = () => setLightOn(!lightOn);
  const cleanFilter = () => setFilterWear(0);

  const getTemperatureStatus = (temp) => {
    if (temp < 22 || temp > 28) return { status: 'Critical', color: '#FF0000' };
    if (temp < 24 || temp > 26) return { status: 'Warning', color: '#FFFF00' };
    return { status: 'Good', color: '#39FF14' };
  };

  const getPhStatus = (val) => {
    if (val < 6.0 || val > 8.5) return { status: 'Critical', color: '#FF0000' };
    if (val < 6.8 || val > 7.5) return { status: 'Warning', color: '#FFFF00' };
    return { status: 'Good', color: '#39FF14' };
  };

  const renderScreen = () => {
    const props = {
      temperature, ph, filterWear, lightOn, foodLevel,
      tempHistory, phHistory, nextFeeding, feedingCountdown,
      toggleLight, cleanFilter,
      tempStatus: getTemperatureStatus(temperature),
      phStatus: getPhStatus(ph)
    };
    switch (activeScreen) {
      case 'dashboard': return <Dashboard {...props} />;
      case 'temperature': return <TemperatureScreen {...props} />;
      case 'ph': return <PhScreen {...props} />;
      case 'filter': return <FilterScreen {...props} />;
      case 'feeding': return <FeedingScreen {...props} />;
      default: return <Dashboard {...props} />;
    }
  };

  return (
    <>
      <input id="themeToggle" className="theme-switch" type="checkbox" />
      <label className="theme-toggle" htmlFor="themeToggle" aria-label="Toggle dark theme">
        <svg width="40" height="40" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26.375 0.00213242C26.065 0.0173819 25.7593 0.0806343 25.4687 0.189632C9.2928 6.18433 0 21.9005 0 39.7834C0 63.0603 18.9105 82.0021 42.1874 82.0021C60.0703 82.0021 75.8178 72.6781 81.8124 56.5021C82.0112 55.9575 82.0479 55.3668 81.9181 54.8018C81.7883 54.2367 81.4976 53.7213 81.081 53.318C80.6645 52.9147 80.14 52.6407 79.571 52.5292C79.0021 52.4176 78.413 52.4734 77.875 52.6896C73.7814 54.3358 69.2801 55.1896 64.5312 55.1896C44.9343 55.1896 26.8124 37.0364 26.8124 17.4396C26.8124 12.6907 27.635 8.18924 29.2812 4.09594C29.4631 3.63217 29.5267 3.13041 29.4662 2.63592C29.4057 2.14143 29.223 1.66977 28.9346 1.26355C28.6462 0.857318 28.2612 0.529296 27.8144 0.309078C27.3675 0.0888607 26.8728 -0.0166477 26.375 0.00213242ZM21.7187 8.72094C21.1365 11.545 20.8124 14.4572 20.8124 17.4396C20.8124 40.6505 41.3203 61.1896 64.5312 61.1896C67.5136 61.1896 70.4258 60.8343 73.25 60.2521C66.9843 70.3008 55.6069 76.0021 42.1874 76.0021C22.1532 76.0021 6 59.8177 6 39.7834C6 26.3623 11.6679 14.9861 21.7187 8.72094Z"
            fill="black" fillOpacity="0.7" />
        </svg>
      </label>
      <div className="frame-shell">
        <div id="appStage" className="stage relative h-[1024px] w-[1440px] font-rounded">
          <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
          <main>
            {renderScreen()}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
