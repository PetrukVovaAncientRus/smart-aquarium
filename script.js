const aquarium = {
  temperature: 24.6,
  ph: 7.4,
  lightOn: true,
  filterWear: 82,

  feedingHours: [11, 16, 21],
  nextFeeding: null,

  foodLevel: 54,
  maxFoodWeightGrams: 100,

  tempHistory: [24.3, 24.1, 24.7, 24.8, 24.5, 24.4, 24.6],
  phHistory: [7.2, 7.1, 7.3, 7.5, 7.4, 7.3, 7.4]
};

let tempChartInstance = null;

function updateFeedingScheduleDays() {
  const options = { day: 'numeric', month: 'short' };
  const currentLang = 'en-US';

  const today = new Date();
  
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);

  document.querySelectorAll('.dayCurrent').forEach(el => {
    el.textContent = today.toLocaleDateString(currentLang, options);
  });
  document.querySelectorAll('.dayNext1').forEach(el => {
    el.textContent = tomorrow.toLocaleDateString(currentLang, options);
  });
  document.querySelectorAll('.dayNext2').forEach(el => {
    el.textContent = dayAfterTomorrow.toLocaleDateString(currentLang, options);
  });
}

function initOrUpdateChart() {
  const ctx = document.getElementById('tempChart');
  if (!ctx) return; 

  const labels = [];
  for (let i = 6; i >= 0; i--) {
    if (i === 0) {
      labels.push("Now");
    } else {
      const totalSeconds = i * 30;
      if (totalSeconds >= 60) {
        const mins = totalSeconds / 60;
        labels.push(`-${mins}m`);
      } else {
        labels.push(`-${totalSeconds}s`);
      }
    }
  }

  if (tempChartInstance) {
    tempChartInstance.data.labels = labels;
    tempChartInstance.data.datasets[0].data = aquarium.tempHistory;
    tempChartInstance.update();
    return;
  }

  tempChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperature (°C)',
        data: aquarium.tempHistory,
        borderColor: '#FF7F50',
        backgroundColor: 'rgba(255, 127, 80, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#39FF14',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false } 
      },
      scales: {
        x: {
          grid: { color: 'rgba(0, 128, 128, 0.1)' }, 
          ticks: { color: '#FFFFFF', font: { family: 'Inter' } }
        },
        y: {
          min: 16,
          max: 34,
          grid: { color: 'rgba(0, 128, 128, 0.1)' },
          ticks: { color: '#FFFFFF', font: { family: 'Inter' } }
        }
      }
    }
  });
}

function calculateNextFeeding() {
  const now = new Date();
  for (let hour of aquarium.feedingHours) {
    const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0);
    if (candidate > now) {
      aquarium.nextFeeding = candidate;
      return;
    }
  }
  const firstHourNextDay = aquarium.feedingHours[0];
  const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, firstHourNextDay, 0, 0, 0);
  aquarium.nextFeeding = nextDay;
}

calculateNextFeeding();

function $(id) {
  return document.getElementById(id);
}

