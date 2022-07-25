import React from 'react';
import sparayer from '../../images/icons/sprayer.svg';
import mission from '../../images/icons/mission.svg';
import './MissionSideBar.css';

const MissionSideBar = (props) => {
  return (
    <div className="bottomSidebarContainer">
      <div className="btnAddField ">
        <div
          // onClick={addField}
          className="sideBarbtnContainer active"
        >
          <div>
            <img src={mission} className="imgBtnPlus" alt="img" />
          </div>
          <div className="sideBarbtnLabel">Миссия</div>
        </div>
        <div
          // onClick={addField}
          className="sideBarbtnContainer"
        >
          <div>
            <img src={sparayer} className="imgBtnPlus" alt="img" />
          </div>
          <div className="sideBarbtnLabel">Опрыскивание</div>
        </div>
      </div>
    </div>
  );
};

export default MissionSideBar;
