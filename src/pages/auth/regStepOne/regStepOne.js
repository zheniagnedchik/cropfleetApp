import './regStepOne.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import InputField from '../../../components/InputField/inputField';

const RegStepOne = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pas, setPas] = useState(user.password);
  const [sPas, setSPas] = useState('');
  const [firstTime, setFirstTime] = useState(true);
  const emptyFields = name && email && pas;
  const nextStep = () => {
    if (pas == sPas && pas.length > 8 && emptyFields) {
      setUser({ ...user, name: name, email: email, password: pas });
      navigate('/auth?reg=2');
    } else {
      console.log(firstTime);
      setFirstTime(false);
    }
  };

  return (
    <div>
      <div className="body">
        <div className="RegContainer">
          <h1>{t('regist')}</h1>
          <h1 className="regNumber">1</h1>
        </div>
        <div className="lineContainer">
          <div className="notGray" />
          <div className="greyLine" />
          <div className="greyLine" />
          <div className="greyLine" />
        </div>
        <p>{t('enterDataToRegist')}</p>
        <div className="fieldsContainer">
          <InputField
            firstTime={firstTime}
            plasehold={t('name')}
            Value={name}
            setValue={setName}
          />
          <InputField
            firstTime={firstTime}
            plasehold={t('email')}
            Value={email}
            setValue={setEmail}
          />
          <InputField
            firstTime={firstTime}
            plasehold={t('password')}
            mode={'password'}
            Value={pas}
            setValue={setPas}
          />
          <InputField
            firstTime={firstTime}
            plasehold={t('confimPassword')}
            mode={'Spassword'}
            Value={sPas}
            setValue={setSPas}
          />
        </div>
        <div className="buttons">
          <button className="enter" onClick={() => nextStep()}>
            {t('next')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default RegStepOne;
