import React from 'react';
import { Polygon } from 'react-leaflet';
import { useSelector } from 'react-redux';

const ShowMyFieldMap = (props) => {
  const lineOptions = { color: '#00c9da' };
  const { myField } = useSelector((state) => state.points);

  return (
    <div>
      {myField ? (
        <div>
          {myField && (
            <Polygon pathOptions={lineOptions} positions={myField.coordinate} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ShowMyFieldMap;
