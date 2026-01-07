
import { getCurrentUser } from "./supabase.js";

import { applyTheme, renderRidesList, renderFilterSuggestions, setFilters, changePage, startEditRide } from "./ui.js";

// Zobraz login popup po načítaní stránky
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
    popup.textContent = "Nie ste prihlásený!";
    popup.style.background = "#ffe6e6";
    popup.style.color = "#a11a1a";
    popup.style.display = "block";
    setTimeout(() => { popup.style.display = "none"; }, 3500);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  main();
});

function main() {
  const filterLine = document.getElementById("filterLine");
  const filterNumber = document.getElementById("filterNumber");
  const filterVehicle = document.getElementById("filterVehicle");
  const filterDateFrom = document.getElementById("filterDateFrom");
  const filterDateTo = document.getElementById("filterDateTo");
  const clearFiltersBtn = document.getElementById("clearFilters");
  const chipTrams = document.getElementById("chipTrams");
  const chipWeekends = document.getElementById("chipWeekends");
  const chipNights = document.getElementById("chipNights");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");

  function updateFilters() {
    setFilters({
      line: filterLine.value.trim(),
      number: filterNumber.value.trim(),
      vehicle: filterVehicle.value.trim(),
      dateFrom: filterDateFrom.value || "",
      dateTo: filterDateTo.value || "",
      weekendOnly: chipWeekends?.classList.contains("active") || false,
      nightOnly: chipNights?.classList.contains("active") || false,
    });
  }

  filterLine.addEventListener("input", updateFilters);
  filterNumber.addEventListener("input", updateFilters);
  filterVehicle.addEventListener("input", updateFilters);
  filterDateFrom.addEventListener("change", updateFilters);
  filterDateTo.addEventListener("change", updateFilters);

  clearFiltersBtn.onclick = () => {
    filterLine.value = "";
    filterNumber.value = "";
    filterVehicle.value = "";
    filterDateFrom.value = "";
    filterDateTo.value = "";
    chipTrams?.classList.remove("active");
    chipWeekends?.classList.remove("active");
    chipNights?.classList.remove("active");
    updateFilters();
  };

  function toggleChip(btn) {
    btn.classList.toggle("active");
    updateFilters();
  }

  if (chipTrams) {
    chipTrams.addEventListener("click", () => {
      if (!chipTrams.classList.contains("active")) {
        chipTrams.classList.add("active");
        filterVehicle.value = "Električka";
      } else {
        chipTrams.classList.remove("active");
        filterVehicle.value = "";
      }
      updateFilters();
    });
  }
  if (chipWeekends)
    chipWeekends.addEventListener("click", () => toggleChip(chipWeekends));
  if (chipNights)
    chipNights.addEventListener("click", () => toggleChip(chipNights));

  prevPageBtn.onclick = () => changePage(-1);
  nextPageBtn.onclick = () => changePage(1);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".edit-btn");
    if (btn) {
      const id = btn.dataset.id;
      startEditRide(id);
    }
  });

  renderRidesList();
  renderFilterSuggestions();
  updateFilters();
}


