const RIDES_KEY = 'mhd_rides';
const ACH_KEY = 'mhd_achievements';

export const loadRides = () => JSON.parse(localStorage.getItem(RIDES_KEY) || '[]');
export const saveRides = r => localStorage.setItem(RIDES_KEY, JSON.stringify(r));
export const loadAchievements = () => JSON.parse(localStorage.getItem(ACH_KEY) || '{}');
export const saveAchievements = a => localStorage.setItem(ACH_KEY, JSON.stringify(a));
