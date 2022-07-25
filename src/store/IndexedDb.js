import Dexie from 'dexie';

const TokenDb = new Dexie('Tokens');

TokenDb.version(1).stores({
  token: 'type,value',
});

export const addTokens = async (Ref, Ace) => {
  await TokenDb.token.clear();
  await TokenDb.token.add({ type: 'a', value: Ace });
  await TokenDb.token.add({ type: 'r', value: Ref });
  return;
};

export const getRefreshToken = async () => {
  let RefreshToken;
  await TokenDb.token.get({ type: 'r' }).then((val) => (RefreshToken = val));
  return RefreshToken.value;
};
export const getAccesToken = async () => {
  let AccesToken;
  await TokenDb.token.get({ type: 'a' }).then((val) => (AccesToken = val));
  return AccesToken.value;
};

