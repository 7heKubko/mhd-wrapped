import { loadRides, saveRides } from "./storage.js";

export const vehicleSeriesBA = [
  { type: "Škoda 29T1 ForCity Plus", start: 7401, end: 7460 },
  { type: "Škoda 30T0 ForCity Plus", start: 7501, end: 7540 },
  { type: "ČKD Tatra T6A5", start: 7901, end: 7958 },
  { type: "ČKD Tatra K2", start: 309, end: 394 },
  { type: "ČKD Tatra K2YU", start: 7085, end: 7187 },
  { type: "ČKD Tatra K2S", start: 7126, end: 7134 },
  { type: "ČKD Tatra T3", start: 7704, end: 7719 },

  { type: "SOR TNS 12", start: 6121, end: 6131 },
  { type: "Škoda-Solaris Trollino 24", start: 6901, end: 6916 },
  { type: "Škoda 27 TrA Solaris", start: 6711, end: 6733 },
  { type: "Škoda 31 Tr SOR", start: 6801, end: 6870 },
  { type: "Škoda 30 Tr SOR", start: 6001, end: 6035 },
  { type: "Škoda 30 TrDG SOR", start: 6101, end: 6115 },

  { type: "Otokar e-Kent C 12", start: 2611, end: 2613 },
  { type: "SOR NSG 18", start: 3401, end: 3408 },
  { type: "Solaris Urbino 12 hydrogen", start: 2601, end: 2604 },
  { type: "SOR NS 12 diesel", start: 2501, end: 2563 },
  { type: "Otokar Kent C 18,75", start: 3311, end: 3381 },
  { type: "Rošero First FCLEI-SF", start: 1231, end: 1234 },
  { type: "Solaris New Urbino 18", start: 3221, end: 3231 },
  { type: "Solaris Urbino 18/III", start: 3211, end: 3216 },
  { type: "MAN NG 313", start: 3201, end: 3205 },
  { type: "SOR NS 12 Electric", start: 3001, end: 3016 },
  { type: "SOR EBN 8", start: 3901, end: 3902 },
  { type: "Solaris Urbino 8,6/III", start: 1911, end: 1916 },
  { type: "Iveco Urbanway 10,5M", start: 2401, end: 2424 },
  { type: "SOR NB 12 City", start: 1021, end: 1030 },
  { type: "SOR NB 12 City", start: 2031, end: 2048 },
  { type: "Iveco Urbanway 12M", start: 1041, end: 1070 },
  { type: "Iveco Urbanway 12M", start: 4041, end: 4050 },
  { type: "Solaris Urbino 10/III", start: 2001, end: 2010 },
  { type: "Irisbus SFR 161 Crossway LE City 12M", start: 3101, end: 3102 },
  { type: "SOR NB 18 City", start: 1821, end: 1868 },
  { type: "SOR NB 18 City", start: 2841, end: 2870 },
  { type: "SOR NB 18 City", start: 4221, end: 4274 },
  { type: "SOR NB 18 City", start: 2202, end: 2251 },
  { type: "Irisbus Citelis 12M", start: 2331, end: 2365 },
  { type: "Irisbus Citelis 12M", start: 1031, end: 1036 },
  { type: "Mercedes-Benz O 530 GL CapaCity", start: 4020, end: 4941 }
];

export const vehicleSeriesOVA = [
  { type: "Iveco Urbanway 12M", start: 7001, end: 7050 },
  { type: "Iveco Urbanway 18M", start: 7101, end: 7150 },
  { type: "Solaris Urbino 12", start: 7201, end: 7250 },
  { type: "Solaris Urbino 18", start: 7301, end: 7350 },
  { type: "Trolejbus Škoda 26Tr", start: 7501, end: 7550 }
];

export function getVehicleSeries() {
  const city = localStorage.getItem("city") || "bratislava";
  return city === "ostrava" ? vehicleSeriesOVA : vehicleSeriesBA;
}

export function getVehicleType(number) {
  const num = parseInt(number);
  const series = getVehicleSeries();

  for (const s of series) {
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
