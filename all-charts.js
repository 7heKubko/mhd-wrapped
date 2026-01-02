import { loadRides } from "./storage.js";
import { getLineColors } from "./ui.js";

// Functions for rendering charts
function renderAllCharts() {
  renderLinesChart();
  renderVehiclesChart();
  renderYearStats();
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
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map(([line]) => line),
      datasets: [
        {
          label: "Počet jázd",
          data: sorted.map(([, count]) => count),
          backgroundColor: sorted.map(([line]) => lineColors[line] || "#ccc"),
        },
      ],
    },
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderAllCharts();
});