# 🐠 Aquarium Monitoring API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. GET /api/status
Повернути поточний стан системи

**Response:**
```json
{
  "success": true,
  "timestamp": "2026-06-20T10:30:45.123Z",
  "data": {
    "temperature": 24.6,
    "ph": 7.4,
    "lightOn": true,
    "filterWear": 82,
    "feedingHours": [11, 16, 21],
    "nextFeeding": "2026-06-21T11:00:00.000Z",
    "foodLevel": 54,
    "tempHistory": [24.3, 24.1, 24.7, ...],
    "phHistory": [7.2, 7.1, 7.3, ...]
  }
}
```

### 2. GET /api/history
Повернути історію температури та pH

**Response:**
```json
{
  "success": true,
  "tempHistory": [24.3, 24.1, 24.7, 24.8, 24.5, 24.4, 24.6],
  "phHistory": [7.2, 7.1, 7.3, 7.5, 7.4, 7.3, 7.4]
}
```

### 3. POST /api/settings
Оновити налаштування системи

**Request Body:**
```json
{
  "lightOn": true,
  "feedingHours": [11, 16, 21],
  "filterWear": 0
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings updated",
  "data": {...}
}
```

### 4. POST /api/light
Перемикнути світло

**Response:**
```json
{
  "success": true,
  "lightOn": false
}
```

### 5. POST /api/filter/clean
Очистити фільтр

**Response:**
```json
{
  "success": true,
  "filterWear": 0
}
```

### 6. GET /health
Перевірити стан сервера

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

## CORS
Всі маршрути підтримують CORS для запитів з фронтенду.

## Помилки
```json
{
  "success": false,
  "error": "Error description"
}
```
