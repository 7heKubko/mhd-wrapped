


import { applyTheme, showToast, getLineColors } from "./ui.js";
import { loadRides } from "./storage.js";
import { getTotal, getTopLine, getFavBus, getPersona, getFavVehicleMode, getFavModelOnLine } from "./wrapped.js";
import { getCurrentUser } from "./supabase.js";

// Apply theme immediately for correct background
applyTheme();

window.addEventListener("DOMContentLoaded", async () => {
  applyTheme();
  // Zobraz login popup
  const popup = document.getElementById("loginPopup");
  if (popup) {
    try {
      const user = await getCurrentUser();
      if (user && user.email) {
        popup.textContent = `Ste prihlásený ako ${user.email}`;
        popup.style.background = "#e6ffe6";
        popup.style.color = "#1a661a";
      } else {
        popup.textContent = "Nie ste prihlásený!";
        popup.style.background = "#ffe6e6";
        popup.style.color = "#a11a1a";
      }
      popup.style.display = "block";
      setTimeout(() => { popup.style.display = "none"; }, 3500);
    } catch {
      popup.textContent = "Nie ste prihlásený!";
      popup.style.background = "#ffe6e6";
      popup.style.color = "#a11a1a";
      popup.style.display = "block";
      setTimeout(() => { popup.style.display = "none"; }, 3500);
    }
  }
  main();
});

