import * as W from './wrapped.js';
import { loadRides } from './storage.js';
import { deleteRide } from './rides.js';

const lineColors = {
  '1':'#f56200',
  '3':'#e31e24',
  '4':'#5071b9',
  '9':'#849717',


  '33':'#776ab4',
  '40':'#e51a4b',
  '42':'#a65430',
  '44':'#a979b3',
  '45':'#808080',
  '47':'#ad8b00',
  '49':'#d16c1a',
  '60':'#2a4493',
  '61':'#a21517',
  '64':'#0e562c',
  '71':'#007db3',
  '72':'#899d1b',


  '20':'#808080',
  '21':'#338632',
  '23':'#808080',
  '25':'#808080',
  '26':'#808080',
  '29':'#808080',
  '30':'#808080',
  '31':'#808080',
  '32':'#808080',
  '35':'#808080',
  '36':'#808080',
  '37':'#e31e24',

  '39':'#808080',
  '43':'#808080',
  '50':'#065469',
  '51':'#808080',
  '52':'#808080',
  '53':'#808080',
  '56':'#808080',
  '57':'#808080',
  '63':'#642f6c',
  '65':'#808080',
  '66':'#808080',
  '67':'#808080',

  '68':'#887917',
  '69':'#808080',
  '70':'#808080',
  '75':'#808080',
  '77':'#808080',
  '78':'#808080',
  '79':'#808080',
  '80':'##d77e09',
  '83':'#007ab8',
  '84':'#007ab8',
  '87':'#808080',
  '88':'#642f6c',
  
  '90':'#808080',
  '91':'#808080',
  '92':'#808080',
  '93':'#ab075f',
  '94':'#ab075f',
  '96':'#338632',
  '98':'#b25c2e',
  '99':'#ee639f',
  '131':'#808080',
  '139':'#808080',
  '144':'#808080',
  '145':'#808080',

  '147':'#808080',
  '151':'#808080',
  '163':'#808080',
  '184':'#808080',
  '191':'#808080',
  '192':'#808080',
  'Šk6':'#808080',


  '299':'#2b2a29',
  '598':'#2b2a29',
  '599':'#2b2a29',
  '699':'#2b2a29',
  '798':'#2b2a29',
  '799':'#2b2a29',
  'N21':'#2b2a29',
  'N29':'#2b2a29',
  'N31':'#2b2a29',
  'N33':'#2b2a29',
  'N34':'#2b2a29',

  'N37':'#2b2a29',
  'N44':'#2b2a29',
  'N47':'#2b2a29',
  'N53':'#2b2a29',
  'N55':'#2b2a29',
  'N56':'#2b2a29',
  'N61':'#2b2a29',
  'N70':'#2b2a29',
  'N72':'#2b2a29',
  'N74':'#2b2a29',
  'N80':'#2b2a29',

  'N91':'#2b2a29',
  'N93':'#2b2a29',
  'N95':'#2b2a29',
  'N99':'#2b2a29',


  'R20':'#126dd4',
  'R50':'#126dd4',
  'R55':'#126dd4',
  'R60':'#126dd4',
  'REX6':'#126dd4',
  'R70':'#126dd4',
  'S8':'#126dd4',
  'S20':'#126dd4',
  'S50':'#126dd4',
  'S60':'#126dd4',
  'S70':'#126dd4',


  '205':'#bfbfb9',
  '209':'#bfbfb9',
  '215':'#bfbfb9',
  '216':'#bfbfb9',
  '219':'#bfbfb9',
  '239':'#bfbfb9',
  '240':'#bfbfb9',
  '245':'#bcb5da',
  '246':'#bfbfb9',
  '249':'#bfbfb9',
  '250':'#bfbfb9',
  '251':'#bfbfb9',

  
  '259':'#bfbfb9',
  '260':'#bfbfb9',
  '265':'#bfbfb9',
  '269':'#a2d9f7',
  '275':'#bfbfb9',
  '277':'#bfbfb9',
  '289':'#bfbfb9',
  '506':'#bfbfb9',
  '515':'#bfbfb9',
  '520':'#bfbfb9',
  '521':'#bfbfb9',
  '525':'#af9778',

  
  '527':'#af9778',
  '528':'#bfbfb9',
  '529':'#bfbfb9',
  '531':'#bfbfb9',
  '539':'#bfbfb9',
  '540':'#78b833',
  '545':'#bfbfb9',
  '550':'#bfbfb9',
  '555':'#bfbfb9',
  '565':'#bfbfb9',
  '605':'#bfbfb9',
  '609':'#bfbfb9',

  '610':'#d4a31c',
  '620':'#f6bfd9',
  '622':'#bfbfb9',
  '630':'#bfbfb9',
  '632':'#eed500',
  '640':'#bfbfb9',
  '645':'#bfbfb9',
  '648':'#bfbfb9',
  '649':'#bfbfb9',
  '657':'#bfbfb9',
  '658':'#bfbfb9',
  '659':'#bfbfb9',

  '666':'#bfbfb9',
  '710':'#bfbfb9',
  '711':'#bfbfb9',
  '720':'#bfbfb9',
  '725':'#f9d1d5',
  '727':'#bfbfb9',
  '729':'#bfbfb9',
  '730':'#bfbfb9',
  '737':'#ea553d',
  '740':'#fabc48',


  '901':'#bfbfb9',
  '808':'#bfbfb9',

  
  'Malacky: A':'#00963f',
  'Malacky: B':'#eb1c24',
  'Malacky: C':'#007ebc',

  
  'PK1':'#4de600',
  'PK2':'#e59800',
  'PK3':'#ea00a9',
  'PK4':'#0071fe',
  'PK24':'#007ab8',

  
  'SC1':'#808080',

  'X1':'#ff7f1a',
  'X3':'#ff7f1a',
  'X4':'#ff7f1a',
  'X9':'#ff7f1a',
};

