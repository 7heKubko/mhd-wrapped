import { applyTheme, showToast } from "./ui.js";
import { loadRides, saveRides, clearAll } from "./storage.js";
import { getSupabase, signInWithEmail, signUpWithEmail, signOut, getCurrentUser } from "./supabase.js";

applyTheme();

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
    type: "application/json"
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

document.getElementById("resetBtn").onclick = () => {
  if (!confirm("Naozaj chceš vymazať všetky dáta?")) return;

  clearAll();
  showToast("Všetky dáta boli vymazané");
};

// LOGIN UI & CLOUD SYNC
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
    const { error } = await signInWithEmail(loginEmail.value, loginPassword.value);
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
    const { error } = await signUpWithEmail(loginEmail.value, loginPassword.value);
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

// CLOUD SYNC BUTTONS

if (uploadCloudBtn) {
  uploadCloudBtn.onclick = async () => {
    const user = await getCurrentUser();
    if (!user) {
      if (loginPopup) {
        loginPopup.textContent = "Najprv sa prihláste hore v sekcii Prihlásenie (beta)!";
        loginPopup.style.background = "#ffe6e6";
        loginPopup.style.color = "#a11a1a";
        loginPopup.style.display = "block";
      }
      return;
    }
    // Upload local rides to Supabase
    try {
      const rides = loadRides();
      const supabase = getSupabase();
      // Najprv vymažeme všetky existujúce cloud jazdy pre usera
      await supabase.from('rides').delete().eq('user_id', user.id);
      // Potom vložíme všetky lokálne jazdy
      if (rides.length > 0) {
        const ridesWithUser = rides.map(r => ({...r, user_id: user.id }));
        const { error } = await supabase.from('rides').insert(ridesWithUser);
        if (error) throw error;
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
        loginPopup.textContent = "Najprv sa prihláste hore v sekcii Prihlásenie (beta)!";
        loginPopup.style.background = "#ffe6e6";
        loginPopup.style.color = "#a11a1a";
        loginPopup.style.display = "block";
      }
      return;
    }
    // Download cloud rides to localStorage
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.from('rides').select('*').eq('user_id', user.id);
      if (error) throw error;
      if (Array.isArray(data)) {
        // Odstránime user_id z objektov pred uložením do localStorage
        const rides = data.map(({user_id, ...rest}) => rest);
        saveRides(rides);
        showToast("Dáta boli stiahnuté z cloudu!");
      }
    } catch (e) {
      showToast("Chyba pri sťahovaní: " + (e.message || e));
    }
  };
}

// Zobraz login stav v popupe na začiatku
updateLoginUI();
