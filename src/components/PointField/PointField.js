import React, { useState } from 'react';
import { Marker, Polygon, Polyline, useMapEvent } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { setTextHint } from '../../redux/hintsReducer';
import { movingPoint, setPoint } from '../../redux/PointsReducer';
import { mapPoint } from '../MapIcons/mapPoint';
import * as turf from '@turf/turf';
import { setShowScreen } from '../../redux/showScreenAddField';
import { useNavigate } from 'react-router';
import { t } from 'i18next';

const PointField = (props) => {
  const navig = useNavigate();
  const dispatch = useDispatch();
  const { point } = useSelector((state) => state.points);
  const [showPolygon, setShowPolygon] = useState(false);
  const lineOptions = { color: '#00c9da' };

  useMapEvent({
    click(e) {
      var foo = document.querySelectorAll(`div.mapPoint`);
      if (foo.length > 0) {
        foo[0].classList.add('active');
      }
      if (e.originalEvent.isTrusted) {
        dispatch(setPoint([e.latlng.lat, e.latlng.lng]));
        if (point.length > 0) {
          dispatch(setTextHint(t('addPoint')));
        }
        if (point.length > 2) {
          dispatch(setTextHint(t('firstPoint')));
        }
      }
      if (point.length > 1) {
        createPolygon(e);
      }
    },
  });

  const createPolygon = (e) => {
    let newArray = [...point];
    const from = turf.point(newArray[0]);
    const to = turf.point([e.latlng.lat, e.latlng.lng]);
    const options = { units: 'kilometres' };
    const distance = turf.distance(from, to, options);
    if (distance < 0.05) {
      setShowPolygon(true);
      dispatch(setShowScreen('SaveField', navig));
      dispatch(setTextHint(false));
    }
  };

  const draggableMarker = (e, index) => {
    let newPoints = [...point];
    newPoints[index] = [e.target._latlng.lat, e.target._latlng.lng];
    dispatch(movingPoint(newPoints));
  };
  return (
    <div>
      {point.map((item, index) => (
        <Marker
          key={item.toString()}
          position={item}
          icon={mapPoint}
          draggable={true}
          eventHandlers={{
            dragend(e) {
              draggableMarker(e, index);
            },
          }}
        />
      ))}
      {showPolygon ? (
        <Polygon pathOptions={lineOptions} positions={point} />
      ) : (
        <Polyline pathOptions={lineOptions} positions={point} />
      )}
    </div>
  );
};

export default PointField;
