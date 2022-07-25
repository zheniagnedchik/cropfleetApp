import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import './UserNoLoginComponent.css';

const UserNoLoginComponent = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="noLoginTextContainer">
      <span style={{ color: '#00c9da' }} onClick={() => navigate('/auth')}>
        {t('toSignIn')}
      </span>{' '}
      {t('or')}{' '}
      <span
        style={{ color: '#00c9da' }}
        onClick={() => navigate('/auth?reg=1')}
      >
        {t('register')}
      </span>
      , {t('toView')}.
    </div>
  );
};

export default UserNoLoginComponent;
