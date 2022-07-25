import L from 'leaflet';
const setStyle = (features) => {
  return { fillColor: features.fillColor, dashArray: '3', fillOpacity: 0.7 };
};
export function ShapeFile(data, mapRef) {
  return L.geoJson(
    { features: [] },

    {
      style: setStyle,
      onEachFeature: function popUp(f, l) {
        var out = [];
        if (f.properties) {
          for (var key in f.properties) {
            out.push(key + ': ' + f.properties[key]);
          }
          l.bindPopup(out.join('<br />'));
        }
      },
    }
  ).addTo(mapRef);
  // geo.addData(data.data);
}
