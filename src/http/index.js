import axios from 'axios';
import { REACT_APP_API_URL } from '../configs';
import { addTokens, getAccesToken, getRefreshToken } from '../store/IndexedDb';
import { check, refresh } from './userAPI';

const host = axios.create({
  baseURL: REACT_APP_API_URL,
});

const authHost = axios.create({ baseURL: REACT_APP_API_URL });
const authInterceptor = async (config) => {
  await getAccesToken().then((token) => {
    config.headers = {
      authorization: `Bearer ${token}`,
    };
  });
  return config;
};

authHost.interceptors.response.use(undefined, async (error) => {
  try {
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      error.config._isRetry = true;

      const refres = await getRefreshToken();
      const newTokens = await refresh(refres);
      await addTokens(newTokens.RefreshToken, newTokens.AccesToken);
      const res = await check();
      error.data = res;
      return error;
    }
  } catch (e) {
    console.log('Не авторизован');
  }
});
authHost.interceptors.request.use(authInterceptor);

export { host, authHost };
