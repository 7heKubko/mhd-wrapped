// Returns the most common vehicle mode (bus, tram, tbus, coach, etc.)
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

// Returns the most common vehicle model for a given line
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
  if (total < 20) return "Príležitostný cestujúci";
  if (total < 100) return "MHD nadšenec";
  return "MHD legenda";
}
