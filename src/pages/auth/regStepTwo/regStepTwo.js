import './regStepTwo.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import InputField from '../../../components/InputField/inputField';

const RegStepTwo = ({ user, setUser }) => {
  const [conpany, setCompany] = useState(user.company);
  const [FIO, setFIO] = useState(user.FIO);
  const [phone, setPhone] = useState(user.phone);
  const navigate = useNavigate();
  const [firstTime, setFirstTime] = useState(true);
  const emptyFields = conpany && FIO && phone;
  const nextStep = () => {
    if (emptyFields) {
      setUser({ ...user, company: conpany, FIO: FIO, phone: phone });
      navigate('/auth?reg=3');
    } else {
      setFirstTime(false);
    }
  };

  const Roles = [
    { name: 'Фермер', value: 'FARMER' },
    { name: 'Контактор', value: 'CONTACTOR' },
    { name: 'Консультант', value: 'ASISTENT' },
  ];

  return (
    <div>
      <div className="body">
        <div className="RegContainer">
          <h1>{t('regist')}</h1>
          <h1 className="regNumber">2</h1>
        </div>

        <div className="lineContainer">
          <div className="greyLine" />
          <div className="notGray" />
          <div className="greyLine" />
          <div className="greyLine" />
        </div>
        <p>{t('enterDataToRegist')}</p>
        <div className="fieldsContainer">
          <InputField
            firstTime={firstTime}
            plasehold={t('companyName')}
            Value={conpany}
            setValue={setCompany}
          />
          <select onChange={(event) => (user.role = event.target.value)}>
            {Roles.map((Role, index) => (
              <option key={index} value={Role.value}>
                {Role.name}
              </option>
            ))}
          </select>
          <InputField
            firstTime={firstTime}
            plasehold={t('fio')}
            value={FIO}
            setValue={setFIO}
          />

          <InputField
            firstTime={firstTime}
            plasehold={t('contactNumber')}
            value={phone}
            setValue={setPhone}
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
export default RegStepTwo;
