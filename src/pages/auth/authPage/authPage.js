import React, { Suspense, useEffect, useState } from 'react';
import LoginPage from '../login/login';
import RegStepFour from '../regStepFour/regStepFour';
import RegStepOne from '../regStepOne/regStepOne';
import RegStepThree from '../regStepThree/regStepThree';
import RegStepTwo from '../regStepTwo/regStepTwo';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import './authPage.css';
const AuthPage = () => {
  const navig = useNavigate();
  const [searchParams] = useSearchParams();
  const reg = searchParams.get('reg');
  const refId = searchParams.get('ref');
  const [user, setUser] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    role: '',
    FIO: '',
    image: '',
    phone: '',
    refId: refId,
  });
 // useEffect(() => navig('/auth'), []);
  const pageNavigator = () => {
    switch (reg) {
      case 0: {
        return <LoginPage user={user} setUser={setUser} />;
      }
      case '1': {
        return <RegStepOne user={user} setUser={setUser} />;
      }
      case '2': {
        return <RegStepTwo user={user} setUser={setUser} />;
      }
      case '3': {
        return <RegStepThree user={user} setUser={setUser} />;
      }
      case '4': {
        return <RegStepFour user={user} setUser={setUser} />;
      }
      default: {
        return <LoginPage user={user} setUser={setUser} />;
      }
    }
  };
  return (
    <div className="main">
      <div className="Container">
        <Suspense fallback={<div>Loadind...</div>}>
          <div className="auth_body">{pageNavigator()}</div>
        </Suspense>
      </div>
    </div>
  );
};
export default AuthPage;
