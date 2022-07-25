import React from 'react';
import back from '../../images/icons/backArrow.svg';
import backA from '../../images/icons/bottomArray.svg';
import dronMission from '../../images/icons/dronMission.svg';
import Draggable from 'react-draggable';
import './SelectDevice.css';
import { createLine } from '../../utils/createRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { setRoutes } from '../../redux/PointsReducer';
import { setShowScreen } from '../../redux/showScreenAddField';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import controlSystemImg from '../../images/icons/controlSystem.jpg';

const SelectDevice = (props) => {
  const { myField } = useSelector((state) => state.points);
  const navig = useNavigate();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const handleStop = (e, item) => {
    if (e.changedTouches[0].screenY < 450) {
      if (item === 'SettingMission') {
        const line = createLine(myField.coordinate, '1');
        dispatch(setRoutes(line));
      }
      dispatch(setShowScreen(item, navig));
    }
  };
  const btnBack = () => {
    dispatch(setShowScreen('showMyField', navig));
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
        <div className="saveFieldHeader">{t('selectDevice')}</div>
      </div>
      <div className="DeviceContainer">
        <div className="deviceNamelabel">{t('complex')}</div>
        <div>
          <img src={backA} alt="img" />
        </div>
      </div>
      <div className="activeDeviceContainer">
        <Draggable onStop={(e) => handleStop(e, 'SettingMission')}>
          <div className="activeDeviceItem">
            <div>
              <img src={dronMission} alt="img" />
            </div>
            <div className="labelDron"> {t('dronM')}</div>
          </div>
        </Draggable>
        <Draggable onStop={(e) => handleStop(e, 'SettingSrayer')}>
          <div className="activeDeviceItem">
            <div>
              <img src={dronMission} alt="img" />
            </div>
            <div className="labelDron">{t('dronS')}</div>
          </div>
        </Draggable>
        <Draggable onStop={(e) => handleStop(e, 'ControlSystem')}>
          <div className="activeDeviceItem">
            <div>
              <img
                src={controlSystemImg}
                alt="img"
                className="conrolSystemImg"
              />
            </div>
            <div className="labelDron">{t('conrolSystem')}</div>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default SelectDevice;
