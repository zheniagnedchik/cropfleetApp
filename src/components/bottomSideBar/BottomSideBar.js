import React, { useEffect } from 'react';
import './BottomSideBar.css';
import plus from '../../images/icons/plus.svg';
import myFields from '../../images/icons/myFields.svg';
import myRequests from '../../images/icons/requests.svg';
import { useDispatch } from 'react-redux';
import { setShowScreen } from '../../redux/showScreenAddField';
import { setSmallMap } from '../../redux/PointsReducer';
import { useNavigate } from 'react-router';
import list from '../../images/icons/list.svg';
import reqList from '../../images/icons/reqList.svg';
import { useTranslation } from 'react-i18next';

const BottomSideBar = (props) => {
  const navig = useNavigate();
  const { mapRef } = props;
  const dispatch = useDispatch();
  const addField = () => {
    dispatch(setShowScreen('SelectMode', navig));
  };
  const toMyFields = () => {
    dispatch(setShowScreen('MyFields', navig));
    dispatch(setSmallMap(false));
    mapRef._onResize();
  };
  const myReq = () => {
    dispatch(setShowScreen('Applications', navig))
  };
  const reqst = () => {};
  const { t } = useTranslation();
  return (
    <div className="bottomSidebarContainer">
      <div className="btnAddField">
        <div onClick={addField} className="sideBarbtnContainer">
          <div>
            <img src={myRequests} className="imgBtnPlus" alt="img" />
          </div>
          <div className="sideBarbtnLabel">{t('settings')}</div>
        </div>
        <div onClick={reqst} className="sideBarbtnContainer">
          <div>
            <img src={reqList} style={{ width: 30 }} alt="img" />
          </div>
          <div className="sideBarbtnLabel">{t('ReqList')}</div>
        </div>
        <div onClick={addField} className="sideBarbtnContainer">
          <div>
            <img src={plus} className="imgBtnPlus" alt="img" />
          </div>
          <div className="sideBarbtnLabel">{t('addField')}</div>
        </div>
        <div onClick={myReq} className="sideBarbtnContainer">
          <div>
            <img src={list} style={{ width: 30 }} alt="img" />
          </div>
          <div className="sideBarbtnLabel">{t('Req')}</div>
        </div>
        <div onClick={toMyFields} className="sideBarbtnContainer">
          <div>
            <img src={myFields} className="imgBtnPlus" alt="img" />
          </div>
          <div className="sideBarbtnLabel">{t('myFields')}</div>
        </div>
      </div>
    </div>
  );
};

export default BottomSideBar;
