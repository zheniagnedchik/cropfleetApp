import React, { useEffect, useState } from 'react';
import { getField, TakeApp } from '../../http/userAPI';
import style from './ApplicationInfo.module.css';
import { useDispatch } from 'react-redux';
import { setMyFieldPoints } from '../../redux/PointsReducer';
import * as turf from '@turf/turf';
import { t } from 'i18next';
import { Button } from '../ButtonComponent/Button';

export const ApplicationInfo = ({ field, mapRef }) => {
  console.log(field);
  const [fieldData, setFieldData] = useState();
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  useEffect(async () => {
    const LocalField = await getField(field.fieldId);
    setFieldData(LocalField);
    dispatch(setMyFieldPoints(LocalField));
    const polygon = turf.polygon([
      [...LocalField.coordinate, LocalField.coordinate[0]],
    ]);
    const center = turf.centroid(polygon);
    mapRef.flyTo(center.geometry.coordinates);
    mapRef._onResize();
  }, []);

  const typeOfService = [
    { val: 0, Value: `${t('agrotex')}` },
    { val: 1, Value: `${t('ferting')}` },
    { val: 2, Value: `${t('harvest')}` },
    { val: 3, Value: `${t('sedbuy')}` },
    { val: 4, Value: `${t('sowingSed')}` },
    { val: 5, Value: `${t('sowprotect')}` },
    // { val: 6, Value: `${t('')}` },
  ];

  const sendHendler = async () => {
    await TakeApp(field._id);
  };
  return (
    <div style={{ width: '100%' }}>
      <div className={style.ApplicationInfo}>
        <div className={style.ApplicationInfo__Container}>
          <div>{t('fieldName')}:</div>
          <div>{fieldData && fieldData.name}</div>
        </div>
        <div className={style.ApplicationInfo__Container}>
          <div>{t('area')}:</div>
          <div>{fieldData && fieldData.area}</div>
        </div>

        <div className={style.ApplicationInfo__Container}>
          <div>{t('fieldLocation')}:</div>
          <div>{fieldData && fieldData.location}</div>
        </div>
        <div className={style.ApplicationInfo__Container}>
          <div>{t('typeOfSevice')}:</div>
          <div>{t(field.typeOfService)}</div>
        </div>
        <div className={style.ApplicationInfo__Container}>
          <div>{t('fieldInfo')}:</div>
          <div>{field && field.info}</div>
        </div>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Button loader={loader} text={t('send')} event={sendHendler} />
      </div>
    </div>
  );
};
