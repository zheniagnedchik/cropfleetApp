import React from 'react';
import { useSelector } from 'react-redux';
import './HintsAddField.css';

const HintsAddField = (props) => {
  const { textHint } = useSelector((state) => state.hints);
  return <div className="hintsAddFieldContainer">{textHint}</div>;
};

export default HintsAddField;
