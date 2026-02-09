const KEY = "mhd-wrapped-rides";

export function loadRides() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data;
    }
  } catch {}
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
  try {
    localStorage.setItem(KEY, payload);
    return;
  } catch {}
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