function main() {
  // Robust element selection
  const wTotal = document.getElementById("wTotal");
  const wTopLine = document.getElementById("wTopLine");
  const wTopBus = document.getElementById("wTopBus");
  const wPersona = document.getElementById("wPersona");
  const wTopModelOnLine = document.getElementById("wTopModelOnLine");
  const wTopMode = document.getElementById("wTopMode");
  const monthLabel = document.getElementById("monthLabel");
  const monthStats = document.getElementById("monthStats");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");
  const btn = document.getElementById("toggleVehiclesChart");

  let chartLinesInstance = null;
  let chartVehiclesInstance = null;
  let chartHoursInstance = null;
  let showAllVehicles = false;
  const VEHICLE_TOP_N = 5;
  let currentMonthOffset = 0;

  function renderWrappedStats() {
    const rides = loadRides();
    if (!rides || rides.length === 0) {
      if (wTotal) wTotal.textContent = "0";
      if (wTopLine) wTopLine.textContent = "-";
      if (wTopBus) wTopBus.textContent = "-";
      if (wPersona) wPersona.textContent = "-";
      if (wTopModelOnLine) wTopModelOnLine.textContent = "-";
      if (wTopMode) wTopMode.textContent = "-";
      return;
    }
    if (wTotal) wTotal.textContent = getTotal(rides);
    const [line, lineData] = getTopLine(rides);
    if (wTopLine) wTopLine.textContent = `${line} (${lineData.count}×)`;
    const [bus] = getFavBus(rides);
    if (wTopBus) wTopBus.textContent = bus;
    if (wTopModelOnLine) {
      const [model, count] = getFavModelOnLine(rides, line);
      wTopModelOnLine.textContent = `${model} (${count}×)`;
    }
    if (wTopMode) {
      const [mode, count] = getFavVehicleMode(rides);
      wTopMode.textContent = `${mode} (${count}×)`;
    }
    if (wPersona) wPersona.textContent = getPersona(rides);
    // Priemerný počet jázd za deň/týždeň/mesiac
    const days = new Set(rides.map(r => r.date));
    const weeks = new Set(rides.map(r => {
      const d = new Date(r.date);
      return d.getFullYear() + '-' + getWeekNumber(d);
    }));
    const months = new Set(rides.map(r => r.date.slice(0,7)));
    const avgPerDay = days.size ? (rides.length / days.size).toFixed(2) : '-';
    const avgPerWeek = weeks.size ? (rides.length / weeks.size).toFixed(2) : '-';
    const avgPerMonth = months.size ? (rides.length / months.size).toFixed(2) : '-';
    const wAvgPerDay = document.getElementById('wAvgPerDay');
    const wAvgPerWeek = document.getElementById('wAvgPerWeek');
    const wAvgPerMonth = document.getElementById('wAvgPerMonth');
    if (wAvgPerDay) wAvgPerDay.textContent = avgPerDay;
    if (wAvgPerWeek) wAvgPerWeek.textContent = avgPerWeek;
    if (wAvgPerMonth) wAvgPerMonth.textContent = avgPerMonth;
    // Podiel typov vozidiel
    const modeMap = {};
    rides.forEach(r => {
      const mode = r.vehicleMode || 'neznámy';
      if (!modeMap[mode]) modeMap[mode] = 0;
      modeMap[mode]++;
    });
    const total = rides.length;
    const modeShare = Object.entries(modeMap)
      .map(([mode, count]) => `${mode}: ${(100*count/total).toFixed(1)}%`)
      .join(', ');
    const wModeShare = document.getElementById('wModeShare');
    if (wModeShare) wModeShare.textContent = modeShare || '-';
    // Počet jázd v noci (22:00–5:00)
    const nightRides = rides.filter(r => {
      const h = parseInt(r.time.split(':')[0]);
      return (h >= 22 || h < 5);
    }).length;
    const wNightRides = document.getElementById('wNightRides');
    if (wNightRides) wNightRides.textContent = nightRides;
  }

  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  }

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
    const lineColors = getLineColors();
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

  function renderVehiclesChart() {
    const rides = loadRides();
    const map = {};
    rides.forEach((r) => {
      if (!map[r.vehicle]) map[r.vehicle] = 0;
      map[r.vehicle]++;
    });
    let sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    let labels, data;
    if (!showAllVehicles && sorted.length > VEHICLE_TOP_N) {
      const top = sorted.slice(0, VEHICLE_TOP_N);
      const rest = sorted.slice(VEHICLE_TOP_N);
      const restSum = rest.reduce((sum, [, count]) => sum + count, 0);
      labels = top.map(([name]) => name).concat("Ostatné");
      data = top.map(([, count]) => count).concat(restSum);
    } else {
      labels = sorted.map(([name]) => name);
      data = sorted.map(([, count]) => count);
    }
    const ctx = document.getElementById("chartVehicles");
    if (!ctx) return;
    if (chartVehiclesInstance) chartVehiclesInstance.destroy();
    chartVehiclesInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: "#34c759"
          }
        ]
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true
      }
    });
    // Update button text
    if (btn) {
      btn.textContent = showAllVehicles ? "Zobraziť menej typov" : "Zobraziť všetky typy";
    }
  }

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

  function getMonthName(date) {
    return date.toLocaleString("sk-SK", { month: "long", year: "numeric" });
  }

  function renderMonthStats() {
    const rides = loadRides();
    const now = new Date();
    now.setMonth(now.getMonth() + currentMonthOffset);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    if (monthLabel) monthLabel.textContent = getMonthName(now);
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
    const lineColors = getLineColors();
    if (monthStats) monthStats.innerHTML = "";
    if (!sorted.length) {
      if (monthStats) monthStats.innerHTML = "<li>Žiadne jazdy v tomto mesiaci</li>";
      return;
    }
    sorted.forEach(([line, count]) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="line-badge" style="--badge-color:${lineColors[line] || "#888"}">${line}</span>
        ${count}×
      `;
      if (monthStats) monthStats.appendChild(li);
    });
  }

  if (prevMonthBtn) prevMonthBtn.onclick = () => {
    currentMonthOffset--;
    renderMonthStats();
  };
  if (nextMonthBtn) nextMonthBtn.onclick = () => {
    currentMonthOffset++;
    renderMonthStats();
  };
  if (btn) {
    btn.onclick = () => {
      showAllVehicles = !showAllVehicles;
      renderVehiclesChart();
    };
  }

  renderWrappedStats();
  renderLinesChart();
  renderVehiclesChart();
  renderHoursChart();
  renderMonthStats();
}

