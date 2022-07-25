import React, { useEffect, useState } from 'react';
import style from './MyApplications.module.css';
import back from '../../images/icons/backArrow.svg';
import { t } from 'i18next';
import { GetLastApplications } from '../../http/userAPI';
import { AppPrevComponent } from '../AppPrevComponent/AppPrevComponent';
import { ApplicationInfo } from '../ApplicationInfo/ApplicationInfo';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setShowScreen } from '../../redux/showScreenAddField';
import {
  setMyFieldPoints,
  setPoint,
  setSmallMap,
} from '../../redux/PointsReducer';
export const Applictaions = ({ mapRef }) => {
  const dispatch = useDispatch();
  const navig = useNavigate();
  const [applications, setApplicarions] = useState([]);
  const [moreInfo, setMoreInfo] = useState(false);
  const [defField, setDefField] = useState();
  useEffect(async () => {
    const app = await GetLastApplications();
    setApplicarions(app);
  }, []);

  const backHendler = () => {
    if (moreInfo) {
      setMoreInfo((prev) => !prev);
      dispatch(setMyFieldPoints(null));
    } else {
      dispatch(setShowScreen('flase', navig));
      dispatch(setSmallMap(false));
    }
  };
  return (
    <div className={style.MyApplication}>
      <div
        className="saveFieldHeaderContainer"
        style={{ width: '100%' }}
        onClick={backHendler}
      >
        <div>
          <img src={back} alt="img" className="backImgSaveField" />
        </div>
        <div className="saveFieldHeader">{t('Req')}</div>
      </div>
      {!moreInfo ? (
        <div className={style.MyApplication__container}>
          {applications &&
            applications.map((Applic) => (
              <AppPrevComponent
                key={Applic._id}
                element={Applic}
                setMoreInfo={setMoreInfo}
                setField={setDefField}
              />
            ))}
        </div>
      ) : (
        <ApplicationInfo field={defField} mapRef={mapRef} />
      )}
      {applications.length == 0 && <div className={style.Applictaion__EmptyContainer}><h3>{t('NoapplicationYet')}</h3></div>}
    </div>
  );
};
