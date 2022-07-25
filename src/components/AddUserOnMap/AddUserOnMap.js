import React from 'react';
import './AddUserOnMap.css';
import accaunt from '../../images/icons/accaunt.svg';
import arrow from '../../images/icons/arrow.svg';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const AddUserOnMap = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="AddUserOnMap" onClick={() => navigate('/auth')}>
      <div className="accauntImgContainer">
        <img src={accaunt} className="accauntImg" alt="img" />
      </div>
      <div className="accauntText">{t('loginToSave')}</div>
      <img src={arrow} className="accauntImg" alt="img" />
    </div>
  );
};

export default AddUserOnMap;