let currentPage = 1;
const pageSize = 10;
let currentFilters = {
  line: '',
  number: '',
  vehicle: '',
  dateFrom: '',
  dateTo: ''
};

export function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('error');
  if (type === 'error') t.classList.add('error');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function formatDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return '';
  const [y,m,d] = dateStr.split('-');
  return `${d}.${m}.${y} ${timeStr}`;
}

export function renderFilterSuggestions() {
  const rides = loadRides();

  const lines = [...new Set(rides.map(r => r.line))];
  const numbers = [...new Set(rides.map(r => r.number))];
  const vehicles = [...new Set(rides.map(r => r.vehicle))];

  const lineList = document.getElementById('filterLines');
  const numberList = document.getElementById('filterNumbers');
  const vehicleList = document.getElementById('filterVehicles');

  lineList.innerHTML = '';
  numberList.innerHTML = '';
  vehicleList.innerHTML = '';

  lines.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    lineList.appendChild(opt);
  });

  numbers.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    numberList.appendChild(opt);
  });

  vehicles.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    vehicleList.appendChild(opt);
  });
}

function passesFilters(r) {
  const f = currentFilters;

  if (f.line && !r.line.toLowerCase().includes(f.line.toLowerCase())) return false;
  if (f.number && !r.number.toLowerCase().includes(f.number.toLowerCase())) return false;
  if (f.vehicle && !r.vehicle.toLowerCase().includes(f.vehicle.toLowerCase())) return false;

  if (f.dateFrom && r.date < f.dateFrom) return false;
  if (f.dateTo && r.date > f.dateTo) return false;

  return true;
}

function getFilteredRides() {
  const rides = loadRides();
  return rides.filter(passesFilters).sort((a,b) => {
    const aKey = `${a.date}T${a.time}`;
    const bKey = `${b.date}T${b.time}`;
    return bKey.localeCompare(aKey);
  });
}

export function setFilters(newFilters) {
  currentFilters = newFilters;
  currentPage = 1;
  renderRidesList();
  renderLastRides();
}

export function changePage(delta) {
  const rides = getFilteredRides();
  const totalPages = Math.max(1, Math.ceil(rides.length / pageSize));
  currentPage = Math.min(totalPages, Math.max(1, currentPage + delta));
  renderRidesList();
}

export function renderWrapped() {
  const r = loadRides();
  const totalEl = document.getElementById('total');
  const topLineEl = document.getElementById('topLine');
  const favBusEl = document.getElementById('favBus');
  const personaEl = document.getElementById('persona');

  totalEl.textContent = W.getTotal(r);
  const [l,data] = W.getTopLine(r);
  topLineEl.textContent = `${l}: ${data.count}× (${[...new Set(data.courses)].join(',')})`;
  const [bus] = W.getFavBus(r);
  favBusEl.textContent = bus;
  personaEl.textContent = W.getPersona(r);
}

export function renderRidesList() {
  const list = document.getElementById('ridesList');
  const pageInfo = document.getElementById('pageInfo');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');

  const rides = getFilteredRides();
  const totalPages = Math.max(1, Math.ceil(rides.length / pageSize));

  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * pageSize;
  const pageItems = rides.slice(start, start + pageSize);

  list.innerHTML = '';

  if (!pageItems.length) {
    list.innerHTML = '<li>Žiadne jazdy</li>';
  } else {
    pageItems.forEach(r => {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = `${formatDateTime(r.date, r.time)} - ${r.line} (${r.number}) ${r.vehicle ? '- ' + r.vehicle : ''}`;

      const btn = document.createElement('button');
      btn.textContent = "Vymazať";
      btn.onclick = () => {
        deleteRide(r.id);
        renderWrapped();
        renderTopLinesChart();
        renderRidesList();
        renderLastRides();
        showToast('Spoj bol vymazaný');
      };

      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  pageInfo.textContent = `${currentPage}/${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

export function renderLastRides() {
  const list = document.getElementById('lastRides');
  const rides = getFilteredRides();
  list.innerHTML = '';

  if (!rides.length) {
    list.innerHTML = "<li>Žiadne jazdy</li>";
    return;
  }

  const byDay = {};
  rides.forEach(r => {
    if (!byDay[r.date]) byDay[r.date] = [];
    byDay[r.date].push(r);
  });

  const days = Object.keys(byDay).sort().reverse();
  const lastDay = days[0];

  byDay[lastDay]
    .sort((a,b) => a.time.localeCompare(b.time))
    .forEach(r => {
      const li = document.createElement('li');
      li.textContent = `${formatDateTime(r.date, r.time)} – ${r.line} (${r.number})`;
      list.appendChild(li);
    });
}

export function renderTopLinesChart() {
  const ctx = document.getElementById('topLinesChart');
  if (!ctx) return;
  const rides = loadRides();
  const map = {};
  rides.forEach(r => {
    const mainLine = r.line.split('/')[0];
    if (!map[mainLine]) map[mainLine] = 0;
    map[mainLine]++;
  });
  const data = Object.entries(map).sort((a,b)=>b[1]-a[1]);

  if (ctx._chartInstance) {
    ctx._chartInstance.destroy();
  }

  const chart = new Chart(ctx, {
    type:'bar',
    data:{
      labels:data.map(d=>d[0]),
      datasets:[{
        data:data.map(d=>d[1]),
        backgroundColor:data.map(d=>lineColors[d[0]] || '#808080')
      }]
    },
    options:{
      plugins:{ legend:{ display:false } },
      responsive:true
    }
  });
  ctx._chartInstance = chart;
}
