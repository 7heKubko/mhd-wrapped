import { applyTheme, renderRidesList, renderFilterSuggestions, setFilters, changePage, startEditRide } from "./ui.js";

applyTheme();

const filterLine = document.getElementById("filterLine");
const filterNumber = document.getElementById("filterNumber");
const filterVehicle = document.getElementById("filterVehicle");
const filterDateFrom = document.getElementById("filterDateFrom");
const filterDateTo = document.getElementById("filterDateTo");
const clearFiltersBtn = document.getElementById("clearFilters");

const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");

function updateFilters() {
  setFilters({
    line: filterLine.value.trim(),
    number: filterNumber.value.trim(),
    vehicle: filterVehicle.value.trim(),
    dateFrom: filterDateFrom.value || "",
    dateTo: filterDateTo.value || ""
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
  updateFilters();
};

prevPageBtn.onclick = () => changePage(-1);
nextPageBtn.onclick = () => changePage(1);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.dataset.id;
    startEditRide(id);
  }
});

renderRidesList();
renderFilterSuggestions();
updateFilters();
