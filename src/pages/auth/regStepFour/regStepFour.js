import './regStepFour.css';
import React, { useState } from 'react';
import EditableField from '../../../components/EdditableField/EdditableField';
import DefAvatar from '../../../images/icons/defavatar.svg';
import { registration } from '../../../http/userAPI';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/action';
import { ButtonLoader } from '../../../utils/buttonloader/buttonLoader';
const RegStepFour = ({ user, setUser }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pas, setPas] = useState(user.password);
  const [company, setCompany] = useState(user.company);
  const [FIO, setFIO] = useState(user.FIO);
  const [phone, setPhone] = useState(user.phone);
  const [isNeedToEdit, setIsNeedToEdit] = useState(true);
  const [updater, setUpdater] = useState(true);
  const [loader, setLoader] = useState(false);
  if (!updater) {
    setUser({
      ...user,
      name: name,
      email: email,
      company: company,
      password: pas,
      FIO: FIO,
      phone: phone,
    });
    setUpdater((prev) => !prev);
  }
  const reg = async () => {
    try {
      setLoader(true);
      const newUser = await registration(user);
      setLoader(false);
      dispatch(login(newUser));
      navigate('/profile');
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };
  const Confim = () => {
    switch (isNeedToEdit) {
      case false: {
        return (
          <div className="unEditableInfo">
            <h3>{user.name}</h3>
            <hr />
            <h3>{company}</h3>
            <h3>{email}</h3>
          </div>
        );
      }
      default: {
        return (
          <div className="EditableInfo">
            {name ? (
              <div className="textBlock">
                <h3>{t('name')}: &nbsp; </h3>
                <EditableField
                  Value={name}
                  setValue={setName}
                  setUpdater={setUpdater}
                />
              </div>
            ) : (
              <div> </div>
            )}
            <hr size="1" />
            {email ? (
              <div className="textBlock">
                <h3>{t('email')}: &nbsp; </h3>
                <EditableField
                  Value={email}
                  setValue={setEmail}
                  setUpdater={setUpdater}
                />
              </div>
            ) : (
              <div></div>
            )}
            {company ? (
              <div className="textBlock">
                <h3>{t('companyName')}: &nbsp; </h3>
                <EditableField
                  Value={company}
                  setValue={setCompany}
                  setUpdater={setUpdater}
                />
              </div>
            ) : (
              <></>
            )}
            {FIO ? (
              <div className="textBlock">
                <h3>{t('fio')}: &nbsp; </h3>
                <EditableField
                  Value={FIO}
                  setValue={setFIO}
                  setUpdater={setUpdater}
                />
              </div>
            ) : (
              <></>
            )}
            {phone ? (
              <div className="textBlock">
                <h3>{t('phone')}: &nbsp; </h3>
                <EditableField
                  Value={phone}
                  setValue={setPhone}
                  setUpdater={setUpdater}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div>
        <div className="body">
          <div className="RegContainer">
            <h1>{t('regist')}</h1>
            <h1 className="regNumber">4</h1>
          </div>

          <div className="lineContainer">
            <div className="greyLine" />
            <div className="greyLine" />
            <div className="greyLine" />
            <div className="notGray" />
          </div>
          <h3>{t('checkData')}</h3>
          <div className="imageDiv">
            <img
              className="avatar"
              alt="avatar"
              src={user.image ? URL.createObjectURL(user.image) : DefAvatar}
            />
          </div>
          {Confim()}
          <div className="buttons">
            {!loader ? (
              <button className="enter" onClick={() => reg()}>
                {t('save')}
              </button>
            ) : (
              <button className="enter" >
                <ButtonLoader/>
              </button>
            )}
          </div>
          <div className="avatarButtons">
            {/* {!isNeedToEdit ? (
              <button onClick={() => setIsNeedToEdit(!isNeedToEdit)}>
                {t('changeData')}
              </button>
            ) : (
              <button onClick={() => setIsNeedToEdit(!isNeedToEdit)}>
                {t('cancell')}
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegStepFour;
