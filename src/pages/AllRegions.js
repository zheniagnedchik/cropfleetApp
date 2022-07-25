import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { polyTest } from '../utils/rt';
import { Polygon } from 'react-leaflet';

const AllRegions = (props) => {
  const lineOptions = { color: '#00c9da' };
  const [items, setItems] = useState([]);
  useEffect(() => {
    const newArray = [polyTest];
    const test = newArray.map((item) => {
      const itemArray = item.map((e) => {
        const xArray = e.geometry.coordinates.map((x) => {
          const yArray = x.map((y) => {
            return [y[1], y[0]];
          });
          return yArray;
        });
        return xArray;
      });
      return itemArray;
    });
    setItems(test);
  }, [setItems]);
  console.log('original', polyTest);
  console.log('copy', items[0]);
  return (
    <div>
      {items.map((item, index) => (
        <Polygon pathOptions={lineOptions} positions={item} key={index} />
      ))}
    </div>
  );
};

export default AllRegions;
