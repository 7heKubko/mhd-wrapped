export const getTotal = r => r.length;

export function getTopLine(rides) {
  const map = {};
  rides.forEach(r => {
    const mainLine = r.line.split('/')[0];
    if (!map[mainLine]) map[mainLine] = { count:0, courses:[] };
    map[mainLine].count++;
    map[mainLine].courses.push(r.line);
  });
  return Object.entries(map).sort((a,b)=>b[1].count-a[1].count)[0] || ['-',{count:0,courses:[]}];
}

export function getFavBus(rides) {
  const m = {};
  rides.forEach(r => {
    const k = r.vehicle+' '+r.number;
    m[k] = (m[k] || 0) + 1;
  });
  return Object.entries(m)[0] || ['-',0];
}

export function getPersona(rides) {
  if (!rides.length) return '-';
  let night = 0;
  rides.forEach(r => {
    const h = parseInt(r.time);
    if (h >= 22 || h < 5) night++;
  });
  return night > rides.length * 0.3 ? 'Nočný jazdec' : 'Denný jazdec';
}
