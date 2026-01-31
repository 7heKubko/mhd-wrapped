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
  uploadRidesIfLoggedIn,
  loadFavoritesFromCloudIfLoggedIn,
  saveFavoritesToCloudIfLoggedIn,
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

  if (
    !confirm(
      "Naozaj chcete importovať dáta? Aktuálne lokálne dáta budú prepísané."
    )
  ) {
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
const cloudSyncStatusEl = document.getElementById("cloudSyncStatus");

function updateCloudSyncStatus(statusObj) {
  try {
    if (statusObj) {
      localStorage.setItem("cloudSyncStatus", JSON.stringify(statusObj));
    }
    const saved = JSON.parse(localStorage.getItem("cloudSyncStatus") || "null");
    if (cloudSyncStatusEl) {
      if (!saved) {
        cloudSyncStatusEl.textContent = "";
      } else {
        const when = new Date(saved.time).toLocaleString("sk-SK");
        const ok = saved.status === "ok";
        cloudSyncStatusEl.textContent = ok
          ? `Naposledy synchronizované: ${when}`
          : `Posledná chyba: ${when}`;
        cloudSyncStatusEl.style.color = ok ? "#1a661a" : "#a11a1a";
      }
    }
  } catch {}
}

updateCloudSyncStatus();

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
      const res = await uploadRidesIfLoggedIn();
      if (res.ok) {
        showToast("Dáta boli nahrané do cloudu!");
        updateCloudSyncStatus({
          status: "ok",
          time: new Date().toISOString(),
          action: "upload",
        });
      } else if (res.reason === "not-logged-in") {
        // already handled above
      } else {
        showToast(
          "Chyba pri uploadovaní: " +
            (res.error?.message || res.error || "Neznáma chyba")
        );
        updateCloudSyncStatus({
          status: "error",
          time: new Date().toISOString(),
          action: "upload",
        });
      }
    } catch (e) {
      showToast("Chyba pri uploadovaní: " + (e.message || e));
      updateCloudSyncStatus({
        status: "error",
        time: new Date().toISOString(),
        action: "upload",
      });
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
    const proceed = confirm(
      "Naozaj chcete stiahnuť všetky dáta? Aktuálne lokálne dáta budú prepísané."
    );
    if (!proceed) return;
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
        updateCloudSyncStatus({
          status: "ok",
          time: new Date().toISOString(),
          action: "download",
        });
      }
    } catch (e) {
      if (loginPopup) {
        loginPopup.textContent = "Chyba pri komunikácii so serverom!";
        loginPopup.style.background = "#ffe6e6";
        loginPopup.style.color = "#a11a1a";
        loginPopup.style.display = "block";
      }
      updateCloudSyncStatus({
        status: "error",
        time: new Date().toISOString(),
        action: "download",
      });
    }
  };
}

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
      try {
        localStorage.setItem("lastDataUpdate", String(Date.now()));
      } catch {}
    } else {
      showToast("Všetky dáta sú už aktuálne.");
    }
  };
}

const favLineInput = document.getElementById("favLineInput");
const addFavLineBtn = document.getElementById("addFavLineBtn");
const favLinesList = document.getElementById("favLinesList");
const favNumberInput = document.getElementById("favNumberInput");
const addFavNumberBtn = document.getElementById("addFavNumberBtn");
const favNumbersList = document.getElementById("favNumbersList");

