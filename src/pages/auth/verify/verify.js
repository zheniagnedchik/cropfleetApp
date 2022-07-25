import React from 'react';
import style from './verify.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ConfimEmail } from '../../../http/userAPI';
export const VerifyPage = () => {
  const [params] = useSearchParams();
  const navig = useNavigate();
  const data = params.get('data');
  ConfimEmail(data).then(console.log('успех!'));
  if (!data) {
    navig('/auth');
  }
  return <div>lol</div>;
};
