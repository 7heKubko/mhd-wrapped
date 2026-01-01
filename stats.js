


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
    // --- Dynamické poradie sekcií podľa localStorage ---
    const defaultStatsOrder = [
      'chartLines',
      'chartVehicles',
      'chartHours',
      'chartByWeekday',
      'chartByMonth',
      'chartByDriveType',
      'chartByHoliday',
      'chartByVehicleType',
      'monthStats',
      'yearStats',
      'longestStreak',
      'longestPause',
      'wrappedGrid'
    ];
    let statsOrder = JSON.parse(localStorage.getItem('statsOrder') || 'null') || defaultStatsOrder;
    const sectionMap = {
      chartLines: document.querySelector('section:has(#chartLines)'),
      chartVehicles: document.querySelector('section:has(#chartVehicles)'),
      chartHours: document.querySelector('section:has(#chartHours)'),
      chartByWeekday: document.querySelector('section:has(#chartByWeekday)'),
      chartByMonth: document.querySelector('section:has(#chartByMonth)'),
      chartByDriveType: document.querySelector('section:has(#chartByDriveType)'),
      chartByHoliday: document.querySelector('section:has(#chartByHoliday)'),
      chartByVehicleType: document.querySelector('section:has(#chartByVehicleType)'),
      monthStats: document.querySelector('section:has(#monthStats)'),
      yearStats: document.querySelector('section:has(#yearStats)'),
      longestStreak: document.querySelector('section:has(#longestStreak)'),
      longestPause: document.querySelector('section:has(#longestPause)'),
      wrappedGrid: document.querySelector('section:has(.wrapped-grid)')
    };
    function reorderSections() {
      const main = document.querySelector('main.page');
      statsOrder.forEach(id => {
        const sec = sectionMap[id];
        if (sec) main.appendChild(sec);
      });
    }
  // Hook na výber roku
  const yearSelect = document.getElementById('statsYearSelect');
  let selectedYear = 'all';
  let allRides = loadRides();
  // Zisti všetky roky v dátach
  // --- Ročné prepínanie ---
  let allYears = Array.from(new Set(allRides.map(r => r.date.split('-')[0]))).sort((a,b)=>b-a);
  let currentYearIdx = 0;
  if (yearSelect) {
    yearSelect.innerHTML = '<option value="all">Všetky roky</option>' + allYears.map(y => `<option value="${y}">${y}</option>`).join('');
    yearSelect.addEventListener('change', () => {
      if (yearSelect.value === 'all') {
        selectedYear = 'all';
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
  const prevYearBtn = document.getElementById('prevYear');
  const nextYearBtn = document.getElementById('nextYear');
  function getCurrentYear() {
    return allYears[currentYearIdx] || null;
  }
  function updateYearLabel() {
    const yearLabel = document.getElementById('yearLabel');
    if (yearLabel) yearLabel.textContent = getCurrentYear() || '';
  }
  if (prevYearBtn) prevYearBtn.onclick = () => {
    if (currentYearIdx < allYears.length - 1) {
      currentYearIdx++;
      updateYearLabel();
      renderYearStats();
    }
  };
  if (nextYearBtn) nextYearBtn.onclick = () => {
    if (currentYearIdx > 0) {
      currentYearIdx--;
      updateYearLabel();
      renderYearStats();
    }
  };
  function getRides() {
    if (selectedYear === 'all') return allRides;
    return allRides.filter(r => r.date.startsWith(selectedYear+'-'));
  }
  function renderYearStats() {
    // Presne rovnaké UI ako mesačné štatistiky, ale pre celý rok
    const rides = allRides.filter(r => r.date.startsWith(getCurrentYear() + '-'));
    const map = {};
    rides.forEach(r => {
      const main = r.line.split("/")[0];
      if (!map[main]) map[main] = 0;
      map[main]++;
    });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
      // Render bar chart
      const ctx = document.getElementById('chartByYear');
      if (ctx) {
        if (chartByYearInstance) chartByYearInstance.destroy();
        if (sorted.length) {
          const lineColors = getLineColors();
          chartByYearInstance = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: sorted.map(([line]) => line),
              datasets: [{
                data: sorted.map(([, count]) => count),
                backgroundColor: sorted.map(([line]) => lineColors[line] || '#888')
              }]
            },
            options: { plugins: { legend: { display: false } }, responsive: true }
          });
        } else {
          ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
        }
      }
    const yearStats = document.getElementById('yearStats');
    if (!yearStats) return;
    yearStats.innerHTML = '';
    if (!sorted.length) {
      yearStats.innerHTML = '<li>Žiadne jazdy v tomto roku</li>';
      return;
    }
    const lineColors = getLineColors();
    sorted.forEach(([line, count]) => {
      const li = document.createElement('li');
      // Dynamicky nastav farbu textu podľa mesta a čísla linky
      let badgeClass = 'line-badge';
      const city = localStorage.getItem('city') || 'bratislava';
      const n = parseInt(line, 10);
      if (city === 'bratislava') {
        if (!isNaN(n) && n >= 205 && n <= 999) badgeClass += ' line-badge--black';
        else badgeClass += ' line-badge--white';
      } else if (city === 'ostrava') {
        badgeClass += ' line-badge--black';
      }
      li.innerHTML = `
        <span class="${badgeClass}" style="--badge-color:${lineColors[line] || '#888'}">${line}</span>
        ${count}×
      `;
      yearStats.appendChild(li);
    });
  }
    // --- NOVÉ GRAFY A ŠTATISTIKY ---
    function renderByWeekdayChart() {
      const rides = getRides();
      const days = ['Pondelok','Utorok','Streda','Štvrtok','Piatok','Sobota','Nedeľa'];
      const counts = Array(7).fill(0);
      rides.forEach(r => {
        const d = new Date(r.date);
        const idx = (d.getDay() + 6) % 7; // 0=pondelok
        counts[idx]++;
      });
      const ctx = document.getElementById('chartByWeekday');
      if (!ctx) return;
      if (ctx.chart) ctx.chart.destroy();
      ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: { labels: days, datasets: [{ data: counts, backgroundColor: '#007aff' }] },
        options: { plugins: { legend: { display: false } }, responsive: true }
      });
    }

    function renderByMonthChart() {
      const rides = getRides();
      const months = Array(12).fill(0);
      rides.forEach(r => {
        const m = parseInt(r.date.split('-')[1], 10) - 1;
        if (m >= 0 && m < 12) months[m]++;
      });
      const ctx = document.getElementById('chartByMonth');
      if (!ctx) return;
      if (ctx.chart) ctx.chart.destroy();
      ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: { labels: ['Jan','Feb','Mar','Apr','Máj','Jún','Júl','Aug','Sep','Okt','Nov','Dec'], datasets: [{ data: months, backgroundColor: '#34c759' }] },
        options: { plugins: { legend: { display: false } }, responsive: true }
      });
    }

    function renderLongestStreak() {
      const rides = getRides();
      if (!rides.length) { document.getElementById('longestStreak').textContent = '-'; return; }
      const days = Array.from(new Set(rides.map(r => r.date))).sort();
      let maxStreak = 1, curStreak = 1;
      for (let i = 1; i < days.length; i++) {
        const prev = new Date(days[i-1]);
        const curr = new Date(days[i]);
        if ((curr - prev) === 86400000) curStreak++;
        else curStreak = 1;
        if (curStreak > maxStreak) maxStreak = curStreak;
      }
      document.getElementById('longestStreak').textContent = maxStreak + ' dní';
    }

    function renderLongestPause() {
      const rides = getRides();
      if (!rides.length) { document.getElementById('longestPause').textContent = '-'; return; }
      const days = Array.from(new Set(rides.map(r => r.date))).sort();
      let maxPause = 0;
      for (let i = 1; i < days.length; i++) {
        const prev = new Date(days[i-1]);
        const curr = new Date(days[i]);
        const diff = (curr - prev) / 86400000;
        if (diff > maxPause) maxPause = diff;
      }
      document.getElementById('longestPause').textContent = maxPause + ' dní';
    }

    function renderByDriveTypeChart() {
      const rides = getRides();
      const map = {};
      rides.forEach(r => {
        const drive = r.driveType || r.vehicleMode || 'neznámy';
        if (!map[drive]) map[drive] = 0;
        map[drive]++;
      });
      const ctx = document.getElementById('chartByDriveType');
      if (!ctx) return;
      if (ctx.chart) ctx.chart.destroy();
      ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: { labels: Object.keys(map), datasets: [{ data: Object.values(map), backgroundColor: '#ffcc00' }] },
        options: { plugins: { legend: { display: false } }, responsive: true }
      });
    }

    function renderByHolidayChart() {
      const rides = getRides();
      const holidaysSK = [
        '-01-01','-01-06','-05-01','-05-08','-07-05','-08-29','-09-01','-09-15','-11-01','-11-17','-12-24','-12-25','-12-26'
      ];
      let holidays = 0, workdays = 0;
      rides.forEach(r => {
        const d = new Date(r.date);
        const day = d.getDay();
        const isHoliday = day === 0 || day === 6 || holidaysSK.some(h => r.date.endsWith(h));
        if (isHoliday) holidays++;
        else workdays++;
      });
      const ctx = document.getElementById('chartByHoliday');
      if (!ctx) return;
      if (ctx.chart) ctx.chart.destroy();
      ctx.chart = new Chart(ctx, {
        type: 'pie',
        data: { labels: ['Sviatky/prázdniny','Pracovné dni'], datasets: [{ data: [holidays, workdays], backgroundColor: ['#ff6384','#36a2eb'] }] },
        options: { responsive: true }
      });
    }

    function renderByVehicleTypeChart() {
      const rides = getRides();
      const map = {};
      rides.forEach(r => {
        const type = r.vehicleMode || 'neznámy';
        if (!map[type]) map[type] = 0;
        map[type]++;
      });
      const ctx = document.getElementById('chartByVehicleType');
      if (!ctx) return;
      if (ctx.chart) ctx.chart.destroy();
      const typeColors = JSON.parse(localStorage.getItem('typeColors') || '{}');
      const colorMap = {
        'Električka': typeColors.tram || '#ff9500',
        'Trolejbus': typeColors.trolley || '#34c759',
        'Autobus': typeColors.bus || '#007aff',
        'Vlak': typeColors.train || '#8e44ad',
      };
      const bgColors = Object.keys(map).map(type => colorMap[type] || '#888');
      ctx.chart = new Chart(ctx, {
        type: 'pie',
        data: { labels: Object.keys(map), datasets: [{ data: Object.values(map), backgroundColor: bgColors }] },
        options: { responsive: true }
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
      const li = document.createElement('li');
      let badgeClass = 'line-badge';
      const city = localStorage.getItem('city') || 'bratislava';
      if (city === 'bratislava') {
        const n = parseInt(line, 10);
        if (!isNaN(n) && n >= 205 && n <= 999) badgeClass += ' line-badge--black';
        else badgeClass += ' line-badge--white';
      } else if (city === 'ostrava') {
        badgeClass += ' line-badge--black';
      }
      li.innerHTML = `
        <span class="${badgeClass}" style="--badge-color:${lineColors[line] || '#888'}">${line}</span>
        ${count}×
      `;
      monthStats.appendChild(li);
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

  function rerenderAll() {
    renderLinesChart();
    renderVehiclesChart();
    renderHoursChart();
    renderByWeekdayChart();
    renderByMonthChart();
    renderByDriveTypeChart();
    renderByHolidayChart();
    renderByVehicleTypeChart();
    renderMonthStats();
    renderYearStats();
    renderLongestStreak();
    renderLongestPause();
    renderWrappedStats();
  }
  reorderSections();
  rerenderAll();
}

