import { loadRides, saveRides } from "./storage.js";
import { uploadRidesIfLoggedIn } from "./supabase.js";
import { getVehicleType, getVehicleMode, getVehicleEngineType } from "./rides.js";

export function migrateRidesIfNeeded() {
  const rides = loadRides();
  if (!Array.isArray(rides) || !rides.length) return;
  let changed = false;
  for (const ride of rides) {
    if (!ride.vehicle) {
      ride.vehicle = getVehicleType(ride.number);
      changed = true;
    }
    if (!ride.vehicleMode) {
      ride.vehicleMode = getVehicleMode(ride.number);
      changed = true;
    }
    if (!ride.engineType) {
      ride.engineType = getVehicleEngineType(ride.number);
      changed = true;
    }
  }
  if (changed) {
    try {
      saveRides(rides);
    } catch (e) {
      // ignore persistence errors in rare mobile private modes
    }
    // Notify user on mobile without blocking
    try {
      showToast("Dáta boli aktualizované");
    } catch {}
  }
}
export const lineColorsBA = {
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

  S182: "#fecc00",
  S183: "#dd2e0e",
  S184: "#1c7742",
  S185: "#264796",

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
  X47: "#ff7f1a"
};

export const lineColorsOVA = {
  1: "#d9534f",
  2: "#d9534f",
  3: "#d9534f",
  4: "#d9534f",
  5: "#d9534f",
  7: "#d9534f",
  8: "#d9534f",
  10: "#d9534f",
  11: "#d9534f",
  12: "#d9534f",
  13: "#d9534f",
  14: "#d9534f",
  15: "#d9534f",
  17: "#d9534f",
  18: "#d9534f",
  19: "#d9534f",

  21: "#5bc0de",
  22: "#5bc0de",
  23: "#5bc0de",
  24: "#5bc0de",
  25: "#5bc0de",
  26: "#5bc0de",
  27: "#5bc0de",
  28: "#5bc0de",
  29: "#5bc0de",
  30: "#5bc0de",
  31: "#5bc0de",

  33: "#5bc0de",
  34: "#5bc0de",
  35: "#5bc0de",

  37: "#5bc0de",
  38: "#5bc0de",
  39: "#5bc0de",
  40: "#5bc0de",
  41: "#5bc0de",

  43: "#5bc0de",
  44: "#5bc0de",
  45: "#5bc0de",
  46: "#5bc0de",
  47: "#5bc0de",
  48: "#5bc0de",
  49: "#5bc0de",

  52: "#5bc0de",
  54: "#5bc0de",
  55: "#5bc0de",
  56: "#5bc0de",
  57: "#5bc0de",
  58: "#5bc0de",
  59: "#5bc0de",

  61: "#5bc0de",
  62: "#5bc0de",
  64: "#5bc0de",
  67: "#5bc0de",
  68: "#5bc0de",

  71: "#5bc0de",
  72: "#5bc0de",
  74: "#5bc0de",
  76: "#5bc0de",
  77: "#5bc0de",
  78: "#5bc0de",
  79: "#5bc0de",

  81: "#5bc0de",

  92: "#5bc0de",
  96: "#5bc0de",
  97: "#5bc0de",
  98: "#5bc0de",
  99: "#5bc0de",
  AE: "#5bc0de",

  374: "#371c00",
  555: "#371c00",
  445: "#371c00",
  270: "#371c00",
  286: "#371c00",
  641: "#371c00",

  980: "#371c00",
  985: "#371c00",
  371: "#371c00",
  376: "#371c00",
  670: "#371c00",
  448: "#371c00",
  441: "#371c00",
  442: "#371c00",
  288: "#371c00",

  101: "#00cc8b",
  102: "#00cc8b",
  103: "#00cc8b",
  104: "#00cc8b",
  105: "#00cc8b",
  106: "#00cc8b",
  107: "#00cc8b",
  108: "#00cc8b",
  109: "#00cc8b",

  111: "#00cc8b",
  112: "#00cc8b",
  113: "#00cc8b",

  S1: "#920682",
  S2: "#920682",
  S3: "#920682",
  S4: "#920682",
  S5: "#920682",
  S6: "#920682",
  S7: "#920682",
  S8: "#920682",
  S9: "#920682",
  S10: "#920682",
  S11: "#920682",
  S12: "#920682",
  S13: "#920682",
  S15: "#920682",
  S16: "#920682",
  S17: "#920682",
  S18: "#920682",

  S31: "#920682",
  S32: "#920682",
  S33: "#920682",
  S34: "#920682",

  R8: "#fabb00",
  R27: "#d40e0eb0",
  R60: "#d40e0eb0",
  R61: "#d40e0eb0",
};

