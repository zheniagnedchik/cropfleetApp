import { i } from 'mathjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { host } from '../../http';
import back from '../../images/icons/backArrow.svg';
import { setShowScreen } from '../../redux/showScreenAddField';
import * as turf from '@turf/turf';
import './MyFields.css';
import { setMyFieldPoints, setSmallMap } from '../../redux/PointsReducer';
import UserNoLoginComponent from '../UserNoLoginComponent/UserNoLoginComponent';
import ComponentLoader from '../../utils/ComponentLoader/ComponentLoader';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const MyFields = (props) => {
  const navig = useNavigate();
  const { mapRef } = props;
  const { info, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [fields, setFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isLogin) {
      setLoading(true);
      host.post('field/get_fields', { userId: info.id }).then((data) => {
        setFields(data.data);
        setLoading(false);
      });
    }
  }, [setFields]);

  const btnBack = () => {
    dispatch(setShowScreen(false, navig));
    dispatch(setMyFieldPoints(null));
    dispatch(setSmallMap(false));
  };

  const setShowFieldItem = (item) => {
    const polygon = turf.polygon([[...item.coordinate, item.coordinate[0]]]);
    const center = turf.centroid(polygon);
    mapRef.flyTo(center.geometry.coordinates);
    dispatch(setSmallMap(true));
    mapRef._onResize();
    dispatch(setShowScreen('showMyField', navig));
    dispatch(setMyFieldPoints(item));
  };

  return (
    <div className="myFieldsContainer">
      <div className="saveFieldHeaderContainer">
        <div>
          <img
            src={back}
            alt="img"
            className="backImgSaveField"
            onClick={btnBack}
          />
        </div>
        <div className="saveFieldHeader">{t('myFields')}</div>
      </div>
      {loading ? (
        <div className="loaderMyField">
          <ComponentLoader />
        </div>
      ) : (
        <div>
          {isLogin ? (
            <div>
              {fields && (
                <div className="myFieldsitemsContainer">
                  {fields.map((item) => (
                    <div
                      className="cultureItem"
                      key={item._id}
                      onClick={() => setShowFieldItem(item)}
                    >
                      <div className="cultureLabel">{item.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <UserNoLoginComponent />
          )}
        </div>
      )}
    </div>
  );
};

export default MyFields;
