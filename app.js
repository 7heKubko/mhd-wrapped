
import {
  applyTheme,
  renderLastRides,
  renderQuickStats,
  showToast,
  renderFilterSuggestions,
  setDayOffset,
  getLineColors
} from "./ui.js";
import { addRide } from "./rides.js";
import { getCurrentUser } from "./supabase.js";

applyTheme();

const lineInput = document.getElementById("line");
const numberInput = document.getElementById("number");
const addBtn = document.getElementById("add");

const prevDayBtn = document.getElementById("prevDay");
const nextDayBtn = document.getElementById("nextDay");

const linesList = document.getElementById("lines");
const lineColors = getLineColors();

if (linesList) {
  Object.keys(lineColors).forEach((l) => {
    const opt = document.createElement("option");
    opt.value = l;
    linesList.appendChild(opt);
  });
}

const numbersList = document.getElementById("numbers");

if (lineInput) lineInput.value = Object.keys(lineColors)[0] || "";
if (numberInput && numbersList && numbersList.options[0]) {
  numberInput.value = numbersList.options[0].value;
}

if (addBtn) {
  addBtn.onclick = () => {
    const lineVal = lineInput.value.trim();
    const numberVal = numberInput.value.trim();

    if (!lineVal || !numberVal) {
      showToast("Zadaj linku aj EVČ");
      return;
    }

    addRide({ line: lineVal, number: numberVal });

    if (numbersList && ![...numbersList.options].some((o) => o.value === numberVal)) {
      const opt = document.createElement("option");
      opt.value = numberVal;
      numbersList.appendChild(opt);
    }

    showToast(`ZADALI STE SPOJ ${lineVal} (${numberVal})`);

    renderLastRides();
    renderQuickStats();
    renderFilterSuggestions();
  };
}

if (prevDayBtn) {
  prevDayBtn.onclick = () => {
    setDayOffset(-1);
    renderLastRides();
  };
}
if (nextDayBtn) {
  nextDayBtn.onclick = () => {
    setDayOffset(1);
    renderLastRides();
  };
}

window.addEventListener("DOMContentLoaded", async () => {
  const popup = document.getElementById("loginPopup");
  if (!popup) return;
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
    // fallback
    popup.textContent = "Nie ste prihlásený!";
    popup.style.background = "#ffe6e6";
    popup.style.color = "#a11a1a";
    popup.style.display = "block";
    setTimeout(() => { popup.style.display = "none"; }, 3500);
  }
});

renderLastRides();
renderQuickStats();
renderFilterSuggestions();
