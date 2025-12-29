const KEY = "mhd-wrapped-rides";

export function loadRides() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data;
  } catch {
    return [];
  }
}

export function saveRides(rides) {
  localStorage.setItem(KEY, JSON.stringify(rides));
}

export function clearAll() {
  localStorage.removeItem(KEY);
}
