import React, { useState } from 'react';
import { Marker, Polyline, useMapEvents } from 'react-leaflet';
import { mapPoint } from '../MapIcons/mapPoint';

import { useDispatch, useSelector } from 'react-redux';
import { slicePolygon } from '../../utils/SlicePolygon';
let x = [];
const SliceComponent = (props) => {
  const [points, setpoints] = useState([]);
  const lineOptions = { color: '#fff' };
  const { myField } = useSelector((state) => state.points);
  const dispatch = useDispatch();

  const map = useMapEvents({
    click(e) {
      if (e.originalEvent.isTrusted) {
        setpoints((prevState) => [...prevState, [e.latlng.lat, e.latlng.lng]]);
        x.push([e.latlng.lat, e.latlng.lng]);
      }
      if (points.length >= 1) {
        slicePolygon(x, myField.coordinate, dispatch);
      }
    },
  });

  return (
    <div>
      {points.map((item) => (
        <Marker icon={mapPoint} position={item} />
      ))}
      {points.length >= 2 && (
        <Polyline pathOptions={lineOptions} positions={points} />
      )}
    </div>
  );
};

export default SliceComponent;
