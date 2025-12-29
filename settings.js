import { applyTheme, showToast } from "./ui.js";
import { loadRides, saveRides, clearAll } from "./storage.js";

applyTheme();

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
