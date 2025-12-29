export const lineColors = {
  1: "#f56200",
  3: "#e31e24",
  4: "#5071b9",
  9: "#849717",

  33: "#776ab4",
  40: "#e51a4b",
  42: "#a65430",
  44: "#a979b3",
  45: "#808080",
  47: "#ad8b00",
  49: "#d16c1a",
  60: "#2a4493",
  61: "#a21517",
  64: "#0e562c",
  71: "#007db3",
  72: "#899d1b",

  20: "#808080",
  21: "#338632",
  23: "#808080",
  25: "#808080",
  26: "#808080",
  29: "#808080",
  30: "#808080",
  31: "#808080",
  32: "#808080",
  35: "#808080",
  36: "#808080",
  37: "#e31e24",

  39: "#808080",
  43: "#808080",
  50: "#065469",
  51: "#808080",
  52: "#808080",
  53: "#808080",
  56: "#808080",
  57: "#808080",
  63: "#642f6c",
  65: "#808080",
  66: "#808080",
  67: "#808080",

  68: "#887917",
  69: "#808080",
  70: "#808080",
  75: "#808080",
  77: "#808080",
  78: "#808080",
  79: "#808080",
  80: "#d77e09",
  83: "#007ab8",
  84: "#007ab8",
  87: "#808080",
  88: "#642f6c",

  90: "#808080",
  91: "#808080",
  92: "#808080",
  93: "#ab075f",
  94: "#ab075f",
  96: "#338632",
  98: "#b25c2e",
  99: "#ee639f",
  131: "#808080",
  139: "#808080",
  144: "#808080",
  145: "#808080",

  147: "#808080",
  151: "#808080",
  163: "#808080",
  184: "#808080",
  191: "#808080",
  192: "#808080",
  Šk6: "#808080",

  299: "#2b2a29",
  598: "#2b2a29",
  599: "#2b2a29",
  699: "#2b2a29",
  798: "#2b2a29",
  799: "#2b2a29",
  N21: "#2b2a29",
  N29: "#2b2a29",
  N31: "#2b2a29",
  N33: "#2b2a29",
  N34: "#2b2a29",

  N37: "#2b2a29",
  N44: "#2b2a29",
  N47: "#2b2a29",
  N53: "#2b2a29",
  N55: "#2b2a29",
  N56: "#2b2a29",
  N61: "#2b2a29",
  N70: "#2b2a29",
  N72: "#2b2a29",
  N74: "#2b2a29",
  N80: "#2b2a29",

  N91: "#2b2a29",
  N93: "#2b2a29",
  N95: "#2b2a29",
  N99: "#2b2a29",

  R20: "#126dd4",
  R50: "#126dd4",
  R55: "#126dd4",
  R60: "#126dd4",
  REX6: "#126dd4",
  R70: "#126dd4",
  S8: "#126dd4",
  S20: "#126dd4",
  S50: "#126dd4",
  S60: "#126dd4",
  S70: "#126dd4",

  205: "#bfbfb9",
  209: "#bfbfb9",
  215: "#bfbfb9",
  216: "#bfbfb9",
  219: "#bfbfb9",
  239: "#bfbfb9",
  240: "#bfbfb9",
  245: "#bcb5da",
  246: "#bfbfb9",
  249: "#bfbfb9",
  250: "#bfbfb9",
  251: "#bfbfb9",

  259: "#bfbfb9",
  260: "#bfbfb9",
  265: "#bfbfb9",
  269: "#a2d9f7",
  275: "#bfbfb9",
  277: "#bfbfb9",
  289: "#bfbfb9",
  506: "#bfbfb9",
  515: "#bfbfb9",
  520: "#bfbfb9",
  521: "#bfbfb9",
  525: "#af9778",

  527: "#af9778",
  528: "#bfbfb9",
  529: "#bfbfb9",
  531: "#bfbfb9",
  539: "#bfbfb9",
  540: "#78b833",
  545: "#bfbfb9",
  550: "#bfbfb9",
  555: "#bfbfb9",
  565: "#bfbfb9",
  605: "#bfbfb9",
  609: "#bfbfb9",

  610: "#d4a31c",
  620: "#f6bfd9",
  622: "#bfbfb9",
  630: "#bfbfb9",
  632: "#eed500",
  640: "#bfbfb9",
  645: "#bfbfb9",
  648: "#bfbfb9",
  649: "#bfbfb9",
  657: "#bfbfb9",
  658: "#bfbfb9",
  659: "#bfbfb9",

  666: "#bfbfb9",
  710: "#bfbfb9",
  711: "#bfbfb9",
  720: "#bfbfb9",
  725: "#f9d1d5",
  727: "#bfbfb9",
  729: "#bfbfb9",
  730: "#bfbfb9",
  737: "#ea553d",
  740: "#fabc48",

  901: "#bfbfb9",
  808: "#bfbfb9",

  "Malacky: A": "#00963f",
  "Malacky: B": "#eb1c24",
  "Malacky: C": "#007ebc",

  PK1: "#4de600",
  PK2: "#e59800",
  PK3: "#ea00a9",
  PK4: "#0071fe",
  PK24: "#007ab8",

  SC1: "#808080",

  X1: "#ff7f1a",
  X3: "#ff7f1a",
  X4: "#ff7f1a",
  X9: "#ff7f1a",
};

export function applyTheme() {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
  }
  const mode = localStorage.getItem("theme");
  document.body.classList.toggle("dark", mode === "dark");
}

