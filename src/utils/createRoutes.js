import { FlightRoutePlanner, Point, Polygon } from 'yauheni-create-route/lib';

let markerPoints = [];
let polygon;
let polylines = [];
let space = 30;
let polyline = [];

export function createLine(coordinates, newRotate) {
  let rotate = '';
  if (newRotate == '0') {
    rotate = '1';
  } else {
    rotate = newRotate;
  }
  markerPoints = coordinates.map((i) => {
    if (i) {
      return new Point(i[0], i[1]);
    }
  });
  console.log(markerPoints);
  polygon = createPolygon();
  polyline = createRoute(rotate);
  console.log(polyline);
  return polyline;
}

function createPolygon() {
  return new Polygon([].concat(markerPoints));
}

function createRoute(rotate) {
  console.log(polygon);
  polylines = FlightRoutePlanner.planForConcavePolygon2(
    polygon,
    space,
    parseInt(rotate)
  );
  polyline = polylines.map((i) => {
    if (i) {
      const x = [i.lat, i.lng];
      return x;
    }
  });
  return [polyline];
}
