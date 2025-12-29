import { applyTheme, showToast, lineColors } from "./ui.js";
import { loadRides } from "./storage.js";
import { getTotal, getTopLine, getFavBus, getPersona } from "./wrapped.js";

applyTheme();

const wTotal = document.getElementById("wTotal");
const wTopLine = document.getElementById("wTopLine");
const wTopBus = document.getElementById("wTopBus");
const wPersona = document.getElementById("wPersona");

const monthLabel = document.getElementById("monthLabel");
const monthStats = document.getElementById("monthStats");

const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

function renderWrappedStats() {
  const rides = loadRides();

  wTotal.textContent = getTotal(rides);

  const [line, lineData] = getTopLine(rides);
  wTopLine.textContent = `${line} (${lineData.count}×)`;

  const [bus] = getFavBus(rides);
  wTopBus.textContent = bus;

  wPersona.textContent = getPersona(rides);
}

let chartLinesInstance = null;

function renderLinesChart() {
  const rides = loadRides();
  const map = {};

  rides.forEach((r) => {
    const main = r.line.split("/")[0];
    if (!map[main]) map[main] = 0;
    map[main]++;
  });

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  const ctx = document.getElementById("chartLines");
  if (!ctx) return;

  if (chartLinesInstance) chartLinesInstance.destroy();

  chartLinesInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map((x) => x[0]),
      datasets: [
        {
          data: sorted.map((x) => x[1]),
          backgroundColor: sorted.map(([line]) => lineColors[line] || "#007aff")
        }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      responsive: true
    }
  });
}

let chartVehiclesInstance = null;

function renderVehiclesChart() {
  const rides = loadRides();
  const map = {};

  rides.forEach((r) => {
    if (!map[r.vehicle]) map[r.vehicle] = 0;
    map[r.vehicle]++;
  });

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  const ctx = document.getElementById("chartVehicles");
  if (!ctx) return;

  if (chartVehiclesInstance) chartVehiclesInstance.destroy();

  chartVehiclesInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map((x) => x[0]),
      datasets: [
        {
          data: sorted.map((x) => x[1]),
          backgroundColor: "#34c759"
        }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      responsive: true
    }
  });
}

let chartHoursInstance = null;

function renderHoursChart() {
  const rides = loadRides();
  const hours = Array(24).fill(0);

  rides.forEach((r) => {
    const h = parseInt(r.time.split(":")[0]);
    hours[h]++;
  });

  const ctx = document.getElementById("chartHours");
  if (!ctx) return;

  if (chartHoursInstance) chartHoursInstance.destroy();

  chartHoursInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: hours.map((_, i) => `${i}:00`),
      datasets: [
        {
          data: hours,
          backgroundColor: "#ff9500"
        }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      responsive: true
    }
  });
}

let currentMonthOffset = 0;

function getMonthName(date) {
  return date.toLocaleString("sk-SK", { month: "long", year: "numeric" });
}

function renderMonthStats() {
  const rides = loadRides();

  const now = new Date();
  now.setMonth(now.getMonth() + currentMonthOffset);

  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  monthLabel.textContent = getMonthName(now);

  const filtered = rides.filter((r) => {
    const [y, m] = r.date.split("-").map(Number);
    return y === year && m === month;
  });

  const map = {};

  filtered.forEach((r) => {
    const main = r.line.split("/")[0];
    if (!map[main]) map[main] = 0;
    map[main]++;
  });

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  monthStats.innerHTML = "";

  if (!sorted.length) {
    monthStats.innerHTML = "<li>Žiadne jazdy v tomto mesiaci</li>";
    return;
  }

  sorted.forEach(([line, count]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="line-badge" style="--badge-color:${lineColors[line] || "#888"}">${line}</span>
      ${count}×
    `;
    monthStats.appendChild(li);
  });
}

prevMonthBtn.onclick = () => {
  currentMonthOffset--;
  renderMonthStats();
};

nextMonthBtn.onclick = () => {
  currentMonthOffset++;
  renderMonthStats();
};

renderWrappedStats();
renderLinesChart();
renderVehiclesChart();
renderHoursChart();
renderMonthStats();
