import { loadRides, saveRides } from "./storage.js";

export const vehicleSeriesBA = [
  { type: "Škoda 29 ForCity Plus", start: 7401, end: 7460, mode: "Električka" },
  { type: "Škoda 30 ForCity Plus", start: 7501, end: 7540, mode: "Električka" },
  { type: "ČKD Tatra T6A5", start: 7901, end: 7958, mode: "Električka" },
  { type: "ČKD Tatra K2", start: 7115, end: 7185, mode: "Električka" },
  { type: "ČKD Tatra K2YU", start: 7085, end: 7187, mode: "Električka" },
  { type: "ČKD Tatra K2S", start: 7126, end: 7134, mode: "Električka" },
  { type: "ČKD Tatra T3", start: 7704, end: 7719, mode: "Električka" },

  { type: "SOR TNS 12", start: 6121, end: 6131, mode: "Trolejbus" },
  { type: "Škoda-Solaris Trollino 24", start: 6901, end: 6916, mode: "Trolejbus" },
  { type: "Škoda 27 TrA Solaris", start: 6711, end: 6733, mode: "Trolejbus" },
  { type: "Škoda 31 Tr SOR", start: 6801, end: 6870, mode: "Trolejbus" },
  { type: "Škoda 30 Tr SOR", start: 6001, end: 6035, mode: "Trolejbus" },
  { type: "Škoda 30 TrDG SOR", start: 6101, end: 6115, mode: "Trolejbus" },

  { type: "Otokar e-Kent C 12", start: 2611, end: 2613, mode: "Autobus" },
  { type: "SOR NSG 18", start: 3401, end: 3408, mode: "Autobus" },
  { type: "Solaris Urbino 12 hydrogen", start: 2601, end: 2604, mode: "Autobus" },
  { type: "SOR NS 12 diesel", start: 2501, end: 2563, mode: "Autobus" },
  { type: "Otokar Kent C 18,75", start: 3311, end: 3381, mode: "Autobus" },
  { type: "Rošero First FCLEI-SF", start: 1231, end: 1234, mode: "Autobus" },
  { type: "Solaris New Urbino 18", start: 3221, end: 3231, mode: "Autobus" },
  { type: "Solaris Urbino 18/III", start: 3211, end: 3216, mode: "Autobus" },
  { type: "MAN NG 313", start: 3201, end: 3205, mode: "Autobus" },
  { type: "SOR NS 12 Electric", start: 3001, end: 3016, mode: "Autobus" },
  { type: "SOR EBN 8", start: 3901, end: 3902, mode: "Autobus" },
  { type: "Solaris Urbino 8,6/III", start: 1911, end: 1916, mode: "Autobus" },
  { type: "Iveco Urbanway 10,5M", start: 2401, end: 2424, mode: "Autobus" },
  { type: "SOR NB 12 City", start: 1021, end: 1030, mode: "Autobus" },
  { type: "SOR NB 12 City", start: 2031, end: 2048, mode: "Autobus" },
  { type: "Iveco Urbanway 12M", start: 1041, end: 1070, mode: "Autobus" },
  { type: "Iveco Urbanway 12M", start: 4041, end: 4050, mode: "Autobus" },
  { type: "Solaris Urbino 10/III", start: 2001, end: 2010, mode: "Autobus" },
  { type: "Irisbus SFR 161 Crossway LE City 12M", start: 3101, end: 3102, mode: "Autobus" },
  { type: "SOR NB 18 City", start: 1821, end: 1868, mode: "Autobus" },
  { type: "SOR NB 18 City", start: 2841, end: 2870, mode: "Autobus" },
  { type: "SOR NB 18 City", start: 4221, end: 4274, mode: "Autobus" },
  { type: "SOR NB 18 City", start: 2202, end: 2251, mode: "Autobus" },
  { type: "Irisbus Citelis 12M", start: 2331, end: 2365, mode: "Autobus" },
  { type: "Irisbus Citelis 12M", start: 1031, end: 1036, mode: "Autobus" },
  { type: "Mercedes-Benz O 530 GL CapaCity", start: 4020, end: 4941, mode: "Autobus" },

  { type: "Iveco Crossway LE Line 14.5M", start: 8801, end: 8810, mode: "Autobus" },
  { type: "Iveco Crossway LE Line 12M", start: 8701, end: 8780, mode: "Autobus" },
  { type: "SOR CN 12.3", start: 8551, end: 8650, mode: "Autobus" },
  { type: "SOR CN 10.5", start: 8521, end: 8530, mode: "Autobus" },
  { type: "Rošero First FCLEI", start: 8501, end: 8503, mode: "Autobus" },
  { type: "Irisbus Crossway LE Line 12M", start: 8877, end: 8896, mode: "Autobus" }
];

