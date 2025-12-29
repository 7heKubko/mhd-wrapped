import { addRide } from './rides.js';
import {
  renderWrapped,
  renderRidesList,
  renderLastRides,
  renderTopLinesChart,
  showToast,
  setFilters,
  renderFilterSuggestions,
  changePage
} from './ui.js';

import { loadRides } from './storage.js';

const lineInput = document.getElementById('line');
const numberInput = document.getElementById('number');
const addBtn = document.getElementById('add');

const filterLine = document.getElementById('filterLine');
const filterNumber = document.getElementById('filterNumber');
const filterVehicle = document.getElementById('filterVehicle');
const filterDateFrom = document.getElementById('filterDateFrom');
const filterDateTo = document.getElementById('filterDateTo');
const clearFiltersBtn = document.getElementById('clearFilters');

const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

const lines = ['65','83','N61','X13'];
const baseNumbers = ['2501','2502','2503','3001','3002'];

const linesList = document.getElementById('lines');
lines.forEach(l => {
  const opt = document.createElement('option');
  opt.value = l;
  linesList.appendChild(opt);
});

const numbersList = document.getElementById('numbers');
baseNumbers.forEach(n => {
  const opt = document.createElement('option');
  opt.value = n;
  numbersList.appendChild(opt);
});

lineInput.value = lines[0];
numberInput.value = baseNumbers[0];

function updateFilters() {
  setFilters({
    line: filterLine.value.trim(),
    number: filterNumber.value.trim(),
    vehicle: filterVehicle.value.trim(),
    dateFrom: filterDateFrom.value || '',
    dateTo: filterDateTo.value || ''
  });
}

filterLine.addEventListener('input', updateFilters);
filterNumber.addEventListener('input', updateFilters);
filterVehicle.addEventListener('input', updateFilters);
filterDateFrom.addEventListener('change', updateFilters);
filterDateTo.addEventListener('change', updateFilters);

clearFiltersBtn.onclick = () => {
  filterLine.value = '';
  filterNumber.value = '';
  filterVehicle.value = '';
  filterDateFrom.value = '';
  filterDateTo.value = '';
  updateFilters();
};

prevPageBtn.onclick = () => changePage(-1);
nextPageBtn.onclick = () => changePage(1);

addBtn.onclick = () => {
  const lineVal = lineInput.value.trim();
  const numberVal = numberInput.value.trim();

  if (!lineVal || !numberVal) {
    showToast('Zadaj linku aj EVČ', 'error');
    return;
  }

  addRide({ line: lineVal, number: numberVal });

  if (![...numbersList.options].some(o => o.value === numberVal)) {
    const opt = document.createElement('option');
    opt.value = numberVal;
    numbersList.appendChild(opt);
  }

  showToast(`Dadali ste spoj ${lineVal} (${numberVal})`);

  renderWrapped();
  renderTopLinesChart();
  renderRidesList();
  renderLastRides();
  renderFilterSuggestions();
};

renderWrapped();
renderTopLinesChart();
renderRidesList();
renderLastRides();
updateFilters();
renderFilterSuggestions();