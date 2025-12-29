import { loadRides, saveRides } from "./storage.js";

// SÉRIE VOZIDIEL (ak chceš, môžeš upraviť podľa reality)
export const vehicleSeries = [
  { type: "Solaris 12", start: 3001, end: 3050 },
  { type: "Solaris 18", start: 3501, end: 3550 },
  { type: "SOR NB 12", start: 4101, end: 4150 },
  { type: "SOR NB 18", start: 4201, end: 4250 },
  { type: "Iveco Urbanway", start: 5001, end: 5050 },
  { type: "Trolejbus Škoda", start: 6001, end: 6050 }
];

export function getVehicleType(number) {
  const num = parseInt(number);

  for (const s of vehicleSeries) {
    if (num >= s.start && num <= s.end) {
      return s.type;
    }
  }

  return "Neznáme vozidlo";
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export function addRide({ line, number }) {
  const rides = loadRides();

  const now = new Date();

  const ride = {
    id: generateId(),
    line,
    number,
    vehicle: getVehicleType(number),
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0, 5)
  };

  rides.push(ride);
  saveRides(rides);
}
