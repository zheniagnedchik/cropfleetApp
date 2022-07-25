import Dexie from 'dexie';

const UserDb = new Dexie('User');

UserDb.version(1).stores({
  info: '_id,id,email,refId,age',
});

export const setId = async (id) => {
  await UserDb.info.clear();
  await UserDb.info.add({ _id: 'help', id: id, email: 'null' });
  return;
};

export const getId = async () => {
  let id;
  await UserDb.info.get({ _id: 'help' }).then((val) => (id = val));
  return id.value;
};
