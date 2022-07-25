import React, { useState } from 'react';
import style from './EdditableField.module.css';
import Edit from '../../images/icons/edit.svg';
import Cross from '../../images/icons/cross.svg';
const EditableField = ({ Value, setValue, setUpdater }) => {
  const [isEdit, setIsEdit] = useState(false);
  const setEdit = () => {
    setIsEdit((prevState) => !prevState);
  };
  const editValue = (event) => {
    setUpdater((prevState) => !prevState);
    setValue(event.target.value);
  };

  const EditField = () => {
    if (!Value) {
      return;
    }
    if (isEdit) {
      return (
        <div className={style.ce}>
          <textarea
            className={style.area}
            maxLength="64"
            rows="2"
            value={Value}
            onChange={editValue}
          />
          <img src={Cross} width="32" onClick={setEdit} />
        </div>
      );
    } else {
      return (
        <div className={style.unActiveEdit}>
          <h3 className={style.h3}>{Value}</h3>
          <img className={style.img} src={Edit} onClick={setEdit} />
        </div>
      );
    }
  };

  return <div className={style.body}>{EditField()}</div>;
};
export default EditableField;
