import './regStepThree.css';
import React, { useState } from 'react';
import DefAvatar from '../../../images/icons/defavatar.svg';
import CameraImg from '../../../images/icons/camera.svg';
import Picture from '../../../images/icons/image.svg';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import { CameraComponent } from '../../../components/camera';

const RegStepThree = ({ user }) => {
  const [image, setImage] = useState(user.image);
  const [takingPhoto, setTakingPhoto] = useState(false);
  const navigate = useNavigate();
  const nextStep = () => {
    navigate('/auth?reg=4');
  };
  const makeNewPhoto = () => {
    setTakingPhoto(true);
    setImage(null);
  };

  return (
    <div>
      <div>
        <div className="RegContainer">
          <h1>{t('regist')}</h1>
          <h1 className="regNumber">3</h1>
        </div>

        <div className="lineContainer">
          <div className="greyLine" />
          <div className="greyLine" />
          <div className="notGray" />
          <div className="greyLine" />
        </div>
        {!takingPhoto ? (
          <div className="body">
            <h3>{t('loadAvat')}</h3>
            <div className="imageDiv">
              <img
                className="avatar"
                alt="avatar"
                src={image ? URL.createObjectURL(image) : DefAvatar}
              />
            </div>
            <div className="avatarButtons">
              <button>
                <input
                  type="file"
                  className="inputImg"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    user.image = e.target.files[0];
                  }}
                />
                <img src={CameraImg} alt="camera" />
                {t('lopage')}
              </button>
              <button onClick={makeNewPhoto}>
                <img src={Picture} alt="pcture" />
                {t('makecut')}
              </button>
            </div>
            <div className="buttons">
              <button className="enter" onClick={() => nextStep()}>
                {t('next')}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {!image ? (
              <CameraComponent img={setImage} className="bigAvatar" />
            ) : (
              <div className="newPhoto">
                <img
                  className="bigAvatar"
                  alt="avatar"
                  src={image ? URL.createObjectURL(image) : DefAvatar}
                />
                <div className="newPhoto__btnContainer">
                  <button
                    className="enter newPhoto__btn"
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    {t('again')}
                  </button>
                  <div className="filler" />
                  <button
                    className="enter newPhoto__btn"
                    onClick={() => {
                      setTakingPhoto(false);
                    }}
                  >
                    {t('confim')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegStepThree;
