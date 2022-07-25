import React, { useState } from 'react';
import style from './addApplication.module.css';
import { t } from 'i18next';
import back from '../../images/icons/backArrow.svg';
import InputField from '../InputField/inputField';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonLoader } from '../../utils/buttonloader/buttonLoader';
import { Button } from '../ButtonComponent/Button';
import { useNavigate } from 'react-router';
import { setShowScreen } from '../../redux/showScreenAddField';
import { createApplication } from '../../http/userAPI';
export const AddApplication = (props) => {
  const dispatch = useDispatch();
  const navig = useNavigate();
  const [loader, setLoader] = useState(true);
  const [moreInfo, setMoreInfo] = useState();
  const [typeOfWork, setTypeOfWork] = useState(1);
  const { myField } = useSelector((state) => state.points);
  const typeOfService = [
    { val: 'agrotex', Value: `${t('agrotex')}` },
    { val: 'ferting', Value: `${t('ferting')}` },
    { val: 'harvest', Value: `${t('harvest')}` },
    { val: 'sedbuy', Value: `${t('sedbuy')}` },
    { val: 'sowingSed', Value: `${t('sowingSed')}` },
    { val: 'sowprotect', Value: `${t('sowprotect')}` },

    // { val: 6, Value: `${t('')}` },

  ];
  const GoBack = () => {
    dispatch(setShowScreen('MyFields', navig));
  };

  const Post = async () => {
    setLoader(false);
    await createApplication(myField._id, typeOfWork, moreInfo);
    setLoader(true);

    GoBack();


  };

  const selectHandler = (e) => {
    setTypeOfWork(e.target.value);
  };

  return (
    <div className={style.AddApplication}>
      <div
        className="saveFieldHeaderContainer"
        onClick={GoBack}
        style={{ width: '90%' }}
      >
        <div>
          <img src={back} alt="img" className="backImgSaveField" />
        </div>
        <div className="saveFieldHeader">{t('MakeApplication')}</div>
      </div>
      <div className={style.AddApplication__Container}>
        <div className={style.Filler} />
        <div>
          <h3>{t('name')}:</h3>
          <h4>{myField.name}</h4>
        </div>
        <div>
          <h3>{t('area')}:</h3>
          <h4>{myField.area}</h4>
        </div>
        <div>
          <h3>{t('location')}:</h3>
          <h4>{myField.location}</h4>
        </div>

        <div>
          <h3>{t('culture')}:</h3>
          <h4>{myField.culture}</h4>
        </div>
        <div>
          <h3>{t('nameofthetypeofservice')}</h3>
          <select onChange={selectHandler}>
            {typeOfService
              .map((item, index) => (
                <option
                  key={index}
                  value={item.val}
                  className={style.AddApplication__Option}
                >
                  {item.Value}
                </option>
              ))
              .reverse()}
          </select>
        </div>
        <div>
          <h3>{t('moreInfo')}:</h3>
          <InputField value={moreInfo} setValue={setMoreInfo} />
        </div>

        <div style={{ marginTop: 10 }}>
          <Button text={t('confim')} event={Post} loader={loader} />
        </div>
      </div>
    </div>
  );
};
