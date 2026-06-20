# 🐠 Smart Aquarium Monitoring System

## Опис
Повнофункціональна система моніторингу та управління акваріумом з React фронтенду та Node.js бекенду.

## Технологічний стек

### Frontend
- **React 19** - UI бібліотека
- **Vite** - сучасний збірник
- **Chart.js** - графіки
- **Tailwind CSS** - стилізація

### Backend
- **Node.js** - runtime
- **Express** - веб-фреймворк
- **CORS** - підтримка кросс-доменних запитів

### DevOps
- **Docker** - контейнеризація
- **Docker Compose** - оркестрація сервісів

---

## 🚀 Запуск проекту

### Варіант 1: Локальний запуск (Розробка)

#### Backend
```bash
cd backend
npm install
npm run dev
# Сервер запуститься на http://localhost:5000
```

#### Frontend (в іншому терміналі)
```bash
npm install
npm run dev
# Клієнт запуститься на http://localhost:5173
```

### Варіант 2: Docker Compose (Production)

```bash
# Збудувати та запустити
docker-compose up --build

# Сервіси будуть доступні на:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Health Check: http://localhost:5000/health
```

### Варіант 3: Тільки Backend в Docker
```bash
cd backend
docker build -t aquarium-backend .
docker run -p 5000:5000 aquarium-backend
```

---

## 📊 Архітектура

```
Client (React)
    ↓ fetch/CORS
[API Routes]
    ├── GET /api/status → поточний стан
    ├── GET /api/history → історія датчиків
    ├── POST /api/settings → оновити налаштування
    ├── POST /api/light → перемикнути світло
    └── POST /api/filter/clean → очистити фільтр
    ↓
Server State (Node.js Express)
    ├── temperature (24.6°C) → Генерується кожні 5 сек
    ├── ph (7.4) → Генерується кожні 5 сек
    ├── filterWear (82%) → +2% кожні 5 сек
    ├── lightOn (boolean)
    ├── foodLevel (54%)
    └── Історія даних
```

---

## 📁 Структура проекту

```
smart-aquarium/
├── backend/
│   ├── server.js           # Express сервер + логіка
│   ├── package.json        # Backend залежності
│   ├── Dockerfile          # Контейнер для backend
│   └── .env.example        # Приклад змінних оточення
├── src/
│   ├── api/
│   │   └── aquariumApi.js  # HTTP клієнт для API
│   ├── hooks/
│   │   └── useAquariumServer.js  # Хук для сервера
│   ├── components/
│   │   └── ConnectionStatus.jsx  # Статус з'єднання
│   ├── useAquariumLogic.js # Логіка рендеру
│   ├── App.jsx
│   ├── main.jsx
│   ├── LegacyLayout.jsx
│   └── index.css
├── docker-compose.yml      # Оркестрація сервісів
├── Dockerfile              # Контейнер для frontend
├── vite.config.js          # Конфіг Vite
├── package.json            # Frontend залежності
├── index.html
├── API.md                  # Документація API
└── README.md               # Цей файл
```

---

## 🔧 Конфігурація

### Frontend .env
```env
VITE_API_URL=http://localhost:5000  # При локальному запуску
VITE_API_URL=http://backend:5000    # При Docker запуску
```

### Backend .env
```env
PORT=5000
NODE_ENV=development
```

---

## 📡 API

Детальна документація: [API.md](./API.md)

### Основні ендпоїнти

| Метод | Маршрут | Опис |
|-------|---------|------|
| GET | `/api/status` | Поточний стан системи |
| GET | `/api/history` | Історія датчиків |
| POST | `/api/settings` | Оновити налаштування |
| POST | `/api/light` | Перемикнути світло |
| POST | `/api/filter/clean` | Очистити фільтр |
| GET | `/health` | Health check |

---

## 🎯 Функції

- ✅ Моніторинг температури води (24-26°C)
- ✅ Моніторинг pH (6.8-7.5)
- ✅ Статус фільтра з процентом зношення
- ✅ Управління світлом
- ✅ Розклад годування
- ✅ Управління рівнем корму
- ✅ Графіки історії температури
- ✅ Індикатор з'єднання з сервером
- ✅ Автоматичні оновлення кожні 5 сек
- ✅ Контейнеризація з Docker

---

## 🐛 Розробка

### Запуск в режимі розробки
```bash
# Backend (з автоперезавантаженням)
cd backend && npm run dev

# Frontend (з HMR)
npm run dev
```

### Білд для production
```bash
# Frontend
npm run build

# Docker
docker-compose up --build
```

---

## 📝 Ліцензія
МIT

---

## 👤 Автор
**Volodymyr Petruk** - PetrukVovaAncientRus

---

## 🤝 Вклад
Приватний проект для навчальних цілей.
