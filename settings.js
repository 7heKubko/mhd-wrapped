const defaultStatsOrder = [
  "chartLines",
  "chartVehicles",
  "chartByECV",
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

const statsOrderList = document.getElementById("statsOrderList");
const saveStatsOrderBtn = document.getElementById("saveStatsOrderBtn");
if (statsOrderList && saveStatsOrderBtn) {
  let order =
    JSON.parse(localStorage.getItem("statsOrder") || "null") ||
    defaultStatsOrder;
  function renderOrderList() {
    statsOrderList.innerHTML = "";
    order.forEach((id) => {
      const li = document.createElement("li");
      li.textContent = getStatsSectionName(id);
      li.dataset.id = id;
      li.draggable = true;
      li.className = "sortable-item";
      statsOrderList.appendChild(li);
    });
  }
  function getStatsSectionName(id) {
    return (
      {
        chartLines: "Najpoužívanejšie linky",
        chartVehicles: "Typy vozidiel",
        chartByECV: "Vozidiel podľa EČV",
        chartHours: "Jazdy podľa hodín",
        chartByWeekday: "Počet jázd podľa dní v týždni",
        chartByMonth: "Počet jázd podľa mesiacov",
        chartByDriveType: "Počet jázd podľa typu pohonu",
        chartByHoliday: "Počet jázd počas sviatkov/prázdnin",
        chartByVehicleType: "Počet jázd podľa typu vozidla",
        monthStats: "Mesačné štatistiky",
        yearStats: "Ročné štatistiky",
        longestStreak: "Najdlhšia séria dní s jazdou",
        longestPause: "Najdlhšia pauza bez MHD",
        wrappedGrid: "Wrapped štatistiky",
      }[id] || id
    );
  }

  let dragSrc = null;
  statsOrderList.addEventListener("dragstart", (e) => {
    dragSrc = e.target;
    e.dataTransfer.effectAllowed = "move";
  });
  statsOrderList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const over = e.target.closest("li");
    if (over && over !== dragSrc) {
      statsOrderList.insertBefore(dragSrc, over.nextSibling);
    }
  });
  statsOrderList.addEventListener("drop", (e) => {
    e.preventDefault();
    order = Array.from(statsOrderList.children).map((li) => li.dataset.id);
  });
  saveStatsOrderBtn.onclick = () => {
    order = Array.from(statsOrderList.children).map((li) => li.dataset.id);
    localStorage.setItem("statsOrder", JSON.stringify(order));
    showToast("Poradie sekcií uložené!");
  };
  function reorderSections() {
    const main = document.querySelector("main.page");
    order.forEach((id) => {
      const section = document.querySelector(`section:has(#${id})`);
      if (section) main.appendChild(section);
    });
  }

  renderOrderList();
  reorderSections();
}
import { applyTheme, showToast } from "./ui.js";
import { loadRides, saveRides, clearAll } from "./storage.js";
import {
  getVehicleType,
  getVehicleMode,
  getVehicleEngineType,
} from "./rides.js";
import {
  getSupabase,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getCurrentUser,
} from "./supabase.js";

window.addEventListener("DOMContentLoaded", () => {
  const colorInputs = {
    tram: document.getElementById("colorTram"),
    trolley: document.getElementById("colorTrolley"),
    bus: document.getElementById("colorBus"),
    train: document.getElementById("colorTrain"),
  };
  const saveColorsBtn = document.getElementById("saveColorsBtn");
  function loadTypeColors() {
    const saved = JSON.parse(localStorage.getItem("typeColors") || "{}");
    if (colorInputs.tram && saved.tram) colorInputs.tram.value = saved.tram;
    if (colorInputs.trolley && saved.trolley)
      colorInputs.trolley.value = saved.trolley;
    if (colorInputs.bus && saved.bus) colorInputs.bus.value = saved.bus;
    if (colorInputs.train && saved.train) colorInputs.train.value = saved.train;
  }
  if (saveColorsBtn) {
    saveColorsBtn.onclick = () => {
      const colors = {
        tram: colorInputs.tram?.value || "#ff9500",
        trolley: colorInputs.trolley?.value || "#34c759",
        bus: colorInputs.bus?.value || "#007aff",
        train: colorInputs.train?.value || "#8e44ad",
      };
      localStorage.setItem("typeColors", JSON.stringify(colors));
      showToast("Farby boli uložené");
    };
    loadTypeColors();
  }
});

