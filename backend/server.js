import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Глобальний стан акваріума на сервері
let aquariumState = {
  temperature: 24.6,
  ph: 7.4,
  lightOn: true,
  filterWear: 82,
  feedingHours: [11, 16, 21],
  nextFeeding: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 11, 0, 0),
  foodLevel: 54,
  tempHistory: [24.3, 24.1, 24.7, 24.8, 24.5, 24.4, 24.6],
  phHistory: [7.2, 7.1, 7.3, 7.5, 7.4, 7.3, 7.4],
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const randomBoolean = () => Math.random() < 0.5;

// Функція для оновлення температури
function updateTemperature() {
  const delta = Number((Math.random() * 1).toFixed(1));
  aquariumState.temperature += randomBoolean() ? delta : -delta;
  aquariumState.temperature = Number(clamp(aquariumState.temperature, 18, 32).toFixed(1));
  aquariumState.tempHistory.push(aquariumState.temperature);
  if (aquariumState.tempHistory.length > 7) {
    aquariumState.tempHistory.shift();
  }
}

// Функція для оновлення pH
function updatePH() {
  const delta = Number((Math.random() * 0.3).toFixed(1));
  aquariumState.ph += randomBoolean() ? delta : -delta;
  aquariumState.ph = Number(clamp(aquariumState.ph, 0, 14).toFixed(1));
  aquariumState.phHistory.push(aquariumState.ph);
  if (aquariumState.phHistory.length > 7) {
    aquariumState.phHistory.shift();
  }
}

// Функція для оновлення фільтра
function updateFilter() {
  aquariumState.filterWear = Math.min(100, aquariumState.filterWear + 2);
}

// Емуляція оновлення датчиків кожні 5 секунд
setInterval(() => {
  updateTemperature();
  updatePH();
  updateFilter();
  console.log(`[${new Date().toLocaleTimeString()}] Updated - Temp: ${aquariumState.temperature}°C, pH: ${aquariumState.ph}, Filter: ${aquariumState.filterWear}%`);
}, 5000);

// ============= МАРШРУТИ =============

// GET /api/status - Повернути поточний стан системи
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: aquariumState,
  });
});

// GET /api/history - Повернути історію датчиків
app.get('/api/history', (req, res) => {
  res.json({
    success: true,
    tempHistory: aquariumState.tempHistory,
    phHistory: aquariumState.phHistory,
  });
});

// POST /api/settings - Зберегти налаштування
app.post('/api/settings', (req, res) => {
  const { lightOn, feedingHours, filterWear } = req.body;
  
  if (lightOn !== undefined) aquariumState.lightOn = lightOn;
  if (feedingHours) aquariumState.feedingHours = feedingHours;
  if (filterWear !== undefined && filterWear === 0) aquariumState.filterWear = 0; // Очищення фільтра
  
  console.log('[POST /api/settings] Updated settings:', req.body);
  
  res.json({
    success: true,
    message: 'Settings updated',
    data: aquariumState,
  });
});

// POST /api/light - Перемикання світла
app.post('/api/light', (req, res) => {
  aquariumState.lightOn = !aquariumState.lightOn;
  console.log(`[POST /api/light] Light is now ${aquariumState.lightOn ? 'ON' : 'OFF'}`);
  
  res.json({
    success: true,
    lightOn: aquariumState.lightOn,
  });
});

// POST /api/filter/clean - Очищення фільтра
app.post('/api/filter/clean', (req, res) => {
  aquariumState.filterWear = 0;
  console.log('[POST /api/filter/clean] Filter cleaned');
  
  res.json({
    success: true,
    filterWear: aquariumState.filterWear,
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Обробка помилок 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🐠 Aquarium Backend Server запущен на http://localhost:${PORT}`);
  console.log(`📊 API Status: http://localhost:${PORT}/api/status`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
});
