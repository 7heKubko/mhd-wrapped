import { applyTheme, showToast, getLineColors } from "./ui.js";
import { loadRides } from "./storage.js";
import {
  getTotal,
  getTopLine,
  getFavBus,
  getPersona,
  getFavVehicleMode,
  getFavModelOnLine,
} from "./wrapped.js";
import { getCurrentUser } from "./supabase.js";

applyTheme();

window.addEventListener("DOMContentLoaded", async () => {
  applyTheme();
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
      setTimeout(() => {
        popup.style.display = "none";
      }, 3500);
    } catch {
      popup.textContent = "Nie ste prihlásený!";
      popup.style.background = "#ffe6e6";
      popup.style.color = "#a11a1a";
      popup.style.display = "block";
      setTimeout(() => {
        popup.style.display = "none";
      }, 3500);
    }
  }
  main();
});

// Ensure selectedYear is defined at the top of the file
let selectedYear = "all";

// Ensure allRides is defined at the top of the file
let allRides = loadRides();

// Ensure showAllECVs is defined at the top of the file
let showAllECVs = false;

// Ensure ECV_TOP_N is defined at the top of the file
const ECV_TOP_N = 5;

// Ensure VEHICLE_TYPE_TOP_N is defined at the top of the file
const VEHICLE_TOP_N = 5;

// Ensure LINES_TOP_N is defined at the top of the file
const LINES_TOP_N = 5;

// Ensure showAllVehicles is defined at the top of the file
let showAllVehicles = false;

// Ensure showAllLines is defined at the top of the file
let showAllLines = false;

// Ensure showAllVehicleTypes is defined at the top of the file
let showAllVehicleTypes = false;

function getRides() {
  if (selectedYear === "all") return allRides;
  return allRides.filter((r) => r.date.startsWith(selectedYear + "-"));
}

