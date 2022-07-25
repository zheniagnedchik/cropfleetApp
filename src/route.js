import React from 'react';
import Profile from './pages/profile';
import AuthPage from './pages/auth/authPage/authPage';
import Admin from './pages/admin';
import MainPage from './pages/mainPage';
import {
  ADMIN_ROUTE,
  PROFILE_ROUTE,
  MAINPAGE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  VERIFY_ROUTE,
} from './utils/consts';
import {VerifyPage} from './pages/auth/verify/verify';

export const authRouts = [
  {
    path: ADMIN_ROUTE,
    component: <Admin />,
  },
  {
    path: PROFILE_ROUTE,
    component: <Profile />,
  },
];
export const publicRouts = [
  {
    path: LOGIN_ROUTE,
    component: <AuthPage />,
  },
  {
    path: REGISTRATION_ROUTE,
    component: <AuthPage />,
  },
  {
    path: MAINPAGE_ROUTE,
    component: <MainPage />,
  },
  {
    path: VERIFY_ROUTE,
    component: <VerifyPage/>,
  },
];
