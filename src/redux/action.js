import { SERVER_REQ_SEND, SERVER_REQ_GET } from './userReducer';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const GET_JWT = 'GET_JWT';

export const login = (user) => ({ type: 'USER_LOGIN', payload: user });
export const serverReqSend = () => {
  return function (dispatch) {
    dispatch({ type: SERVER_REQ_SEND });
  };
};
export const serverReqGET = () => {
  return function (dispatch) {
    dispatch({ type: SERVER_REQ_GET });
  };
};
export const logout = () => ({ return: 'USER_LOGOUT' });
