import { applyTheme, renderLastRides, renderQuickStats, showToast, renderFilterSuggestions, setDayOffset, lineColors } from "./ui.js";
import { addRide } from "./rides.js";

applyTheme();

// DOM ELEMENTY
const lineInput = document.getElementById("line");
const numberInput = document.getElementById("number");
const addBtn = document.getElementById("add");

const prevDayBtn = document.getElementById("prevDay");
const nextDayBtn = document.getElementById("nextDay");

// GENEROVANIE LINKOV (z lineColors)
const linesList = document.getElementById("lines");
if (linesList) {
  Object.keys(lineColors).forEach((l) => {
    const opt = document.createElement("option");
    opt.value = l;
    linesList.appendChild(opt);
  });
}

// GENEROVANIE EVČ (už nemáme pevne, len ručný vstup – ak chceš, môžeme doplniť)

const numbersList = document.getElementById("numbers");

// Predvyplnené hodnoty
if (lineInput) lineInput.value = Object.keys(lineColors)[0] || "";
if (numberInput && numbersList && numbersList.options[0]) {
  numberInput.value = numbersList.options[0].value;
}

// PRIDANIE JAZDY
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

// PREPÍNANIE DNÍ
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

// PRVOTNÉ VYKRESLENIE
renderLastRides();
renderQuickStats();
renderFilterSuggestions();
