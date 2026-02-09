export function getFavVehicleMode(rides) {
  const map = {};
  rides.forEach((r) => {
    const mode = r.vehicleMode || "neznámy";
    if (!map[mode]) map[mode] = 0;
    map[mode]++;
  });
  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return ["-", 0];
  return [sorted[0][0], sorted[0][1]];
}

export function getFavModelOnLine(rides, line) {
  const map = {};
  rides.forEach((r) => {
    if (r.line.split("/")[0] === line && r.vehicle) {
      const key = `${r.vehicle} - ${r.number}`;
      if (!map[key]) map[key] = 0;
      map[key]++;
    }
  });
  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return ["-", 0];
  return [sorted[0][0], sorted[0][1]];
}
export function getTotal(rides) {
  return rides.length;
}

export function getTopLine(rides) {
  const map = {};

  rides.forEach((r) => {
    const main = r.line.split("/")[0];
    if (!map[main]) map[main] = 0;
    map[main]++;
  });

  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);

  if (!sorted.length) return ["-", { count: 0 }];

  return [sorted[0][0], { count: sorted[0][1] }];
}

export function getFavBus(rides) {
  const map = {};
  rides.forEach((r) => {
    const key = `${r.vehicle} - ${r.number}`;
    if (!map[key]) map[key] = 0;
    map[key]++;
  });
  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return ["-", 0];
  return [sorted[0][0], sorted[0][1]];
}

export function getPersona(rides) {
  const total = rides.length;

if (total === 0) return "Nováčik";
if (total < 50) return "Príležitostný cestujúci";
if (total < 100) return "MHD nadšenec";
if (total < 200) return "MHD záhradník";

if (total < 400) return "Lovec lístkov";
if (total < 600) return "Zabudol označiť lístok";
if (total < 800) return "Sedí na nesprávnom mieste";
if (total < 1000) return "Pozná vodiča po mene";

if (total < 1200) return "MHD filozof";
if (total < 1400) return "Expert na meškania";
if (total < 1600) return "Číta CP aj v spánku";
if (total < 1800) return "Zaspal konečnú";

if (total < 2000) return "Majster prestupov";
if (total < 2200) return "Revizorov šiesty zmysel";
if (total < 2400) return "Vodičova pravá ruka";
if (total < 2600) return "MHD kartograf";

if (total < 2800) return "Pán zastávok";
if (total < 3000) return "Cestoval aj v depe";
if (total < 3200) return "MHD poloboh";
if (total < 3400) return "Legendárny pasažier";

if (total < 5000) return "MHD legenda";
return "MHD nesmrteľný";

}
