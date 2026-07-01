# 🐠 Smart Aquarium Monitoring System

## Description
Fully functional aquarium monitoring and management system with React frontend and Node.js backend.

## Technology stack

### Frontend
- **React 19** - UI library
- **Vite** - modern collection
- **Chart.js** - charts
- **Tailwind CSS** - styling

### Backend
- **Node.js** - runtime
- **Express** - web framework
- **CORS** - cross-domain request support

### DevOps
- **Docker** - containerization
- **Docker Compose** - service orchestration

---

## 🚀 Project launch

### Option 1: Local launch (Development)

#### Backend
```bash
cd backend
npm install
npm run dev
# The server will start at http://localhost:5000
```

#### Frontend (in another terminal)
```bash
npm install
npm run dev
# The client will start at http://localhost:5173
```

### Option 2: Docker Compose (Production)

```bash
# Build and run
docker-compose up --build

# Services will be available on:
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Health Check: http://localhost:5000/health
```

### Option 3: Backend only in Docker
```bash
cd backend
docker build -t aquarium-backend .
docker run -p 5000:5000 aquarium-backend
```

---

## 📊 Architecture

```
Client (React)
↓ fetch/CORS
[API Routes]
├── GET /api/status → current status
├── GET /api/history → sensor history
├── POST /api/settings → update settings
├── POST /api/light → toggle light
└── POST /api/filter/clean → clear filter
↓
Server State (Node.js Express)
├── temperature (24.6°C) → Generated every 5 sec
├── ph (7.4) → Generated every 5 sec
├── filterWear (82%) → +2% every 5 sec
├── lightOn (boolean)
├── foodLevel (54%)
└── Data history
```

---

## 📁 Structure project

```
smart-aquarium/
├── backend/
│ ├── server.js # Express server + logic
│ ├── package.json # Backend dependencies
│ ├── Dockerfile # Backend container
│ └── .env.example # Environment variables example
├── src/
│ ├── api/
│ │ └── aquariumApi.js # HTTP client for API
│ ├── hooks/
│ │ └── useAquariumServer.js # Server hook
│ ├── components/
│ │ └── ConnectionStatus.jsx # Connection status
│ ├── useAquariumLogic.js # Render logic
│ ├── App.jsx
│ ├── main.jsx
│ ├── LegacyLayout.jsx
│ └── index.css
├── docker-compose.yml # Service orchestration
├── Dockerfile # Frontend container
├── vite.config.js # Config Vite
├── package.json # Frontend dependencies
├── index.html
├── API.md # API documentation
└── README.md # This file
```

---

## 🔧 Configuration

### Frontend .env
```env
VITE_API_URL=http://localhost:5000 # When running locally
VITE_API_URL=http://backend:5000 # When running Docker
```

### Backend .env
```env
PORT=5000
NODE_ENV=development
```

---

## 📡 API

Detailed documentation: [API.md](./API.md)

### Main endpoints

| Method | Route | Description |
|------|------|------|
| GET | `/api/status` | Current system status |
| GET | `/api/history` | Sensor History |
| POST | `/api/settings` | Update Settings |
| POST | `/api/light` | Toggle Light |
| POST | `/api/filter/clean` | Clean Filter |
| GET | `/health` | Health Check |

---

## 🎯 Features

- ✅ Water temperature monitoring (24-26°C)
- ✅ pH monitoring (6.8-7.5)
- ✅ Filter status with wear percentage
- ✅ Light control
- ✅ Feeding schedule
- ✅ Feed level control
- ✅ Temperature history graphs
- ✅ Server connection indicator
- ✅ Automatic updates every 5 seconds
- ✅ Containerization with Docker

---

## 🐛 Development

### Start in development mode
```bash
# Backend (with auto-reboot)
cd backend && npm run dev
# Frontend (with HMR)
npm run dev
```

### Build for production
```bash
# Frontend
npm run build
# Docker
docker-compose up --build
```

---

## 📝 License
MIT

---

## 👤 Author
**Volodymyr Petruk** - PetrukVovaAncientRus

---

## 🤝 Contribution
Private project for educational purposes.
