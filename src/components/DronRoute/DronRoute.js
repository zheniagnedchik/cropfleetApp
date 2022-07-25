import React from 'react';
import { Polyline } from 'react-leaflet';
import { useSelector } from 'react-redux';

const DronRoute = (props) => {
  const { showScreen } = useSelector((state) => state.showScreenAddField);
  const lineOptions = { color: '#fff' };
  const { routes } = useSelector((state) => state.points);
  return (
    <div>
      {showScreen == 'SettingMission' ? (
        <Polyline pathOptions={lineOptions} positions={routes} />
      ) : null}
    </div>
  );
};

export default DronRoute;
