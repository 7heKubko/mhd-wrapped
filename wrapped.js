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

// Calculate the number of days without rides
export function getDaysWithoutRides(rides, startDate, endDate) {
  const daysWithRides = new Set(rides.map((r) => r.date));
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  return totalDays - daysWithRides.size;
}

// Determine the most active day of the week
export function getMostActiveDay(rides) {
  const dayMap = {};
  rides.forEach((r) => {
    const day = new Date(r.date).getDay();
    if (!dayMap[day]) dayMap[day] = 0;
    dayMap[day]++;
  });
  const sorted = Object.entries(dayMap).sort((a, b) => b[1] - a[1]);
  return sorted.length ? parseInt(sorted[0][0]) : null; // Returns day index (0 = Sunday, 6 = Saturday)
}

// Compare user stats with the average
export function compareWithAverage(userRides, averageRides) {
  const userTotal = userRides.length;
  return {
    user: userTotal,
    average: averageRides,
    difference: userTotal - averageRides,
  };
}

// Estimate CO₂ savings based on rides
export function getEcoStats(rides, co2PerRide = 0.2) {
  const totalRides = rides.length;
  const totalSavings = totalRides * co2PerRide; // Assuming 0.2 kg CO₂ saved per ride
  return {
    totalRides,
    totalSavings,
  };
}
