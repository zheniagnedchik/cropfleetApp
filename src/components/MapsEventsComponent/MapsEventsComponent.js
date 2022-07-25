import React from 'react';
import './MapsEventsComponent.css';
import pencil from '../../images/icons/pencil.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setTextHint } from '../../redux/hintsReducer';
import { setShowScreen } from '../../redux/showScreenAddField';
import { useNavigate } from 'react-router';
import { t } from 'i18next';

const MapsEventsComponent = (props) => {
  const navig = useNavigate();
  const { showScreen } = useSelector((state) => state.showScreenAddField);
  const dispatch = useDispatch();
  const circleByHand = () => {
    dispatch(setTextHint(t('addFistPoint')));
    dispatch(setShowScreen('CloseAddFieldMode', navig));
  };

  return (
    <div className="componentContainer">
      <div
        className={
          showScreen !== 'SelectMode'
            ? 'mapsEventsContainer'
            : 'mapsEventsContainer active'
        }
      >
        <div className="mapsEventsHeader">{t('actions')}</div>
        <div className="evensContainer">
          <div>
            <img src={pencil} className="pencilImg" alt="img" />
          </div>
          <div className="eventsText" onClick={circleByHand}>
            {t('handline')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsEventsComponent;
