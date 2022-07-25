import L from 'leaflet';
const mapPoint = L.divIcon({
  html: `
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="8" r="7" fill="#C4C4C4" stroke="black" stroke-width="2"/>
  </svg>`,
  className: 'mapPoint',
  iconSize: [20, 20],
  iconAnchor: [12, 12],
});

export { mapPoint };
