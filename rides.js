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
  { type: "ČKD Tatra KT8D5", start: 1500, end: 1515 },
  { type: "ČKD Tatra T3", start: 701, end: 799 },
  { type: "ČKD Tatra T3SU", start: 901, end: 905 },
  { type: "ČKD Tatra T3SUCS", start: 906, end: 1027 },
  { type: "Inekon Trio", start: 1251, end: 1259 },
  { type: "Pragoimex K2", start: 1402, end: 1403 },
  { type: "Pragoimex VarioLF2", start: 1401, end: 1401 },
  { type: "Pragoimex VarioLF2", start: 1411, end: 1411 },
  { type: "Pragoimex VarioLF3", start: 1601, end: 1602 },
  { type: "Pragoimex VarioLF3", start: 1651, end: 1653 },
  { type: "Pragoimex T3", start: 1311, end: 1373 },
  { type: "Škoda 39T", start: 1751, end: 1788 },
  { type: "Škoda Astra LTM 10.08", start: 1201, end: 1214 },
  { type: "Stadler Tango", start: 1701, end: 1740 },

  { type: "Škoda 36 Tr", start: 3741, end: 3757 },
  { type: "Škoda 27 Tr", start: 3802, end: 3818 },
  { type: "Škoda 26 Tr", start: 3715, end: 3740 },
  { type: "Solaris Trollino III", start: 3608, end: 3614 },
  { type: "Solaris Trollino II", start: 3702, end: 3730 },

  { type: "Ekova Electron", start: 5005, end: 5007 },
  { type: "ROŠERO - P First", start: 5301, end: 5305 },
  { type: "Solaris Urbino IV", start: 5008, end: 5031 },

  { type: "Dekstra LE", start: 7304, end: 7310 },
  { type: "ROŠERO - P First", start: 7311, end: 7312 },
  { type: "Solaris Urbino 12 IV CNG", start: 7211, end: 7275 },
  { type: "Solaris Urbino 18 IV CNG", start: 7866, end: 7922 },
  { type: "Solaris Urbino 12 III CNG", start: 7121, end: 7210 },
  { type: "Solaris Urbino 10 III", start: 7505, end: 7524 },
  { type: "Solaris Urbino 15 III", start: 7617, end: 7630 },
  { type: "Solaris Urbino 12 III", start: 7725, end: 7787 },
  { type: "Solaris Urbino 18 III", start: 7801, end: 7807 },
  { type: "Solaris Urbino 18 III CNG", start: 7851, end: 7865 },
  { type: "UNVI Urbis", start: 7991, end: 7992 },

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
