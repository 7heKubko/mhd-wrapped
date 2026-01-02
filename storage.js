const KEY = "mhd-wrapped-rides";

export function loadRides() {
  // Try localStorage first
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data;
    }
  } catch {}
  // Fallback to sessionStorage (e.g., iOS Safari Private Mode)
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data;
    }
  } catch {}
  return [];
}

export function saveRides(rides) {
  const payload = JSON.stringify(rides);
  // Attempt localStorage
  try {
    localStorage.setItem(KEY, payload);
    return;
  } catch {}
  // Fallback to sessionStorage
  try {
    sessionStorage.setItem(KEY, payload);
  } catch {}
}

export function clearAll() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
