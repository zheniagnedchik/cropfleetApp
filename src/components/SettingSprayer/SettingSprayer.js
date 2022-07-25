import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import back from '../../images/icons/backArrow.svg';
import { setShowScreen } from '../../redux/showScreenAddField';
import toolsImg from '../../images/icons/tools.svg';
import dronMission from '../../images/icons/dronMission.svg';

import './SettingSprayer.css';
import { useTranslation } from 'react-i18next';
import { setSlice } from '../../redux/slice';

const SettingSprayer = (props) => {
  const dispatch = useDispatch();
  const navig = useNavigate();
  const [openTolls, setOpenTools] = useState(false);
  const { t } = useTranslation();
  const btnBack = () => {
    dispatch(setShowScreen('SelectDevice', navig));
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
        <div className="saveFieldHeader">{t('settingSprayer')}</div>
      </div>
      <div className="activeDeviceSprayerContainer">
        <div className="activeDeviceItemSprayer">
          <div>
            <img src={dronMission} alt="img" />
          </div>
          <div className="droneIndicator"></div>
        </div>

        <div className="activeDeviceItemSprayer">
          <div>
            <img src={dronMission} alt="img" />
          </div>
          <div className="droneIndicator"></div>
        </div>
      </div>
      <div className="sprayerToolsBtn" onClick={() => setOpenTools(!openTolls)}>
        <div>
          <img src={toolsImg} className="toolsImg" />
        </div>
      </div>
      {openTolls && (
        <div className="bgEllipseContainer">
          <div className="bgEllipse"></div>
          <div className="listTollsContainer">
            <div className="toolsImgContainer">/</div>
            <div
              className="toolsLabelContainer"
              onClick={() => dispatch(setSlice(true))}
            >
              {t('splitField')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingSprayer;
