import React from 'react';
import style from './AppPrevComponent.module.css';
import { t } from 'i18next';
export const AppPrevComponent = ({ element, setMoreInfo, setField }) => {
  var date = new Date(element.ServerDateOpen);
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();

  date = mm + '/' + dd + '/' + yyyy;
  console.log(date);
  const onClickHandler = () => {
    setMoreInfo(true);
    setField(element);
  };

  return (
    <div className={style.AppPrevComponent} onClick={onClickHandler}>
      <h4>{date}</h4>
      <h4>{t(element.typeOfService)}</h4>
    </div>
  );
};
