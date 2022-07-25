import L from 'leaflet';
import * as turf from '@turf/turf';
import { setSlicePolygons } from '../redux/slice';

let polygons = [];

function cutPolygon(polygon, line, direction, id) {
  var j;
  var polyCoords = [];
  var cutPolyGeoms = [];
  var retVal = null;
  var intersectPoints = turf.lineIntersect(polygon, line);
  var nPoints = intersectPoints.features.length;
  if (nPoints == 0 || nPoints % 2 != 0) return retVal;
  var offsetLine = turf.lineOffset(line, 0.01 * direction, {
    units: 'kilometers',
  });

  for (j = 0; j < line.coordinates.length; j++) {
    polyCoords.push(line.coordinates[j]);
  }
  for (j = offsetLine.geometry.coordinates.length - 1; j >= 0; j--) {
    polyCoords.push(offsetLine.geometry.coordinates[j]);
  }
  polyCoords.push(line.coordinates[0]);
  var thickLineString = turf.lineString(polyCoords);
  var thickLinePolygon = turf.lineToPolygon(thickLineString);

  var clipped = turf.difference(polygon, thickLinePolygon);
  for (j = 0; j < clipped.geometry.coordinates.length; j++) {
    var polyg = turf.polygon(clipped.geometry.coordinates[j]);
    var overlap = turf.lineOverlap(polyg, line, { tolerance: 0.005 });
    if (overlap.features.length > 0) {
      cutPolyGeoms.push(polyg.geometry.coordinates);
    }
  }

  if (cutPolyGeoms.length == 1)
    retVal = turf.polygon(cutPolyGeoms[0], { id: id });
  else if (cutPolyGeoms.length > 1) {
    retVal = turf.multiPolygon(cutPolyGeoms, { id: id });
  }

  return retVal;
}

export const slicePolygon = (points, myField, dispatch) => {
  console.log(points);
  let polyLine = L.polyline(points);
  let polygon = L.polygon(myField);
  let geojson = polyLine.toGeoJSON();
  let geojsonPoly = polygon.toGeoJSON();
  let geomPoly = turf.getGeom(geojsonPoly);
  polygons.push(geomPoly);
  let geom = turf.getGeom(geojson);
  let line = geom;
  let upperCut = false;
  let lowerCut = false;
  polygons.forEach(function (polygon, index) {
    upperCut = cutPolygon(polygon, line, 1, 'upper');
    lowerCut = cutPolygon(polygon, line, -1, 'lower');
  });
  console.log(upperCut, lowerCut);
  if (upperCut && lowerCut) {
    upperCut = upperCut.geometry.coordinates[0].map((item) => {
      return [item[1], item[0]];
    });
    lowerCut = lowerCut.geometry.coordinates[0].map((item) => {
      return [item[1], item[0]];
    });
    let slicePolygos = [
      { coordinates: lowerCut, color: 'blue' },
      { coordinates: upperCut, color: 'blue' },
    ];
    dispatch(setSlicePolygons(slicePolygos));
  }
};
