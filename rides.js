import { loadRides, saveRides } from './storage.js';

const vehicleSeries = [
  { type: 'SOR NS 12', start: 2501, end: 2563 },
  { type: 'Solaris Urbino 12', start: 3001, end: 3010 }
  // ... ďalšie série podľa potreby
];

function detectVehicleType(evc) {
  const num = parseInt(evc);
  for (const series of vehicleSeries) {
    if (num >= series.start && num <= series.end) {
      return series.type;
    }
  }
  return 'Neznámy typ';
}

export function addRide(data) {
  const rides = loadRides();
  const vehicleType = detectVehicleType(data.number);
  rides.push({
    id: crypto.randomUUID(),
    date: new Date().toISOString().slice(0,10),
    time: new Date().toTimeString().slice(0,5),
    ...data,
    vehicle: vehicleType
  });
  saveRides(rides);
}

export function deleteRide(id) {
  const rides = loadRides().filter(r => r.id !== id);
  saveRides(rides);
}
