import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextHint } from '../../redux/hintsReducer';
import { movingPoint } from '../../redux/PointsReducer';
import arrow from '../../images/icons/arrow.svg';
import back from '../../images/icons/back.svg';
import './CloseModeAddField.css';
import { setShowScreen } from '../../redux/showScreenAddField';
import { useNavigate } from 'react-router';
import { t } from 'i18next';

const CloseModeAddField = (props) => {
  const navig = useNavigate();
  const dispatch = useDispatch();
  const { point } = useSelector((state) => state.points);
  const close = () => {
    dispatch(setShowScreen('false', navig));
    dispatch(setTextHint(false));
    dispatch(movingPoint([]));
  };
  const removeLastPoint = () => {
    let newArray = [...point];
    newArray.splice(-1, 1);
    dispatch(movingPoint(newArray));
  };
  const removeAllPoints = () => {
    dispatch(setTextHint(t('addFistPoint')));
    dispatch(movingPoint([]));
  };
  const save = () => {
    dispatch(setShowScreen('SaveField', navig));
  };
  return (
    <div>
      <div
        className={point.length <= 0 ? 'addFieldTools' : 'addFieldTools active'}
      >
        <div className="removeContour" onClick={removeAllPoints}>
         {t('del')}
        </div>
        <div className="backImgContainer" onClick={removeLastPoint}>
          <img src={back} className="backImg" alt="img" />
        </div>
        <div className="toSaveField" onClick={save}>
          <div>{t('save')}</div>
          <img src={arrow} alt="img" />
        </div>
      </div>
      <div className="CloseModeAddFieldContainer" onClick={close}>
        {t('closeEditMode')}
      </div>
    </div>
  );
};

export default CloseModeAddField;
