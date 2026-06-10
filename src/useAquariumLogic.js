import { useEffect } from "react";
import Chart from "chart.js/auto";

const initialAquarium = {
  temperature: 24.6,
  ph: 7.4,
  lightOn: true,
  filterWear: 82,
  feedingHours: [11, 16, 21],
  nextFeeding: null,
  foodLevel: 54,
  maxFoodWeightGrams: 100,
  tempHistory: [24.3, 24.1, 24.7, 24.8, 24.5, 24.4, 24.6],
  phHistory: [7.2, 7.1, 7.3, 7.5, 7.4, 7.3, 7.4],
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const randomBoolean = () => Math.random() < 0.5;

export function useAquariumLogic() {
  useEffect(() => {
    document.body.className = "bg-tealBase text-white select-none";

    const aquarium = { ...initialAquarium };
    let tempChartInstance = null;

    const byId = (id) => document.getElementById(id);

    function updateFeedingScheduleDays() {
      const options = { day: "numeric", month: "short" };
      const today = new Date();
      const tomorrow = new Date(today);
      const dayAfterTomorrow = new Date(today);

      tomorrow.setDate(today.getDate() + 1);
      dayAfterTomorrow.setDate(today.getDate() + 2);

      document.querySelectorAll(".dayCurrent").forEach((el) => {
        el.textContent = today.toLocaleDateString("en-US", options);
      });
      document.querySelectorAll(".dayNext1").forEach((el) => {
        el.textContent = tomorrow.toLocaleDateString("en-US", options);
      });
      document.querySelectorAll(".dayNext2").forEach((el) => {
        el.textContent = dayAfterTomorrow.toLocaleDateString("en-US", options);
      });
    }

    function calculateNextFeeding() {
      const now = new Date();
      for (const hour of aquarium.feedingHours) {
        const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0);
        if (candidate > now) {
          aquarium.nextFeeding = candidate;
          return;
        }
      }

      aquarium.nextFeeding = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        aquarium.feedingHours[0],
        0,
        0,
        0
      );
    }

    function initOrUpdateChart() {
      const ctx = byId("tempChart");
      if (!ctx) return;

      const labels = [];
      for (let i = 6; i >= 0; i -= 1) {
        if (i === 0) {
          labels.push("Now");
        } else {
          const totalSeconds = i * 30;
          labels.push(totalSeconds >= 60 ? `-${totalSeconds / 60}m` : `-${totalSeconds}s`);
        }
      }

      if (tempChartInstance) {
        tempChartInstance.data.labels = labels;
        tempChartInstance.data.datasets[0].data = aquarium.tempHistory;
        tempChartInstance.update();
        return;
      }

      tempChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: aquarium.tempHistory,
              borderColor: "#FF7F50",
              backgroundColor: "rgba(255, 127, 80, 0.1)",
              borderWidth: 3,
              pointBackgroundColor: "#39FF14",
              pointRadius: 5,
              pointHoverRadius: 7,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { color: "rgba(0, 128, 128, 0.1)" },
              ticks: { color: "#FFFFFF", font: { family: "Inter" } },
            },
            y: {
              min: 16,
              max: 34,
              grid: { color: "rgba(0, 128, 128, 0.1)" },
              ticks: { color: "#FFFFFF", font: { family: "Inter" } },
            },
          },
        },
      });
    }

    function renderTemperature() {
      const text = `${aquarium.temperature} °C`;
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

      document.querySelectorAll(".tempValue, #tempValue").forEach((el) => {
        el.textContent = text;
      });
      document.querySelectorAll(".temperatureStatus, #tempIndicator").forEach((el) => {
        el.textContent = status;
      });
      document.querySelectorAll(".temperatureDot, #tempDot").forEach((el) => {
        el.style.backgroundColor = color;
      });
    }

    function renderPH() {
      const text = `${aquarium.ph} pH`;
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

      document.querySelectorAll(".pHValue, #pHValue").forEach((el) => {
        el.textContent = text;
      });
      document.querySelectorAll(".pHStatus, #pHIndicator").forEach((el) => {
        el.textContent = status;
      });
      document.querySelectorAll(".pHDot, #pHDot").forEach((el) => {
        el.style.backgroundColor = color;
      });
      document.querySelectorAll(".pHPointer, #pHPointer").forEach((pointer) => {
        pointer.style.left = `${((aquarium.ph + 0.5) / 15) * 100}%`;
      });
    }

    function renderLight() {
      const lightDot = byId("lightDot");
      const lightStatus = byId("lightStatus");
      if (!lightDot || !lightStatus) return;

      lightStatus.textContent = aquarium.lightOn ? "ON" : "OFF";
      lightDot.classList.toggle("is-on", aquarium.lightOn);
    }

    function renderFilter() {
      const percent = aquarium.filterWear;
      const isDanger = percent >= 80;
      const textColor = isDanger ? "#8B3A1E" : "#FFFFFF";
      const strokeColor = isDanger ? "#8B3A1E" : "#FF7F50";
      const offset = 251.2 - (percent / 100) * 251.2;

      document.querySelectorAll("#filterPercent").forEach((el) => {
        el.textContent = `${percent}%`;
        el.style.color = textColor;
      });
      document.querySelectorAll(".filterCircle").forEach((circle) => {
        circle.style.strokeDashoffset = offset;
        circle.style.stroke = strokeColor;
      });

      const statusText = isDanger ? "Need to clean filter" : "Filter is good";
      const statusEl = byId("filterStatusText");
      const dashboardStatusEl = byId("filterDashboardStatus");
      if (statusEl) statusEl.textContent = statusText;
      if (dashboardStatusEl) dashboardStatusEl.textContent = statusText;

      const filterDot = byId("filterDot");
      if (filterDot) filterDot.style.backgroundColor = isDanger ? "#FF0000" : "#39FF14";
    }

    function renderFoodDispenser() {
      const percent = aquarium.foodLevel;
      const currentWeight = (aquarium.maxFoodWeightGrams * percent) / 100;
      const daysLeft = Math.floor(currentWeight / 4.5);

      document.querySelectorAll(".dispenserPercent, #dispenserPercent").forEach((el) => {
        el.textContent = `${percent} %`;
      });
      document.querySelectorAll("#dispenserBar").forEach((bar) => {
        bar.style.height = `calc(${percent}% - 8px)`;
        bar.style.backgroundColor = percent < 20 ? "#8B3A1E" : "#FF7F50";
      });
      document.querySelectorAll("#dispenserStatusText").forEach((el) => {
        el.textContent = percent < 20 ? `Critical! Only ${daysLeft} times left` : `Enough for ${daysLeft} times`;
      });
    }

    function updateTemperature() {
      const delta = Number((Math.random() * 1).toFixed(1));
      aquarium.temperature += randomBoolean() ? delta : -delta;
      aquarium.temperature = Number(clamp(aquarium.temperature, 18, 32).toFixed(1));
      aquarium.tempHistory.push(aquarium.temperature);
      aquarium.tempHistory.shift();
      renderTemperature();
      initOrUpdateChart();
    }

    function updatePH() {
      const delta = Number((Math.random() * 0.3).toFixed(1));
      aquarium.ph += randomBoolean() ? delta : -delta;
      aquarium.ph = Number(clamp(aquarium.ph, 0, 14).toFixed(1));
      aquarium.phHistory.push(aquarium.ph);
      aquarium.phHistory.shift();
      renderPH();
    }

    function updateFilter() {
      aquarium.filterWear = Math.min(100, aquarium.filterWear + 2);
      renderFilter();
    }

    function cleanFilter() {
      aquarium.filterWear = 0;
      renderFilter();
    }

    function updateFeedingCountdown() {
      const now = new Date();
      let diff = aquarium.nextFeeding - now;

      if (diff <= 0) {
        aquarium.foodLevel -= 4.5;
        if (aquarium.foodLevel < 0) aquarium.foodLevel = 100;
        renderFoodDispenser();
        calculateNextFeeding();
        diff = aquarium.nextFeeding - now;
      }

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      const countdown = `${hours}h ${minutes}m ${seconds}s`;
      const nextTime = aquarium.nextFeeding.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      document.querySelectorAll(".feedCountdown, #feedCountdown").forEach((el) => {
        el.textContent = countdown;
      });
      document.querySelectorAll(".nextFeed, #nextFeed").forEach((el) => {
        el.textContent = nextTime;
      });
    }

    calculateNextFeeding();
    updateFeedingScheduleDays();
    renderTemperature();
    renderPH();
    renderLight();
    renderFilter();
    updateFeedingCountdown();
    renderFoodDispenser();
    initOrUpdateChart();

    const lightCard = byId("lightCard");
    const cleanButton = byId("cleanFilterBtn");
    const toggleLight = () => {
      aquarium.lightOn = !aquarium.lightOn;
      renderLight();
    };

    lightCard?.addEventListener("click", toggleLight);
    cleanButton?.addEventListener("click", cleanFilter);

    const intervals = [
      setInterval(updateTemperature, 30000),
      setInterval(updatePH, 30000),
      setInterval(updateFilter, 30000),
      setInterval(updateFeedingCountdown, 1000),
    ];

    return () => {
      intervals.forEach(clearInterval);
      lightCard?.removeEventListener("click", toggleLight);
      cleanButton?.removeEventListener("click", cleanFilter);
      tempChartInstance?.destroy();
      document.body.className = "";
    };
  }, []);
}