function main() {
  const defaultStatsOrder = [
    "chartLines",
    "chartVehicles",
    "chartHours",
    "chartByWeekday",
    "chartByMonth",
    "chartByDriveType",
    "chartByHoliday",
    "chartByVehicleType",
    "monthStats",
    "yearStats",
    "longestStreak",
    "longestPause",
    "wrappedGrid",
  ];
  let statsOrder =
    JSON.parse(localStorage.getItem("statsOrder") || "null") ||
    defaultStatsOrder;
  const sectionMap = {
    chartLines: document.querySelector("section:has(#chartLines)"),
    chartVehicles: document.querySelector("section:has(#chartVehicles)"),
    chartHours: document.querySelector("section:has(#chartHours)"),
    chartByWeekday: document.querySelector("section:has(#chartByWeekday)"),
    chartByMonth: document.querySelector("section:has(#chartByMonth)"),
    chartByDriveType: document.querySelector("section:has(#chartByDriveType)"),
    chartByHoliday: document.querySelector("section:has(#chartByHoliday)"),
    chartByVehicleType: document.querySelector(
      "section:has(#chartByVehicleType)"
    ),
    monthStats: document.querySelector("section:has(#monthStats)"),
    yearStats: document.querySelector("section:has(#yearStats)"),
    longestStreak: document.querySelector("section:has(#longestStreak)"),
    longestPause: document.querySelector("section:has(#longestPause)"),
    wrappedGrid: document.querySelector("section:has(.wrapped-grid)"),
  };
  function reorderSections() {
    const main = document.querySelector("main.page");
    const statsOrder =
      JSON.parse(localStorage.getItem("statsOrder") || "null") ||
      defaultStatsOrder;
    statsOrder.forEach((id) => {
      const section =
        id === "wrappedGrid"
          ? document.querySelector("section:has(.wrapped-grid)")
          : document.querySelector(`section:has(#${id})`);
      if (section) main.appendChild(section);
    });
  }
  const yearSelect = document.getElementById("statsYearSelect");
  let allYears = Array.from(
    new Set(allRides.map((r) => r.date.split("-")[0]))
  ).sort((a, b) => b - a);
  let currentYearIdx = 0;
  if (yearSelect) {
    yearSelect.innerHTML =
      '<option value="all">Všetky roky</option>' +
      allYears.map((y) => `<option value="${y}">${y}</option>`).join("");
    yearSelect.addEventListener("change", () => {
      if (yearSelect.value === "all") {
        selectedYear = "all";
        rerenderAll();
      } else {
        const idx = allYears.indexOf(yearSelect.value);
        if (idx !== -1) {
          currentYearIdx = idx;
          updateYearLabel();
          renderYearStats();
        }
      }
    });
  }
  const prevYearBtn = document.getElementById("prevYear");
  const nextYearBtn = document.getElementById("nextYear");
  function getCurrentYear() {
    return allYears[currentYearIdx] || null;
  }
  function updateYearLabel() {
    const yearLabel = document.getElementById("yearLabel");
    if (yearLabel) yearLabel.textContent = getCurrentYear() || "";
  }
  if (prevYearBtn)
    prevYearBtn.onclick = () => {
      if (currentYearIdx < allYears.length - 1) {
        currentYearIdx++;
        updateYearLabel();
        renderYearStats();
      }
    };
  if (nextYearBtn)
    nextYearBtn.onclick = () => {
      if (currentYearIdx > 0) {
        currentYearIdx--;
        updateYearLabel();
        renderYearStats();
      }
    };
  // Move the getRides function definition here to ensure it is available
  function getRides() {
    if (selectedYear === "all") return allRides;
    return allRides.filter((r) => r.date.startsWith(selectedYear + "-"));
  }
  function renderYearStats() {
    const rides = allRides.filter((r) =>
      r.date.startsWith(getCurrentYear() + "-")
    );
    const map = {};
    rides.forEach((r) => {
      const main = r.line.split("/")[0];
      if (!map[main]) map[main] = 0;
      map[main]++;
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const ctx = document.getElementById("chartByYear");
    if (ctx) {
      if (chartByYearInstance) chartByYearInstance.destroy();
      if (sorted.length) {
        const lineColors = getLineColors();
        chartByYearInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: sorted.map(([line]) => line),
            datasets: [
              {
                data: sorted.map(([, count]) => count),
                backgroundColor: sorted.map(
                  ([line]) => lineColors[line] || "#888"
                ),
              },
            ],
          },
          options: {
            plugins: { legend: { display: false } },
            responsive: true,
          },
        });
      } else {
        ctx.getContext("2d").clearRect(0, 0, ctx.width, ctx.height);
      }
    }
    const yearStats = document.getElementById("yearStats");
    if (!yearStats) return;
    yearStats.innerHTML = "";
    if (!sorted.length) {
      yearStats.innerHTML = "<li>Žiadne jazdy v tomto roku</li>";
      return;
    }
    const lineColors = getLineColors();
    sorted.forEach(([line, count]) => {
      const li = document.createElement("li");
      let badgeClass = "line-badge";
      const city = localStorage.getItem("city") || "bratislava";
      const n = parseInt(line, 10);
      if (city === "bratislava") {
        if (!isNaN(n) && n >= 205 && n <= 999)
          badgeClass += " line-badge--black";
        else badgeClass += " line-badge--white";
      } else if (city === "ostrava") {
        badgeClass += " line-badge--black";
      }
      li.innerHTML = `
        <span class="${badgeClass}" style="--badge-color:${
        lineColors[line] || "#888"
      }">${line}</span>
        ${count}×
      `;
      yearStats.appendChild(li);
    });
  }
  function renderByWeekdayChart() {
    const rides = getRides();
    const days = [
      "Pondelok",
      "Utorok",
      "Streda",
      "Štvrtok",
      "Piatok",
      "Sobota",
      "Nedeľa",
    ];
    const counts = Array(7).fill(0);
    rides.forEach((r) => {
      const d = new Date(r.date);
      const idx = (d.getDay() + 6) % 7; // 0=pondelok
      counts[idx]++;
    });
    const ctx = document.getElementById("chartByWeekday");
    if (!ctx) return;
    if (ctx.chart) ctx.chart.destroy();
    ctx.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: days,
        datasets: [{ data: counts, backgroundColor: "#007aff" }],
      },
      options: { plugins: { legend: { display: false } }, responsive: true },
    });
  }

  function renderByMonthChart() {
    const rides = getRides();
    const months = Array(12).fill(0);
    rides.forEach((r) => {
      const m = parseInt(r.date.split("-")[1], 10) - 1;
      if (m >= 0 && m < 12) months[m]++;
    });
    const ctx = document.getElementById("chartByMonth");
    if (!ctx) return;
    if (ctx.chart) ctx.chart.destroy();
    ctx.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Máj",
          "Jún",
          "Júl",
          "Aug",
          "Sep",
          "Okt",
          "Nov",
          "Dec",
        ],
        datasets: [{ data: months, backgroundColor: "#34c759" }],
      },
      options: { plugins: { legend: { display: false } }, responsive: true },
    });
  }

  function renderLongestStreak() {
    const rides = getRides();
    if (!rides.length) {
      document.getElementById("longestStreak").textContent = "-";
      return;
    }
    const days = Array.from(new Set(rides.map((r) => r.date))).sort();
    let maxStreak = 1,
      curStreak = 1;
    for (let i = 1; i < days.length; i++) {
      const prev = new Date(days[i - 1]);
      const curr = new Date(days[i]);
      if (curr - prev === 86400000) curStreak++;
      else curStreak = 1;
      if (curStreak > maxStreak) maxStreak = curStreak;
    }
    document.getElementById("longestStreak").textContent = maxStreak + " dní";
  }

  function renderLongestPause() {
    const rides = getRides();
    if (!rides.length) {
      document.getElementById("longestPause").textContent = "-";
      return;
    }
    const days = Array.from(new Set(rides.map((r) => r.date))).sort();
    let maxPause = 0;
    for (let i = 1; i < days.length; i++) {
      const prev = new Date(days[i - 1]);
      const curr = new Date(days[i]);
      const diff = (curr - prev) / 86400000;
      if (diff > maxPause) maxPause = diff;
    }
    document.getElementById("longestPause").textContent = maxPause + " dní";
  }

  function renderByDriveTypeChart() {
    const rides = getRides();
    const map = {};
    rides.forEach((r) => {
      let drive = r.driveType || r.vehicleMode || "neznámy";
      if (
        r.vehicleMode === "Trolejbus" ||
        r.vehicleMode === "Električka" ||
        r.vehicleMode === "Train"
      ) {
        drive = "Elektrický";
      } else if (r.vehicleMode === "Autobus") {
        drive = "Diesel";
      }
      if (!map[drive]) map[drive] = 0;
      map[drive]++;
    });
    const ctx = document.getElementById("chartByDriveType");
    if (!ctx) return;
    if (ctx.chart) ctx.chart.destroy();

    const savedColors = JSON.parse(localStorage.getItem("typeColors") || "{}");
    const driveColors = {
      Diesel: savedColors.diesel || "#ff5733",
      Elektrický: savedColors.electric || "#33c9ff",
      Hybrid: savedColors.hybrid || "#4caf50",
      Benzín: savedColors.petrol || "#ffc107",
      Vodík: savedColors.hydrogen || "#8e44ad",
      Plyn: savedColors.gas || "#3498db",
      Solárny: savedColors.solar || "#f1c40f",
      Neznámy: "#888",
    };

    const labels = Object.keys(map);
    const data = Object.values(map);
    const bgColors = labels.map((drive) => driveColors[drive] || "#888");

    ctx.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{ data, backgroundColor: bgColors }],
      },
      options: { plugins: { legend: { display: false } }, responsive: true },
    });
  }

  function renderByHolidayChart() {
    const rides = getRides();
    const holidaysSK = [
      "-01-01",
      "-01-06",
      "-05-01",
      "-05-08",
      "-07-05",
      "-08-29",
      "-09-01",
      "-09-15",
      "-11-01",
      "-11-17",
      "-12-24",
      "-12-25",
      "-12-26",
    ];
    let holidays = 0,
      workdays = 0;
    rides.forEach((r) => {
      const d = new Date(r.date);
      const day = d.getDay();
      const isHoliday =
        day === 0 || day === 6 || holidaysSK.some((h) => r.date.endsWith(h));
      if (isHoliday) holidays++;
      else workdays++;
    });
    const ctx = document.getElementById("chartByHoliday");
    if (!ctx) return;
    if (ctx.chart) ctx.chart.destroy();
    ctx.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Sviatky/prázdniny", "Pracovné dni"],
        datasets: [
          {
            data: [holidays, workdays],
            backgroundColor: ["#ff6384", "#36a2eb"],
          },
        ],
      },
      options: { responsive: true },
    });
  }

  function renderByVehicleTypeChart() {
    const rides = getRides();
    const map = {};
    rides.forEach((r) => {
      const type = r.vehicleMode || "neznámy";
      if (!map[type]) map[type] = 0;
      map[type]++;
    });

    const sortedEntries = Object.entries(map).sort(([, a], [, b]) => b - a);
    const entriesToShow = showAllVehicleTypes
      ? sortedEntries
      : sortedEntries.slice(0, VEHICLE_TOP_N);

    const labels = entriesToShow.map(([type]) => type);
    const data = entriesToShow.map(([, count]) => count);

    const ctx = document.getElementById("chartByVehicleType");
    if (!ctx) return;
    if (ctx.chart) ctx.chart.destroy();

    const typeColors = JSON.parse(localStorage.getItem("typeColors") || "{}");
    const colorMap = {
      Električka: typeColors.tram || "#ff9500",
      Trolejbus: typeColors.trolley || "#34c759",
      Autobus: typeColors.bus || "#007aff",
      Vlak: typeColors.train || "#8e44ad",
    };
    const bgColors = labels.map((type) => colorMap[type] || "#888");

    ctx.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [{ data, backgroundColor: bgColors }],
      },
      options: { responsive: true },
    });
  }

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
  const toggleVehicleTypesBtn = document.getElementById(
    "toggleVehicleTypesChart"
  );
  const toggleECVChartBtn = document.getElementById("toggleECVChart");
  const toggleLinesChartBtn = document.getElementById("toggleLinesChart");

  let chartLinesInstance = null;
  let chartVehiclesInstance = null;
  let chartHoursInstance = null;
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
    if (wTopModelOnLine) {
      const [model, count] = getFavModelOnLine(rides, line);
      wTopModelOnLine.textContent = `${model} (${count}×)`;
    }

    if (wTopBus) {
      const [bus, count] = getFavBus(rides);
      wTopBus.textContent = `${bus} (${count}×)`;
    }
    if (wTopMode) {
      const [mode, count] = getFavVehicleMode(rides);
      wTopMode.textContent = `${mode} (${count}×)`;
    }
    if (wPersona) wPersona.textContent = getPersona(rides);
    const days = new Set(rides.map((r) => r.date));
    const weeks = new Set(
      rides.map((r) => {
        const d = new Date(r.date);
        return d.getFullYear() + "-" + getWeekNumber(d);
      })
    );
    const months = new Set(rides.map((r) => r.date.slice(0, 7)));
    const avgPerDay = days.size ? (rides.length / days.size).toFixed(2) : "-";
    const avgPerWeek = weeks.size
      ? (rides.length / weeks.size).toFixed(2)
      : "-";
    const avgPerMonth = months.size
      ? (rides.length / months.size).toFixed(2)
      : "-";
    const wAvgPerDay = document.getElementById("wAvgPerDay");
    const wAvgPerWeek = document.getElementById("wAvgPerWeek");
    const wAvgPerMonth = document.getElementById("wAvgPerMonth");
    if (wAvgPerDay) wAvgPerDay.textContent = avgPerDay;
    if (wAvgPerWeek) wAvgPerWeek.textContent = avgPerWeek;
    if (wAvgPerMonth) wAvgPerMonth.textContent = avgPerMonth;
    const modeMap = {};
    rides.forEach((r) => {
      const mode = r.vehicleMode || "neznámy";
      if (!modeMap[mode]) modeMap[mode] = 0;
      modeMap[mode]++;
    });
    const total = rides.length;
    const modeShare = Object.entries(modeMap)
      .map(([mode, count]) => `${mode}: ${((100 * count) / total).toFixed(1)}%`)
      .join(", ");
    const wModeShare = document.getElementById("wModeShare");
    if (wModeShare) wModeShare.textContent = modeShare || "-";
    const nightRides = rides.filter((r) => {
      const h = parseInt(r.time.split(":")[0]);
      return h >= 22 || h < 5;
    }).length;
    const wNightRides = document.getElementById("wNightRides");
    if (wNightRides) wNightRides.textContent = nightRides;

    // New statistics
    const uniqueLines = new Set(rides.map((ride) => ride.line)).size;
    const uniqueVehicles = new Set(rides.map((ride) => ride.number)).size;
    document.getElementById("wUniqueLines").textContent = uniqueLines;
    document.getElementById("wUniqueVehicles").textContent = uniqueVehicles;
    const ridesPerDay = rides.reduce((acc, ride) => {
      acc[ride.date] = (acc[ride.date] || 0) + 1;
      return acc;
    }, {});
    const recordDay = Object.keys(ridesPerDay).reduce((a, b) =>
      ridesPerDay[a] > ridesPerDay[b] ? a : b
    );

    document.getElementById("wRecordDay").textContent = recordDay;
  }

  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  function renderLinesChart() {
    const rides = getRides();
    const map = {};

    rides.forEach((r) => {
      const line = r.line || "neznáma linka";
      if (!map[line]) map[line] = 0;
      map[line]++;
    });

    const sortedEntries = Object.entries(map).sort(([, a], [, b]) => b - a);
    const entriesToShow = showAllLines
      ? sortedEntries
      : sortedEntries.slice(0, LINES_TOP_N);

    const labels = entriesToShow.map(([line]) => line);
    const data = entriesToShow.map(([, count]) => count);

    const ctx = document.getElementById("chartLines");
    if (!ctx) return;
    if (ctx.chart) ctx.chart.destroy();

    const lineColors = getLineColors();
    const bgColors = labels.map((line) => lineColors[line] || "#888");

    ctx.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: bgColors,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        responsive: true,
      },
    });
  }

  if (prevMonthBtn)
    prevMonthBtn.onclick = () => {
      currentMonthOffset--;
      renderMonthStats();
    };
  if (nextMonthBtn)
    nextMonthBtn.onclick = () => {
      currentMonthOffset++;
      renderMonthStats();
    };
  if (btn) {
    btn.onclick = () => {
      showAllVehicles = !showAllVehicles;
      renderVehiclesChart();
    };
  }
  if (toggleVehicleTypesBtn) {
    toggleVehicleTypesBtn.addEventListener("click", () => {
      showAllVehicleTypes = !showAllVehicleTypes;
      toggleVehicleTypesBtn.textContent = showAllVehicleTypes
        ? "Zobraziť top 5 typov"
        : "Zobraziť všetky typy";
      renderByVehicleTypeChart();
    });
  }
  if (toggleECVChartBtn) {
    toggleECVChartBtn.addEventListener("click", () => {
      showAllECVs = !showAllECVs;
      toggleECVChartBtn.textContent = showAllECVs
        ? "Zobraziť top 5 vozidiel"
        : "Zobraziť všetky vozidlá";
      renderByECVChart();
    });
  }
  if (toggleLinesChartBtn) {
    toggleLinesChartBtn.addEventListener("click", () => {
      showAllLines = !showAllLines;
      toggleLinesChartBtn.textContent = showAllLines
        ? "Zobraziť top 5 liniek"
        : "Zobraziť všetky linky";
      renderLinesChart();
    });
  }

  function updateDynamicTopLine() {
    const topLineElement = document.getElementById("wTopLine");
    const dynamicTopLineElement = document.getElementById("dynamicTopLine");
    if (topLineElement && dynamicTopLineElement) {
      dynamicTopLineElement.textContent =
        topLineElement.textContent.split(" ")[0] || "-";
    }
  }

  function rerenderAll() {
    renderLinesChart();
    renderVehiclesChart();
    renderHoursChart();
    renderByWeekdayChart();
    renderByMonthChart();
    renderByDriveTypeChart();
    renderByHolidayChart();
    renderByVehicleTypeChart();
    renderByECVChart(); // Ensure ECV chart is rendered
    renderMonthStats();
    renderYearStats();
    renderLongestStreak();
    renderLongestPause();
    renderWrappedStats();
    updateDynamicTopLine();
  }
  reorderSections();
  rerenderAll();
}