export function getLineColors() {
  const city = localStorage.getItem("city") || "bratislava";
  return city === "ostrava" ? lineColorsOVA : lineColorsBA;
}

export function applyTheme() {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
  }
  const mode = localStorage.getItem("theme");
  document.body.classList.toggle("dark", mode === "dark");
  migrateRidesIfNeeded();
}

export function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  try {
    const key = `toastSeen:${text}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {}
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
  vehicleMode: "",
  dateFrom: "",
  dateTo: "",
  weekendOnly: false,
  nightOnly: false,
};

export function formatDate(dateStr, timeStr) {
  const d = new Date(dateStr + "T" + timeStr);
  return d.toLocaleString("sk-SK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
  const lineColors = getLineColors();

  list.innerHTML = "";

  if (!filtered.length) {
    list.innerHTML = "<li>Žiadne jazdy</li>";
    return;
  }

  filtered.forEach((r) => {
    const li = document.createElement("li");
    li.classList.add("fade-in");
    let badgeClass = "line-badge";
    const city = localStorage.getItem("city") || "bratislava";
    const n = parseInt(r.line, 10);
    if (city === "bratislava") {
      if (!isNaN(n) && n >= 205 && n <= 999) badgeClass += " line-badge--black";
      else badgeClass += " line-badge--white";
    } else if (city === "ostrava") {
      badgeClass += " line-badge--black";
    }
    li.innerHTML = `
      <span class="${badgeClass}" style="--badge-color:${
        lineColors[r.line] || "#888"
      }">${r.line}</span>
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
    if (filters.vehicleMode && r.vehicleMode !== filters.vehicleMode)
      return false;

    if (filters.dateFrom && r.date < filters.dateFrom) return false;
    if (filters.dateTo && r.date > filters.dateTo) return false;

    if (filters.weekendOnly) {
      const d = new Date(r.date);
      const day = d.getDay();
      const isWeekend = day === 0 || day === 6;
      if (!isWeekend) return false;
    }
    if (filters.nightOnly) {
      const hh = r.time ? parseInt(r.time.split(":")[0], 10) : 0;
      if (!(hh >= 22 || hh < 5)) return false;
    }

    return true;
  });

  filtered.sort((a, b) => {
    const ad = new Date(`${a.date}T${a.time || "00:00"}`);
    const bd = new Date(`${b.date}T${b.time || "00:00"}`);
    return bd - ad;
  });

  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  const lineColors = getLineColors();

  list.innerHTML = "";

  if (!pageItems.length) {
    list.innerHTML = "<li>Žiadne jazdy</li>";
  }

  pageItems.forEach((r) => {
    const li = document.createElement("li");
    li.classList.add("slide-up");
    let badgeClass = "line-badge";
    const city = localStorage.getItem("city") || "bratislava";
    const n = parseInt(r.line, 10);
    if (city === "bratislava") {
      if (!isNaN(n) && n >= 205 && n <= 999) badgeClass += " line-badge--black";
      else badgeClass += " line-badge--white";
    } else if (city === "ostrava") {
      badgeClass += " line-badge--black";
    }
    li.innerHTML = `
      <span style="display: flex; align-items: center; gap: 8px;">
        <span>${formatDate(r.date, r.time)}</span>
        <span class="${badgeClass}" style="--badge-color:${
          lineColors[r.line] || "#888"
        }">${r.line}</span>
        <span>${r.number}</span>
      </span>
      <div class="ride-actions">
        <button class="edit-btn" data-id="${
          r.id
        }" title="Upraviť jazdu"><img src="icons/edit_icon.png" alt="Upraviť" style="width:20px;height:20px;vertical-align:middle;opacity:0.7;filter: grayscale(1);"></button>
        <button class="delete-btn" data-id="${
          r.id
        }" title="Vymazať jazdu"><img src="icons/remove_icon.png" alt="Vymazať" style="width:20px;height:20px;vertical-align:middle;opacity:0.7;filter: grayscale(1);"></button>
      </div>
    `;
    list.appendChild(li);
  });

  pageInfo.textContent = `${currentPage} / ${totalPages}`;

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const ok = confirm("Naozaj chcete vymazať túto jazdu?");
      if (!ok) return;
      const newRides = loadRides().filter((r) => r.id !== id);
      saveRides(newRides);
      showToast("Jazda vymazaná");
      renderRidesList();
      (async () => {
        try {
          const res = await uploadRidesIfLoggedIn();
          if (res?.ok) {
            showToast("Synchronizované s cloudom");
          }
        } catch {}
      })();
    };
  });
}

