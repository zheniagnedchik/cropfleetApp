import React, { useEffect, useState } from 'react';
import { authRouts, publicRouts } from '../route';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { check } from '../http/userAPI';
import { login, serverReqGET, serverReqSend } from '../redux/action';
import { setShowScreen } from '../redux/showScreenAddField';

const AppRouter = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isLogin);
  useEffect(async () => {
    if (!isAuth) {
      dispatch(serverReqSend());
      const user = await check();
      dispatch(serverReqGET());
      if (user != undefined) {
        dispatch(login(user));
        console.log(isAuth);
      }
    }
  }, []);
  return (
    <Routes>
      {isAuth &&
        authRouts.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}

      {publicRouts.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
};

export default AppRouter;
