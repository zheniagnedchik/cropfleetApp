import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import back from '../../images/icons/backArrow.svg';
import * as turf from '@turf/turf';
import './SettingMission.css';
import { setShowScreen } from '../../redux/showScreenAddField';
import ReactSwipeButton from 'react-swipe-button';
import Slider from '@mui/material/Slider';
import { setRotate } from '../../redux/PointsReducer';
import { dataMission } from '../../utils/rotate';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const SettingMission = (props) => {
  const navig = useNavigate();
  const { routes, myField } = useSelector((state) => state.points);
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();
  const [swipe, setSwipe] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const line = turf.lineString(routes[0]);
    const length = turf.length(line, { units: 'kilometers' });
    setTime(((length / 36) * 60).toFixed(0));
  }, [setTime, routes]);

  const btnBack = () => {
    dispatch(setShowScreen('SelectDevice', navig));
  };
  const onSucces = () => {
    setSwipe(true);
  };
  const rotateRoute = (e) => {
    dispatch(setRotate(String(e.target.value)));
    dataMission(myField.coordinate, String(e.target.value), dispatch);
  };

  return (
    <div className="myFieldItem">
      <div className="saveFieldHeaderContainer">
        <div>
          <img
            src={back}
            alt="img"
            className="backImgSaveField"
            onClick={btnBack}
          />
        </div>
        <div className="saveFieldHeader">{t('missionSetup')}</div>
      </div>
      <div className="missioninfoContainer">
        <div className="missionInfoItem">
          {myField.area} {t('ha')}
        </div>
        <div className="missionInfoItem">
          {time} {t('min')}
        </div>
      </div>
      <div className="sliderContainer">
        <div className="sliderLabel">{t('rotateRoutes')}</div>
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) => rotateRoute(e)}
        />
      </div>
      <div className="swipeBtn">
        {!swipe ? (
          <ReactSwipeButton
            text={t('startMission')}
            color="#00c9da"
            onSuccess={onSucces}
          />
        ) : (
          <div className="missionSucces">{t('missionProgress')}</div>
        )}
      </div>
    </div>
  );
};

export default SettingMission;
