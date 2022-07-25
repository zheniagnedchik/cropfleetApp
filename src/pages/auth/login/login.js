import './login.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import GogoleLogo from '../../../images/icons/google.svg';
import { GoogleAuth, login } from '../../../http/userAPI';
import { login as log } from '../../../redux/action';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_ClientID } from '../../../configs';
import { useTranslation } from 'react-i18next';
import { ButtonLoader } from '../../../utils/buttonloader/buttonLoader';
const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [loader, setLoader] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [password, setPassword] = useState();
  const setPage = () => {
    navigate('/auth?reg=1');
  };
  const enter = async () => {
    let user;
    setLoader(true);
    try {
      user = await login(email, password);
      setLoader(false);
      console.log(user);
      if (user) {
        dispatch(log({ email: email, id: user.id }));
        return navigate('/');
      } else {
        console.log(user, 'error');
      }
    } catch (e) {
      setLoader(false);
    }
  };

  const GoogleA = async (data) => {
    setGoogleLoader(true);
    try {
      const token = await GoogleAuth(data);

      setGoogleLoader(false);
      if (token) {
        return navigate('/profile');
      } else {
        console.log('Не удалось авторизироваться через гугл');
      }
    } catch (e) {
      setGoogleLoader(false);
    }
  };
  return (
    <div className="login">
      <div className="body">
        <h1>{t('enter')}</h1>

        <h3 className="enterInfo">{t('connectdata')}</h3>
        <div className="inputs">
          <input
            className="email"
            placeholder={t('email')}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            className="password"
            placeholder={t('password')}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="forget">{t('forgetPassword')}</button>
        <div className="knowMe">
          <input type="checkbox"></input>
          <h4>{t('rememberMe')}</h4>
        </div>
        <div className="noAccount">
          <h4>{t('noAccaunt')}</h4>
          <button className="regBtn" onClick={() => setPage(1)}>
            {t('reg')}
          </button>
        </div>
        <div className="buttons">
          <button className="enter" onClick={() => enter()}>
            {!loader ? t('enter') : <ButtonLoader />}
          </button>
          <GoogleLogin
            clientId={GOOGLE_ClientID}
            render={(renderProps) => (
              <div className="googleEnter border">
                {!googleLoader ? (
                  <button
                    className="googleEnter big"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img src={GogoleLogo} alt="GoogleLogo" />
                    {t('enterGoogle')}
                  </button>
                ) : (
                  <ButtonLoader />
                )}
              </div>
            )}
            onSuccess={GoogleA}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