export function startEditRide(id) {
  const rides = loadRides();
  const ride = rides.find((r) => r.id === id);

  if (!ride) return;

  const modal = document.getElementById("editRideModal");
  const fId = document.getElementById("editRideId");
  const fLine = document.getElementById("editLine");
  const fNumber = document.getElementById("editNumber");
  const fDate = document.getElementById("editDate");
  const fTime = document.getElementById("editTime");
  const btnSave = document.getElementById("editSaveBtn");
  const btnCancel = document.getElementById("editCancelBtn");

  if (
    !modal ||
    !fId ||
    !fLine ||
    !fNumber ||
    !fDate ||
    !fTime ||
    !btnSave ||
    !btnCancel
  ) {

    const newLine = prompt("Nová linka:", ride.line);
    if (!newLine) return;
    const newNumber = prompt("Nové EVČ:", ride.number);
    if (!newNumber) return;
    const newDate = prompt("Nový dátum (RRRR-MM-DD):", ride.date);
    if (!newDate || !/^\d{4}-\d{2}-\d{2}$/.test(newDate)) return;
    const newTime = prompt("Nový čas (HH:MM):", ride.time);
    if (!newTime || !/^\d{2}:\d{2}$/.test(newTime)) return;
    const summary =
      `Uložiť zmeny?\n` +
      `Linka: ${ride.line} → ${newLine}\n` +
      `EVČ: ${ride.number} → ${newNumber}\n` +
      `Dátum: ${ride.date} → ${newDate}\n` +
      `Čas: ${ride.time} → ${newTime}`;
    if (!confirm(summary)) return;
    ride.line = newLine;
    ride.number = newNumber;
    ride.date = newDate;
    ride.time = newTime;
    saveRides(rides);
    showToast("Jazda upravená");
    renderRidesList();
    return;
  }

  fId.textContent = ride.id;
  fLine.value = ride.line;
  fNumber.value = ride.number;
  fDate.value = ride.date;
  fTime.value = ride.time;

  modal.style.display = "flex";

  const close = () => {
    modal.style.display = "none";
    btnSave.onclick = null;
    btnCancel.onclick = null;
  };

  btnCancel.onclick = () => close();

  btnSave.onclick = () => {
    const newLine = fLine.value.trim();
    const newNumber = fNumber.value.trim();
    const newDate = fDate.value;
    const newTime = fTime.value;

    if (
      !newLine ||
      !newNumber ||
      !/^\d{4}-\d{2}-\d{2}$/.test(newDate) ||
      !/^\d{2}:\d{2}$/.test(newTime)
    ) {
      showToast("Vyplňte všetky polia správne");
      return;
    }

    ride.line = newLine;
    ride.number = newNumber;
    ride.date = newDate;
    ride.time = newTime;

    saveRides(rides);
    showToast("Jazda upravená");
    renderRidesList();
    (async () => {
      try {
        const res = await uploadRidesIfLoggedIn();
        if (res?.ok) {
          showToast("Synchronizované s cloudom");
        }
      } catch {}
    })();
    close();
  };
}
