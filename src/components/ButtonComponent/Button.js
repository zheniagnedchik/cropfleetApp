import React from 'react';
import { ButtonLoader } from '../../utils/buttonloader/buttonLoader';
import style from './Button.module.css';
export const Button = ({ text, event, loader }) => {
  return (
    <button onClick={event} className={style.button}>
      {loader ? text : <ButtonLoader />}
    </button>
  );
};