function getFavorites() {
  const f = JSON.parse(localStorage.getItem("favorites") || "{}");
  return { lines: f.lines || [], numbers: f.numbers || [] };
}
function setFavorites(f) {
  localStorage.setItem("favorites", JSON.stringify(f));
  try {
    void saveFavoritesToCloudIfLoggedIn(f)
      .then((res) => {
        if (res?.ok) {
          showToast("Obľúbené synchronizované do cloudu.");
        } else if (res?.reason !== "not-logged-in") {
          showToast("Synchronizácia obľúbených zlyhala.");
        }
      })
      .catch(() => {
        showToast("Synchronizácia obľúbených zlyhala.");
      });
  } catch {}
}
function renderFavorites() {
  const { lines, numbers } = getFavorites();
  if (favLinesList) {
    favLinesList.innerHTML = "";
    lines.forEach((line, idx) => {
      const li = document.createElement("li");
      li.style.margin = "4px 0";
      li.innerHTML = `${line} <button data-idx="${idx}" class="removeFavLine" style="width:auto;padding:4px 8px;margin-left:8px">Odstrániť</button>`;
      favLinesList.appendChild(li);
    });
    favLinesList.querySelectorAll(".removeFavLine").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.getAttribute("data-idx"), 10);
        const f = getFavorites();
        f.lines.splice(i, 1);
        setFavorites(f);
        renderFavorites();
      });
    });
  }
  if (favNumbersList) {
    favNumbersList.innerHTML = "";
    numbers.forEach((num, idx) => {
      const li = document.createElement("li");
      li.style.margin = "4px 0";
      li.innerHTML = `${num} <button data-idx="${idx}" class="removeFavNumber" style="width:auto;padding:4px 8px;margin-left:8px">Odstrániť</button>`;
      favNumbersList.appendChild(li);
    });
    favNumbersList.querySelectorAll(".removeFavNumber").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.getAttribute("data-idx"), 10);
        const f = getFavorites();
        f.numbers.splice(i, 1);
        setFavorites(f);
        renderFavorites();
      });
    });
  }
}

if (addFavLineBtn && favLineInput) {
  addFavLineBtn.addEventListener("click", () => {
    const v = favLineInput.value.trim();
    if (!v) return;
    const f = getFavorites();
    if (!f.lines.includes(v)) f.lines.push(v);
    setFavorites(f);
    favLineInput.value = "";
    renderFavorites();
  });
}
if (addFavNumberBtn && favNumberInput) {
  addFavNumberBtn.addEventListener("click", () => {
    const v = favNumberInput.value.trim();
    if (!v) return;
    const f = getFavorites();
    if (!f.numbers.includes(v)) f.numbers.push(v);
    setFavorites(f);
    favNumberInput.value = "";
    renderFavorites();
  });
}
renderFavorites();

(async function initFavoritesSync() {
  try {
    const user = await getCurrentUser();
    if (!user) return;

    const localFav = getFavorites();
    const cloud = await loadFavoritesFromCloudIfLoggedIn();
    if (!cloud.ok) return;
    const cloudFav = cloud.favorites || { lines: [], numbers: [] };

    const hasCloud =
      (cloudFav.lines?.length || 0) > 0 || (cloudFav.numbers?.length || 0) > 0;
    const hasLocal =
      (localFav.lines?.length || 0) > 0 || (localFav.numbers?.length || 0) > 0;

    if (hasCloud && !hasLocal) {
      // Adopt cloud -> local
      setFavorites(cloudFav);
      renderFavorites();
      showToast("Obľúbené načítané z cloudu.");
    } else if (!hasCloud && hasLocal) {
      // Push local -> cloud
      const res = await saveFavoritesToCloudIfLoggedIn(localFav);
      if (res?.ok) {
        showToast("Obľúbené synchronizované do cloudu.");
      } else if (res?.reason !== "not-logged-in") {
        showToast("Synchronizácia obľúbených zlyhala.");
      }
    } else if (hasCloud && hasLocal) {
      // Merge (union) both sets and persist both sides
      const merged = {
        lines: Array.from(
          new Set([...(localFav.lines || []), ...(cloudFav.lines || [])])
        ),
        numbers: Array.from(
          new Set([...(localFav.numbers || []), ...(cloudFav.numbers || [])])
        ),
      };
      setFavorites(merged);
      renderFavorites();
      const res = await saveFavoritesToCloudIfLoggedIn(merged);
      if (res?.ok) {
        showToast("Obľúbené zlúčené s cloudom.");
      } else if (res?.reason !== "not-logged-in") {
        showToast("Synchronizácia obľúbených zlyhala.");
      }
    }
  } catch {}
})();