function renderByECVChart() {
  const rides = getRides();
  const map = {};

  rides.forEach((r) => {
    const label = `${r.vehicle || "neznámy"} - ${r.number || "neznámy"}`;
    if (!map[label]) map[label] = 0;
    map[label]++;
  });

  const sortedEntries = Object.entries(map).sort(([, a], [, b]) => b - a);
  const entriesToShow = showAllECVs
    ? sortedEntries
    : sortedEntries.slice(0, ECV_TOP_N);

  const labels = entriesToShow.map(([label]) => label);
  const data = entriesToShow.map(([, count]) => count);

  const ctx = document.getElementById("chartByECV");
  if (!ctx) return;
  if (ctx.chart) ctx.chart.destroy();

  ctx.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: "#ffcc00",
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      responsive: true,
    },
  });
}

function renderVehiclesChart() {
  const rides = getRides();
  const map = {};

  rides.forEach((r) => {
    const vehicle = r.vehicle || "neznáme vozidlo";
    if (!map[vehicle]) map[vehicle] = 0;
    map[vehicle]++;
  });

  const sortedEntries = Object.entries(map).sort(([, a], [, b]) => b - a);
  const entriesToShow = showAllVehicles
    ? sortedEntries
    : sortedEntries.slice(0, VEHICLE_TOP_N);

  const labels = entriesToShow.map(([vehicle]) => vehicle);
  const data = entriesToShow.map(([, count]) => count);

  const ctx = document.getElementById("chartVehicles");
  if (!ctx) return;
  if (ctx.chart) ctx.chart.destroy();

  ctx.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: "#34c759",
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      responsive: true,
    },
  });
}

function renderHoursChart() {
  const rides = getRides();
  const hours = Array(24).fill(0);

  rides.forEach((r) => {
    const hour = new Date(r.date).getHours();
    hours[hour]++;
  });

  const ctx = document.getElementById("chartHours");
  if (!ctx) return;
  if (ctx.chart) ctx.chart.destroy();

  ctx.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [
        {
          data: hours,
          backgroundColor: "#ff5733",
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      responsive: true,
    },
  });
}

function renderMonthStats() {
  const rides = getRides();
  const months = Array(12).fill(0);

  rides.forEach((r) => {
    const month = new Date(r.date).getMonth();
    months[month]++;
  });

  const ctx = document.getElementById("chartByMonth");
  if (!ctx) return;
  if (ctx.chart) ctx.chart.destroy();

  ctx.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Máj",
        "Jún",
        "Júl",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: months,
          backgroundColor: "#4caf50",
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      responsive: true,
    },
  });
}