export const vehicleSeriesOVA = [
  { type: "ČKD Tatra KT8D5", start: 1500, end: 1515, mode: "Električka" },
  { type: "ČKD Tatra T3", start: 701, end: 799, mode: "Električka" },
  { type: "ČKD Tatra T3SU", start: 901, end: 905, mode: "Električka" },
  { type: "ČKD Tatra T3SUCS", start: 906, end: 1027, mode: "Električka" },
  { type: "Inekon Trio", start: 1251, end: 1259, mode: "Električka" },
  { type: "Pragoimex K2", start: 1402, end: 1403, mode: "Električka" },
  { type: "Pragoimex VarioLF2", start: 1401, end: 1403, mode: "Električka" },
  { type: "Pragoimex VarioLF2+", start: 1411, end: 1411, mode: "Električka" },
  { type: "Pragoimex VarioLF3", start: 1601, end: 1602, mode: "Električka" },
  { type: "Pragoimex VarioLF3", start: 1651, end: 1653, mode: "Električka" },
  { type: "Pragoimex VarioLF", start: 1311, end: 1373, mode: "Električka" },

  { type: "Škoda 39T", start: 1751, end: 1788, mode: "Električka" },
  { type: "Škoda Astra LTM 10.08", start: 1201, end: 1214, mode: "Električka" },
  { type: "Stadler Tango", start: 1701, end: 1740, mode: "Električka" },

  { type: "Sor TNB 12", start: 3912, end: 3912, mode: "Trolejbus" },
  { type: "Škoda 36 Tr", start: 3741, end: 3757, mode: "Trolejbus" },
  { type: "Škoda 27 Tr III", start: 3802, end: 3812, mode: "Trolejbus" },
  { type: "Škoda 27 Tr IV", start: 3813, end: 3818, mode: "Trolejbus" },
  { type: "Škoda 26 Tr III", start: 3715, end: 3740, mode: "Trolejbus" },
  { type: "Solaris Trollino III", start: 3608, end: 3614, mode: "Trolejbus" },
  { type: "Solaris Trollino II", start: 3702, end: 3730, mode: "Trolejbus" },

  { type: "Ekova Electron", start: 5005, end: 5007, mode: "Autobus" },
  { type: "ROŠERO - P First", start: 5301, end: 5305, mode: "Autobus" },
  { type: "Solaris Urbino IV Electric", start: 5008, end: 5031, mode: "Autobus" },

  { type: "Iveco Dekstra LE 37", start: 7304, end: 7310, mode: "Autobus" },
  { type: "ROŠERO - P First", start: 7311, end: 7312, mode: "Autobus" },
  { type: "Solaris Urbino 12 IV CNG", start: 7211, end: 7275, mode: "Autobus" },
  { type: "Solaris Urbino 18 IV CNG", start: 7866, end: 7922, mode: "Autobus" },
  { type: "Solaris Urbino 12 III CNG", start: 7121, end: 7210, mode: "buAutobuss" },
  { type: "Solaris Urbino 10 III", start: 7505, end: 7524, mode: "Autobus" },
  { type: "Solaris Urbino 15 III", start: 7617, end: 7630, mode: "Autobus" },
  { type: "Solaris Urbino 12 III", start: 7725, end: 7787, mode: "Autobus" },
  { type: "Solaris Urbino 18 III", start: 7801, end: 7807, mode: "Autobus" },
  { type: "Solaris Urbino 18 III CNG", start: 7851, end: 7865, mode: "Autobus" },
  { type: "Scania UNVI Urbis Doubledecker", start: 7991, end: 7992, mode: "Autobus" },
  
  { type: "Iveco Crossway LE Line 12M - Transdev", start: 0, end: 0, mode: "Autobus" },
  { type: "Iveco Crossway LE City 12M - Z-Group", start: 0, end: 0, mode: "Autobus" },
  { type: "Setra S415 LE", start: 0, end: 0, mode: "Autobus" },
  { type: "Scania Citywide LE 12M CNG", start: 0, end: 0, mode: "Autobus" },
  { type: "Scania Citywide Suburban LE 15M", start: 0, end: 0, mode: "Autobus" }
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

export function getVehicleMode(number) {
  const num = parseInt(number);
  const series = getVehicleSeries();

  for (const s of series) {
    if (num >= s.start && num <= s.end) {
      return s.mode || "neznámy";
    }
  }

  return "neznámy";
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
    vehicleMode: getVehicleMode(number),
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0, 5)
  };

  rides.push(ride);
  saveRides(rides);
}
