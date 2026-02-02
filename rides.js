import { loadRides, saveRides } from "./storage.js";

export const vehicleSeriesBA = [
  { type: "Škoda 29 ForCity Plus", start: 7401, end: 7460, mode: "Električka", engineType: "Electro" },
  { type: "Škoda 30 ForCity Plus", start: 7501, end: 7540, mode: "Električka", engineType: "Electro" },
  { type: "ČKD Tatra T6A5", start: 7901, end: 7958, mode: "Električka", engineType: "Electro" },
  { type: "ČKD Tatra K2", start: 7115, end: 7185, mode: "Električka", engineType: "Electro" },
  { type: "ČKD Tatra K2YU", start: 7085, end: 7187, mode: "Električka", engineType: "Electro" },
  { type: "ČKD Tatra K2S", start: 7126, end: 7134, mode: "Električka", engineType: "Electro" },
  { type: "ČKD Tatra T3", start: 7704, end: 7719, mode: "Električka", engineType: "Electro" },

  { type: "SOR TNS 12", start: 6121, end: 6131, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda-Solaris Trollino 24", start: 6901, end: 6916, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda 27 TrA Solaris", start: 6711, end: 6733, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda 31 Tr SOR", start: 6801, end: 6870, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda 30 Tr SOR", start: 6001, end: 6035, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda 30 TrDG SOR", start: 6101, end: 6115, mode: "Trolejbus", engineType: "APU" },
  
  { type: "Otokar e-Kent C 12", start: 2611, end: 2613, mode: "Autobus", engineType: "Electro" },
  { type: "SOR NSG 18", start: 3401, end: 3408, mode: "Autobus", engineType: "CNG" },
  { type: "Solaris Urbino 12 hydrogen", start: 2601, end: 2604, mode: "Autobus", engineType: "H2O" },
  { type: "SOR NS 12 diesel", start: 2501, end: 2563, mode: "Autobus", engineType: "Diesel" },
  { type: "Otokar Kent C 18,75", start: 3311, end: 3381, mode: "Autobus", engineType: "Diesel" },
  { type: "Rošero First FCLEI-SF", start: 1231, end: 1234, mode: "Autobus", engineType: "Diesel" },
  { type: "Solaris New Urbino 18", start: 3221, end: 3231, mode: "Autobus", engineType: "Diesel" },
  { type: "Solaris Urbino 18/III", start: 3211, end: 3216, mode: "Autobus", engineType: "Diesel" },
  { type: "MAN NG 313", start: 3201, end: 3205, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR NS 12 Electric", start: 3001, end: 3016, mode: "Autobus", engineType: "Electro" },
  { type: "SOR EBN 8", start: 3901, end: 3902, mode: "Autobus", engineType: "Electro" },
  { type: "Solaris Urbino 8,6/III", start: 1911, end: 1916, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Urbanway 10,5M", start: 2401, end: 2424, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR NB 12 City", start: 1021, end: 1030, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR NB 12 City", start: 2031, end: 2048, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Urbanway 12M", start: 1041, end: 1070, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Urbanway 12M", start: 4041, end: 4050, mode: "Autobus", engineType: "Diesel" },
  { type: "Solaris Urbino 10/III", start: 2001, end: 2010, mode: "Autobus", engineType: "Diesel" },
  { type: "Irisbus SFR 161 Crossway LE City 12M", start: 3101, end: 3102, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR NB 18 City", start: 1821, end: 1868, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR NB 18 City", start: 2841, end: 2870, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR NB 18 City", start: 4221, end: 4274, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR NB 18 City", start: 2202, end: 2251, mode: "Autobus", engineType: "Diesel" },
  { type: "Irisbus Citelis 12M", start: 2331, end: 2365, mode: "Autobus", engineType: "Diesel" },
  { type: "Irisbus Citelis 12M", start: 1031, end: 1036, mode: "Autobus", engineType: "Diesel" },
  { type: "Mercedes-Benz O 530 GL CapaCity", start: 4020, end: 4941, mode: "Autobus", engineType: "Diesel" },

  { type: "Iveco Crossway LE Line 14.5M", start: 8801, end: 8810, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Crossway LE Line 12M", start: 8701, end: 8780, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR CN 12.3", start: 8551, end: 8650, mode: "Autobus", engineType: "Diesel" },
  { type: "SOR CN 10.5", start: 8521, end: 8530, mode: "Autobus", engineType: "Diesel" },
  { type: "Rošero First FCLEI", start: 8501, end: 8503, mode: "Autobus", engineType: "Diesel" },
  { type: "Irisbus Crossway LE Line 12M", start: 8877, end: 8896, mode: "Autobus", engineType: "Diesel" },

  { type: "Turbozmrd", start: 361, end: 361, mode: "Vlak", engineType: "Electro" },
  { type: "Rýchle Eso", start: 362, end: 362, mode: "Vlak", engineType: "Electro" },
  { type: "Eso", start: 363, end: 363, mode: "Vlak", engineType: "Electro" },
  { type: "Laminátka", start: 240, end: 240, mode: "Vlak", engineType: "Electro" },
  { type: "Gorila", start: 350, end: 350, mode: "Vlak", engineType: "Electro" },
  { type: "Vectron", start: 383, end: 383, mode: "Vlak", engineType: "Electro" },
  { type: "Vectron", start: 193, end: 193, mode: "Vlak", engineType: "Electro" },
  { type: "Princezná", start: 263, end: 263, mode: "Vlak", engineType: "Electro" },
  
  { type: "ČKD EMU 89.0", start: 89, end: 89, mode: "Vlak", engineType: "Electro" },
  { type: "Stadler GTW 2/6 425", start: 425, end: 425, mode: "Vlak", engineType: "Electro" },
  { type: "Stadler GTW 2/6 495", start: 495, end: 495, mode: "Vlak", engineType: "Electro" },
  { type: "SLM-BBC EMU 29.0 + R 29.0", start: 405, end: 405, mode: "Vlak", engineType: "Electro" },

  { type: "Anča", start: 810, end: 812, mode: "Vlak", engineType: "Diesel" },
  { type: "Rakva", start: 843, end: 843, mode: "Vlak", engineType: "Diesel" },
  { type: "Regionova", start: 814, end: 814, mode: "Vlak", engineType: "Diesel" },
  { type: "Taurus", start: 1216, end: 1216, mode: "Vlak", engineType: "Electro" },

  { type: "Brejlovec", start: 750, end: 757, mode: "Vlak", engineType: "Diesel" },
  { type: "Emil Zátopek", start: 380, end: 380, mode: "Vlak", engineType: "Electro" },
  { type: "Banan", start: 150, end: 151, mode: "Vlak", engineType: "Diesel" },
  { type: "Pershing", start: 162, end: 163, mode: "Vlak", engineType: "Electro" },
  { type: "Plecháč", start: 242, end: 242, mode: "Vlak", engineType: "Electro" },
  { type: "Pendolino", start: 680, end: 680, mode: "Vlak", engineType: "Electro" },
  { type: "Bardotka", start: 749, end: 749, mode: "Vlak", engineType: "Diesel" },
  { type: "Regio-Shuttle", start: 840, end: 841, mode: "Vlak", engineType: "Diesel" },
  { type: "Jánošík", start: 671, end: 671, mode: "Vlak", engineType: "Electro" },
  { type: "Panter", start: 660, end: 661, mode: "Vlak", engineType: "Electro" },
  { type: "RegioPanter", start: 640, end: 650, mode: "Vlak", engineType: "Electro" },
  { type: "Bastard", start: 371, end: 372, mode: "Vlak", engineType: "Electro" },
  { type: "City Elefant", start: 471, end: 471, mode: "Vlak", engineType: "Electro" }
];

export const vehicleSeriesOVA = [
  { type: "ČKD Tatra KT8D5", start: 1500, end: 1515, mode: "Električka", engineType: "Electro" },
  { type: "ČKD Tatra T3", start: 701, end: 799, mode: "Električka", engineType: "Electro" },
  { type: "ČKD Tatra T3SU", start: 901, end: 905, mode: "Električka", engineType: "Electro" },
  { type: "ČKD Tatra T3R.P.", start: 906, end: 1027, mode: "Električka", engineType: "Electro" },
  { type: "Inekon Trio", start: 1251, end: 1259, mode: "Električka", engineType: "Electro" },
  { type: "Pragoimex K2", start: 1402, end: 1403, mode: "Električka", engineType: "Electro" },
  { type: "Pragoimex VarioLF2", start: 1401, end: 1403, mode: "Električka", engineType: "Electro" },
  { type: "Pragoimex VarioLF2+", start: 1411, end: 1411, mode: "Električka", engineType: "Electro" },
  { type: "Pragoimex VarioLF3", start: 1601, end: 1602, mode: "Električka", engineType: "Electro" },
  { type: "Pragoimex VarioLF3", start: 1651, end: 1653, mode: "Električka", engineType: "Electro" },
  { type: "Pragoimex VarioLF", start: 1311, end: 1373, mode: "Električka", engineType: "Electro" },

  { type: "Škoda 39T", start: 1751, end: 1788, mode: "Električka", engineType: "Electro" },
  { type: "Škoda Astra LTM 10.08", start: 1201, end: 1214, mode: "Električka", engineType: "Electro" },
  { type: "Stadler Tango", start: 1701, end: 1740, mode: "Električka", engineType: "Electro" },

  { type: "Sor TNB 12", start: 3912, end: 3912, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda 36 Tr", start: 3741, end: 3757, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda 27 Tr III", start: 3802, end: 3812, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda 27 Tr IV", start: 3813, end: 3818, mode: "Trolejbus", engineType: "Electro" },
  { type: "Škoda 26 Tr III", start: 3715, end: 3740, mode: "Trolejbus", engineType: "Electro" },
  { type: "Solaris Trollino III", start: 3608, end: 3614, mode: "Trolejbus", engineType: "Electro" },
  { type: "Solaris Trollino II", start: 3702, end: 3730, mode: "Trolejbus", engineType: "Electro" },

  { type: "Ekova Electron", start: 5005, end: 5007, mode: "Autobus", engineType: "Electro" },
  { type: "ROŠERO - P First", start: 5301, end: 5305, mode: "Autobus", engineType: "Electro" },
  { type: "Solaris Urbino IV Electric", start: 5008, end: 5031, mode: "Autobus", engineType: "Electro" },

  { type: "Iveco Dekstra LE 37", start: 7304, end: 7310, mode: "Autobus", engineType: "Diesel" },
  { type: "ROŠERO - P First", start: 7311, end: 7312, mode: "Autobus", engineType: "Diesel" },
  { type: "Solaris Urbino 12 IV CNG", start: 7211, end: 7275, mode: "Autobus", engineType: "CNG" },
  { type: "Solaris Urbino 18 IV CNG", start: 7866, end: 7922, mode: "Autobus", engineType: "CNG" },
  { type: "Solaris Urbino 12 III CNG", start: 7121, end: 7210, mode: "Autobus", engineType: "CNG" },
  { type: "Solaris Urbino 10 III", start: 7505, end: 7524, mode: "Autobus", engineType: "Diesel" },
  { type: "Solaris Urbino 15 III", start: 7617, end: 7630, mode: "Autobus", engineType: "Diesel" },
  { type: "Solaris Urbino 12 III", start: 7725, end: 7787, mode: "Autobus", engineType: "Diesel" },
  { type: "Solaris Urbino 18 III", start: 7801, end: 7807, mode: "Autobus", engineType: "Diesel" },
  { type: "Solaris Urbino 18 III CNG", start: 7851, end: 7865, mode: "Autobus", engineType: "CNG" },
  { type: "Scania UNVI Urbis Doubledecker", start: 7991, end: 7992, mode: "Autobus", engineType: "Diesel" },

  { type: "Iveco Crossway LE Line 12M", start: 241001, end: 241011, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Crossway LE City 12M", start: 331001, end: 331026, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Crossway LE Line 12M", start: 421001, end: 421023, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Crossway LE City 12M", start: 631001, end: 631011, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Crossway LE Line 12M", start: 640001, end: 640004, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Crossway LE Line 12M", start: 641001, end: 641019, mode: "Autobus", engineType: "Diesel" },
  { type: "Iveco Crossway LE Line 12M", start: 741001, end: 741005, mode: "Autobus", engineType: "Diesel" },
  { type: "Setra S415 LE", start: 631301, end: 631351, mode: "Autobus", engineType: "Diesel" },
  { type: "Scania Citywide LE 12M CNG", start: 631202, end: 631211, mode: "Autobus", engineType: "CNG" },
  { type: "Scania Citywide Suburban LE 15M", start: 0, end: 0, mode: "Autobus", engineType: "Diesel" },

  { type: "Turbozmrd", start: 361, end: 361, mode: "Vlak", engineType: "Diesel" },
  { type: "Rýchle Eso", start: 362, end: 362, mode: "Vlak", engineType: "Electro" },
  { type: "Eso", start: 363, end: 363, mode: "Vlak", engineType: "Electro" },
  { type: "Laminátka", start: 240, end: 240, mode: "Vlak", engineType: "Electro" },
  { type: "Gorila", start: 350, end: 350, mode: "Vlak", engineType: "Electro" },
  { type: "Vectron", start: 383, end: 383, mode: "Vlak", engineType: "Electro" },
  { type: "Vectron", start: 193, end: 193, mode: "Vlak", engineType: "Electro" },
  { type: "Princezná", start: 263, end: 263, mode: "Vlak", engineType: "Electro" },

  { type: "Anča", start: 810, end: 812, mode: "Vlak", engineType: "Diesel" },
  { type: "Rakva", start: 843, end: 843, mode: "Vlak", engineType: "Diesel" },
  { type: "Regionova", start: 814, end: 814, mode: "Vlak", engineType: "Diesel" },
  { type: "Taurus", start: 1216, end: 1216, mode: "Vlak", engineType: "Electro" },

  { type: "Brejlovec", start: 750, end: 757, mode: "Vlak", engineType: "Diesel" },
  { type: "Emil Zátopek", start: 380, end: 380, mode: "Vlak", engineType: "Electro" },
  { type: "Banan", start: 150, end: 151, mode: "Vlak", engineType: "Diesel" },
  { type: "Pershing", start: 162, end: 163, mode: "Vlak", engineType: "Electro" },
  { type: "Plecháč", start: 242, end: 242, mode: "Vlak", engineType: "Electro" },
  { type: "Pendolino", start: 680, end: 680, mode: "Vlak", engineType: "Electro" },
  { type: "Bardotka", start: 749, end: 749, mode: "Vlak", engineType: "Diesel" },
  { type: "Regio-Shuttle", start: 840, end: 841, mode: "Vlak", engineType: "Diesel" },
  { type: "Jánošík", start: 671, end: 671, mode: "Vlak", engineType: "Electro" },
  { type: "Panter", start: 660, end: 661, mode: "Vlak", engineType: "Electro" },
  { type: "RegioPanter", start: 640, end: 650, mode: "Vlak", engineType: "Electro" },
  { type: "Bastard", start: 371, end: 372, mode: "Vlak", engineType: "Electro" },
  { type: "City Elefant", start: 471, end: 471, mode: "Vlak", engineType: "Electro" }
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

export function getVehicleEngineType(number) {
  const num = parseInt(number);
  const series = getVehicleSeries();

  for (const s of series) {
    if (num >= s.start && num <= s.end) {
      return s.engineType || "unknown";
    }
  }

  return "unknown";
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
    engineType: getVehicleEngineType(number),
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0, 5),
  };

  rides.push(ride);
  saveRides(rides);
  return ride;
}
