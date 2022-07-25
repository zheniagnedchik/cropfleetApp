import { host, authHost } from '.';
import jwt_decode from 'jwt-decode';
import { addTokens } from '../store/IndexedDb';

export const registration = async (user) => {
  const { data } = await host.post('/user/registration', {
    ...user,
  });

  addTokens(data.RefreshToken, data.AccesToken);

  const formData = new FormData();
  formData.append('file', user.image);
  await authHost.post('/user/file/upload?avatar=1', formData);
  return jwt_decode(data.AccesToken);
};

export const login = async (email, password) => {
  const { data } = await host.post('/user/login', { email, password });
  await addTokens(data.RefreshToken, data.AccesToken);
  const token = jwt_decode(data.AccesToken);
  // await setId(token.id);
  return token;
};

export const check = async () => {
  try {
    const res = await authHost.get('/user/auth');
    return res.data;
  } catch (e) {}
};

export const refresh = async (RefreshToken) => {
  const { data } = await host.post('/user/refresh', {
    RefreshToken: RefreshToken,
  });
  await addTokens(data.RefreshToken, data.AccesToken);

  return data;
};

export const GoogleAuth = async (req) => {
  const { data } = await host.post('/user/GoogleAuth', {
    email: req.Ju.zv,
  });
  await addTokens(data.RefreshToken, data.AccesToken);
  return data;
};

export const ConfimEmail = async (id) => {
  const { data } = await host.post('/user/confim', { secret: id });
  return data;
};

export const createApplication = async (fieldId, typeOfServise, info) => {
  authHost.post('/user/application/add', {
    fieldId: fieldId,
    typeOfService: typeOfServise,
    info: info,
  });
};

export const GetLastApplications = async () => {
  const { data } = await authHost.get('/user/application/getLast');
  return data;
};
export const getField = async (fieldId) => {
  const { data } = await authHost.post('/field/get', {
    fieldId: fieldId,
  });
  return data;
};

export const TakeApp = async (appId) => {
  const { data } = await authHost.post('/user/application/take', {
    appId: appId,
  });
  return data;
};

export const delNote = async (noteId) => {
  const { data } = await authHost.post('/field/delNote', { noteId: noteId });
  return data;
};

export const AddNote = async (name, text, fieldId) => {
  const { data } = await authHost.post('/field/addNote', {
    name: name,
    text: text,
    fieldId: fieldId,
  });
  return data;
};