import { loadRides, saveRides } from "./storage.js";

export function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

let dayOffset = 0;
let currentPage = 1;

let filters = {
  line: "",
  number: "",
  vehicle: "",
  dateFrom: "",
  dateTo: ""
};

export function formatDate(dateStr, timeStr) {
  const d = new Date(dateStr + "T" + timeStr);
  return d.toLocaleString("sk-SK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function setDayOffset(change) {
  dayOffset += change;
}

export function renderLastRides() {
  const rides = loadRides();
  const list = document.getElementById("lastRides");
  const dayLabel = document.getElementById("dayLabel");
  if (!list || !dayLabel) return;

  const d = new Date();
  d.setDate(d.getDate() + dayOffset);

  const dayStr = d.toISOString().split("T")[0];
  dayLabel.textContent = d.toLocaleDateString("sk-SK");

  const filtered = rides.filter((r) => r.date === dayStr);

  list.innerHTML = "";

  if (!filtered.length) {
    list.innerHTML = "<li>Žiadne jazdy</li>";
    return;
  }

  filtered.forEach((r) => {
    const li = document.createElement("li");
    li.classList.add("fade-in");
    li.innerHTML = `
      <span class="line-badge" style="--badge-color:${lineColors[r.line] || "#888"}">${r.line}</span>
      ${r.number} - ${r.time}
    `;
    list.appendChild(li);
  });
}

export function renderQuickStats() {
  const rides = loadRides();

  const total = rides.length;
  const topLine = {};
  const topBus = {};

  rides.forEach((r) => {
    const main = r.line.split("/")[0];

    if (!topLine[main]) topLine[main] = 0;
    topLine[main]++;

    if (!topBus[r.number]) topBus[r.number] = 0;
    topBus[r.number]++;
  });

  const topLineSorted = Object.entries(topLine).sort((a, b) => b[1] - a[1]);
  const topBusSorted = Object.entries(topBus).sort((a, b) => b[1] - a[1]);

  const totalEl = document.getElementById("total");
  const topLineEl = document.getElementById("topLine");
  const favBusEl = document.getElementById("favBus");
  const personaEl = document.getElementById("persona");

  if (!totalEl || !topLineEl || !favBusEl || !personaEl) return;

  totalEl.textContent = total;
  topLineEl.textContent = topLineSorted[0]?.[0] || "-";
  favBusEl.textContent = topBusSorted[0]?.[0] || "-";

  if (total === 0) {
    personaEl.textContent = "Nováčik";
  } else if (total < 20) {
    personaEl.textContent = "Príležitostný cestujúci";
  } else if (total < 100) {
    personaEl.textContent = "MHD nadšenec";
  } else {
    personaEl.textContent = "MHD legenda";
  }
}

export function renderFilterSuggestions() {
  const rides = loadRides();

  const lines = new Set();
  const numbers = new Set();
  const vehicles = new Set();

  rides.forEach((r) => {
    lines.add(r.line);
    numbers.add(r.number);
    vehicles.add(r.vehicle);
  });

  const fill = (id, set) => {
    const list = document.getElementById(id);
    if (!list) return;
    list.innerHTML = "";
    [...set].forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v;
      list.appendChild(opt);
    });
  };

  fill("filterLines", lines);
  fill("filterNumbers", numbers);
  fill("filterVehicles", vehicles);
}

export function setFilters(f) {
  filters = f;
  currentPage = 1;
  renderRidesList();
}

export function changePage(delta) {
  currentPage += delta;
  renderRidesList();
}

export function renderRidesList() {
  const rides = loadRides();
  const list = document.getElementById("ridesList");
  const pageInfo = document.getElementById("pageInfo");

  if (!list || !pageInfo) return;

  let filtered = rides.filter((r) => {
    if (filters.line && !r.line.includes(filters.line)) return false;
    if (filters.number && r.number !== filters.number) return false;
    if (filters.vehicle && r.vehicle !== filters.vehicle) return false;

    if (filters.dateFrom && r.date < filters.dateFrom) return false;
    if (filters.dateTo && r.date > filters.dateTo) return false;

    return true;
  });

  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  list.innerHTML = "";

  if (!pageItems.length) {
    list.innerHTML = "<li>Žiadne jazdy</li>";
  }

  pageItems.forEach((r) => {
    const li = document.createElement("li");
    li.classList.add("slide-up");

    li.innerHTML = `
      <span>
        ${formatDate(r.date, r.time)} –
        <span class="line-badge" style="--badge-color:${lineColors[r.line] || "#888"}">${r.line}</span>
        ${r.number}
      </span>
      <div>
        <button class="edit-btn" data-id="${r.id}">✏️</button>
        <button class="delete-btn" data-id="${r.id}">🗑️</button>
      </div>
    `;

    list.appendChild(li);
  });

  pageInfo.textContent = `${currentPage} / ${totalPages}`;

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const newRides = loadRides().filter((r) => r.id !== id);
      saveRides(newRides);
      showToast("Jazda vymazaná");
      renderRidesList();
    };
  });
}

export function startEditRide(id) {
  const rides = loadRides();
  const ride = rides.find((r) => r.id === id);

  if (!ride) return;

  const newLine = prompt("Nová linka:", ride.line);
  if (!newLine) return;

  const newNumber = prompt("Nové EVČ:", ride.number);
  if (!newNumber) return;

  ride.line = newLine;
  ride.number = newNumber;

  saveRides(rides);
  showToast("Jazda upravená");
  renderRidesList();
}
