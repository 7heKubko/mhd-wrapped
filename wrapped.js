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
    if (!map[r.number]) map[r.number] = 0;
    map[r.number]++;
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
