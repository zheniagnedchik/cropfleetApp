import React from 'react';
import { Polygon } from 'react-leaflet';

const SlicedPolygons = ({ item }) => {
  console.log('item', item);
  return (
    <div>
      {item.map((item) => (
        <Polygon pathOptions={item.color} positions={item.coordinates} />
      ))}
    </div>
  );
};

export default SlicedPolygons;