applyTheme();
// Ensure login UI reflects persisted session on initial load
updateLoginUI();

const citySelect = document.getElementById("citySelect");
const saveCityBtn = document.getElementById("saveCity");

if (citySelect && saveCityBtn) {
  const currentCity = localStorage.getItem("city") || "bratislava";
  citySelect.value = currentCity;

  saveCityBtn.onclick = () => {
    const newCity = citySelect.value;
    localStorage.setItem("city", newCity);
    showToast("Mesto bolo zmenené");
    location.reload();
  };
}

const themeToggle = document.getElementById("themeToggle");

function syncToggleWithTheme() {
  const mode = localStorage.getItem("theme") || "dark";
  themeToggle.checked = mode === "dark";
}

if (themeToggle) {
  syncToggleWithTheme();

  themeToggle.onchange = () => {
    const mode = themeToggle.checked ? "dark" : "light";
    localStorage.setItem("theme", mode);
    applyTheme();
    showToast("Vzhľad bol zmenený");
  };
}

document.getElementById("exportBtn").onclick = () => {
  const rides = loadRides();
  const blob = new Blob([JSON.stringify(rides, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mhd-wrapped-data.json";
  a.click();

  showToast("Dáta boli exportované");
};

document.getElementById("importBtn").onclick = () => {
  const fileInput = document.getElementById("importFile");
  const file = fileInput.files[0];

  if (!file) {
    showToast("Vyber súbor na import");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error();

      saveRides(data);
      showToast("Dáta boli importované");
    } catch {
      showToast("Neplatný JSON súbor");
    }
  };

  reader.readAsText(file);
};

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginStatus = document.getElementById("loginStatus");
const loginPopup = document.getElementById("loginPopup");
const uploadCloudBtn = document.getElementById("uploadCloudBtn");
const downloadCloudBtn = document.getElementById("downloadCloudBtn");

async function updateLoginUI() {
  const user = await getCurrentUser();
  if (user) {
    loginStatus.textContent = `Prihlásený ako ${user.email}`;
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    loginEmail.style.display = "none";
    loginPassword.style.display = "none";
    if (loginPopup) {
      loginPopup.textContent = `Prihlásený ako ${user.email}`;
      loginPopup.style.background = "#e6ffe6";
      loginPopup.style.color = "#1a661a";
      loginPopup.style.display = "block";
    }
  } else {
    loginStatus.textContent = "Nie ste prihlásený.";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    loginEmail.style.display = "inline-block";
    loginPassword.style.display = "inline-block";
    if (loginPopup) {
      loginPopup.textContent = "Nie ste prihlásený!";
      loginPopup.style.background = "#ffe6e6";
      loginPopup.style.color = "#a11a1a";
      loginPopup.style.display = "block";
    }
  }
}

if (loginBtn && registerBtn && logoutBtn) {
  loginBtn.onclick = async () => {
    if (!loginEmail.value || !loginPassword.value) {
      loginStatus.textContent = "Zadajte email a heslo.";
      return;
    }
    loginStatus.textContent = "Prihlasovanie...";
    const { error } = await signInWithEmail(
      loginEmail.value,
      loginPassword.value
    );
    if (error) {
      loginStatus.textContent = "Chyba: " + error.message;
    } else {
      loginStatus.textContent = "Prihlásený!";
      await updateLoginUI();
    }
  };
  registerBtn.onclick = async () => {
    if (!loginEmail.value || !loginPassword.value) {
      loginStatus.textContent = "Zadajte email a heslo.";
      return;
    }
    loginStatus.textContent = "Registrujem...";
    const { error } = await signUpWithEmail(
      loginEmail.value,
      loginPassword.value
    );
    if (error) {
      loginStatus.textContent = "Chyba: " + error.message;
    } else {
      loginStatus.textContent = "Registrácia úspešná! Skontrolujte email.";
      await updateLoginUI();
    }
  };
  logoutBtn.onclick = async () => {
    await signOut();
    loginStatus.textContent = "Odhlásený.";
    await updateLoginUI();
  };
}

if (uploadCloudBtn) {
  uploadCloudBtn.onclick = async () => {
    const user = await getCurrentUser();
    if (!user) {
      if (loginPopup) {
        loginPopup.textContent =
          "Najprv sa prihláste hore v sekcii Prihlásenie (beta)!";
        loginPopup.style.background = "#ffe6e6";
        loginPopup.style.color = "#a11a1a";
        loginPopup.style.display = "block";
      }
      return;
    }
    try {
      const rides = loadRides();
      const supabase = getSupabase();
      await supabase.from("rides").delete().eq("user_id", user.id);
      if (rides.length > 0) {
        const ridesWithUser = rides.map((r) => ({ ...r, user_id: user.id }));
        let { error } = await supabase.from("rides").insert(ridesWithUser);
        if (error) {
          const msg = String(error.message || "");
          // Fallback: strip engineType if backend schema doesn't have the column
          if (msg.includes("engineType") || msg.includes("column")) {
            const sanitized = ridesWithUser.map(
              ({ engineType, ...rest }) => rest
            );
            const retry = await supabase.from("rides").insert(sanitized);
            if (retry.error) throw retry.error;
            showToast("Nahrané bez engineType (server bez stĺpca)");
          } else {
            throw error;
          }
        }
      }
      showToast("Dáta boli nahrané do cloudu!");
    } catch (e) {
      showToast("Chyba pri uploadovaní: " + (e.message || e));
    }
  };
}

if (downloadCloudBtn) {
  downloadCloudBtn.onclick = async () => {
    const user = await getCurrentUser();
    if (!user) {
      if (loginPopup) {
        loginPopup.textContent =
          "Najprv sa prihláste hore v sekcii Prihlásenie (beta)!";
        loginPopup.style.background = "#ffe6e6";
        loginPopup.style.color = "#a11a1a";
        loginPopup.style.display = "block";
      }
      return;
    }
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("rides")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        if (loginPopup) {
          loginPopup.textContent = "Nepodarilo sa stiahnuť dáta zo servera!";
          loginPopup.style.background = "#ffe6e6";
          loginPopup.style.color = "#a11a1a";
          loginPopup.style.display = "block";
        }
        return;
      }

      if (data) {
        // Normalize rows to local app schema to ensure edit/delete work
        const normalized = data.map((row) => {
          const num = row.number ?? "";
          const idStr =
            typeof row.id === "string"
              ? row.id
              : row.id != null
              ? `row-${String(row.id)}`
              : Math.random().toString(36).substring(2, 10);
          return {
            id: idStr,
            line: row.line ?? "",
            number: typeof num === "string" ? num : String(num),
            vehicle: row.vehicle ?? getVehicleType(num),
            vehicleMode: row.vehicleMode ?? getVehicleMode(num),
            engineType: row.engineType ?? getVehicleEngineType(num),
            date: row.date ?? "",
            time: row.time ?? "",
          };
        });
        saveRides(normalized);
        if (loginPopup) {
          loginPopup.textContent = "Dáta úspešne stiahnuté zo servera!";
          loginPopup.style.background = "#e6ffe6";
          loginPopup.style.color = "#1a661a";
          loginPopup.style.display = "block";
        }
      }
    } catch (e) {
      if (loginPopup) {
        loginPopup.textContent = "Chyba pri komunikácii so serverom!";
        loginPopup.style.background = "#ffe6e6";
        loginPopup.style.color = "#a11a1a";
        loginPopup.style.display = "block";
      }
    }
  };
}

// --- Oprava dát (fixDataBtn) ---
const fixDataBtn = document.getElementById("fixDataBtn");
if (fixDataBtn) {
  fixDataBtn.onclick = () => {
    const rides = loadRides();
    let changed = false;
    const updated = rides.map((ride) => {
      const newVehicle = getVehicleType(ride.number);
      const newMode = getVehicleMode(ride.number);
      const newEngine = getVehicleEngineType(ride.number);
      if (
        ride.vehicle !== newVehicle ||
        ride.vehicleMode !== newMode ||
        ride.engineType !== newEngine
      ) {
        changed = true;
        return {
          ...ride,
          vehicle: newVehicle,
          vehicleMode: newMode,
          engineType: newEngine,
        };
      }
      return ride;
    });
    if (changed) {
      saveRides(updated);
      showToast("Dáta boli opravené podľa aktuálnych údajov o vozidlách.");
    } else {
      showToast("Všetky dáta sú už aktuálne.");
    }
  };
}