function randomBoolean() {
  return Math.random() < 0.5;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateTemperature() {
  const delta = Number((Math.random() * 1).toFixed(1));

  aquarium.temperature += randomBoolean() ? delta : -delta;
  aquarium.temperature = clamp(aquarium.temperature, 18, 32);
  aquarium.temperature = Number(aquarium.temperature.toFixed(1));

  aquarium.tempHistory.push(aquarium.temperature);
  aquarium.tempHistory.shift();

  renderTemperature();
  initOrUpdateChart();
}

function updatePH() {

  const delta = Number((Math.random() * 0.3).toFixed(1));

  aquarium.ph += randomBoolean() ? delta : -delta;
  aquarium.ph = clamp(aquarium.ph, 0, 14);
  aquarium.ph = Number(aquarium.ph.toFixed(1));

  aquarium.phHistory.push(aquarium.ph);
  aquarium.phHistory.shift();

  renderPH();
}

function renderTemperature() {
  const text = aquarium.temperature + " °C";

  document.querySelectorAll(".tempValue, #tempValue").forEach(el => {
    el.textContent = text;
  });

  let status = "Good";
  let color = "#39FF14";

  if (aquarium.temperature < 24 || aquarium.temperature > 26) {
    status = "Warning";
    color = "#FFFF00";
  }
  if (aquarium.temperature < 22 || aquarium.temperature > 28) {
    status = "Critical";
    color = "#FF0000";
  }

  document.querySelectorAll(".temperatureStatus, #tempIndicator").forEach(el => {
    el.textContent = status;
  });

  document.querySelectorAll(".temperatureDot, #tempDot").forEach(el => {
    el.style.backgroundColor = color;
  });
}

function renderPH() {
  const text = aquarium.ph + " pH";

  document.querySelectorAll(".pHValue, #pHValue").forEach(el => {
    el.textContent = text;
  });

  let status = "Good";
  let color = "#39FF14";

  if (aquarium.ph < 6.8 || aquarium.ph > 7.5) {
    status = "Warning";
    color = "#FFFF00";
  }
  if (aquarium.ph < 6.0 || aquarium.ph > 8.5) {
    status = "Critical";
    color = "#FF0000";
  }

  document.querySelectorAll(".pHStatus, #pHIndicator").forEach(el => {
    el.textContent = status;
  });

  document.querySelectorAll(".pHDot, #pHDot").forEach(el => {
    el.style.backgroundColor = color;
  });

  document.querySelectorAll(".pHPointer, #pHPointer").forEach(pointer => {
    
    const totalCells = 15;
    const targetPercent = ((aquarium.ph + 0.5) / totalCells) * 100;

    pointer.style.left = `${targetPercent}%`;
  });
}

function toggleLight() {
  aquarium.lightOn = !aquarium.lightOn;
  renderLight();
}

function renderLight() {
  const lightDot = document.getElementById("lightDot");
  const lightStatus = document.getElementById("lightStatus");

  if (!lightDot || !lightStatus) return;

  if (aquarium.lightOn) {
    lightStatus.textContent = "ON";
    lightDot.classList.add("is-on");
  } else {
    lightStatus.textContent = "OFF";
    lightDot.classList.remove("is-on");
  }
}

function updateFilter() {
  aquarium.filterWear += 2;

  if (aquarium.filterWear > 100)
    aquarium.filterWear = 100;

  renderFilter();
}

function cleanFilter() {
  aquarium.filterWear = 0;
  renderFilter();
}

function renderFilter() {
  const percent = aquarium.filterWear;
  const isDanger = percent >= 80;
  
  const textColor = isDanger ? "#8B3A1E" : "#FFFFFF";
  const strokeColor = isDanger ? "#8B3A1E" : "#FF7F50";

  const percentEls = document.querySelectorAll("#filterPercent");
  percentEls.forEach(el => {
    el.textContent = percent + "%";
    el.style.color = textColor;
  });

  const maxCircleLength = 251.2;
  const offset = maxCircleLength - (percent / 100) * maxCircleLength;

  const circles = document.querySelectorAll(".filterCircle");
  circles.forEach(circle => {
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = strokeColor;
  });

  const statusEl = document.getElementById("filterStatusText");
  const statusElDashboard = document.getElementById("filterDashboardStatus");
  if (statusEl) {
    statusEl.textContent = isDanger ? "Need to clean filter" : "Filter is good";
    statusElDashboard.textContent = isDanger ? "Need to clean filter" : "Filter is good";
  }

  const filterDot = document.getElementById("filterDot");
  if (filterDot) {
    filterDot.style.backgroundColor = isDanger ? "#FF0000" : "#39FF14";
  }
}

function updateFeedingCountdown() {
  const now = new Date();
  let diff = aquarium.nextFeeding - now;

  if (diff <= 0) {
    calculateNextFeeding();
    diff = aquarium.nextFeeding - now;
  }

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const countdown = `${hours}h ${minutes}m ${seconds}s`;

  document.querySelectorAll(".feedCountdown, #feedCountdown").forEach(el => {
    el.textContent = countdown;
  });

  const nextTime = aquarium.nextFeeding.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  document.querySelectorAll(".nextFeed, #nextFeed").forEach(el => {
    el.textContent = nextTime;
  });
}

function renderFoodDispenser() {
  const percent = aquarium.foodLevel;
  
  document.querySelectorAll('.dispenserPercent, #dispenserPercent').forEach(el => {
    el.textContent = percent + " %";
  });
  
  document.querySelectorAll('#dispenserBar').forEach(bar => {
    bar.style.height = `calc(${percent}% - 8px)`;
    
    if (percent < 20) {
      bar.style.backgroundColor = '#8B3A1E';
    } else {
      bar.style.backgroundColor = '#FF7F50';
    }
  });
  
  const currentWeight = (aquarium.maxFoodWeightGrams * percent) / 100;
  const dailyConsumption = 4.5;
  const daysLeft = Math.floor(currentWeight / dailyConsumption);
  
  document.querySelectorAll('#dispenserStatusText').forEach(el => {
    if (percent < 20) {
      el.textContent = `Critical! Only ${daysLeft} days left`;
    } else {
      el.textContent = `Enough for ${daysLeft} days`;
    }
  });
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    updateFeedingScheduleDays();
    renderTemperature();
    renderPH();
    renderLight();
    renderFilter();
    updateFeedingCountdown();
    renderFoodDispenser();
    initOrUpdateChart();

    setInterval(updateTemperature, 30000);
    setInterval(updatePH, 30000);
    setInterval(updateFilter, 30000);
    setInterval(updateFeedingCountdown, 1000);

    const lightCard = $("lightCard");
    if (lightCard) {
      lightCard.addEventListener("click", toggleLight);
    }

    const cleanBtn = $("cleanFilterBtn");
    if (cleanBtn) {
      cleanBtn.addEventListener("click", cleanFilter);
    }
  }
);