import {
  getTotal,
  getTopLine,
  getFavBus,
  getPersona,
  getFavVehicleMode,
  getFavModelOnLine,
} from "./wrapped.js";
import { applyTheme } from "./ui.js";

applyTheme();

// Functions related to Wrapped statistics
function updateWrappedStats() {
  document.getElementById("wTotal").textContent = getTotal();
  document.getElementById("wTopLine").textContent = getTopLine();
  document.getElementById("wTopBus").textContent = getFavBus();
  document.getElementById("wPersona").textContent = getPersona();
}

window.addEventListener("DOMContentLoaded", () => {
  updateWrappedStats();
});
