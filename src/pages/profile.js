import React from 'react';
import { useSelector } from 'react-redux';
import ShareButtons from '../components/shareLine';
import { getRefreshToken } from '../store/IndexedDb';

const Profile = () => {
 // const { id, email } = useSelector((state) => state.user.info);
  const share = `http://localhost:3000/auth?ref=`;

  return (
    <div>
      <ShareButtons shareUrl={share} />
    </div>
  );
};

export default Profile;
