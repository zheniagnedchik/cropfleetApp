import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import back from '../../images/icons/backArrow.svg';
import { setShowScreen } from '../../redux/showScreenAddField';
import { pests } from '../../utils/pestsArray';

import './ControlSystem.css';

const ControlSystem = (props) => {
  const [cultureArray, setCultureArray] = useState(pests);
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [className, setClassName] = useState('');
  const [selectedCulture, setSelectedCulture] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navig = useNavigate();

  const btnBack = () => {
    dispatch(setShowScreen('selectDevice', navig));
  };

  const filter = (e) => {
    setSearch(e.target.value);
    const filteredList = pests.filter(
      (i) => i.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    );
    setCultureArray(filteredList);
  };

  const backToSave = () => {
    setShowFilter(false);
    setClassName('');
  };
  const selectCulture = (item) => {
    setSelectedCulture(item);
    setShowFilter(false);
    setClassName('');
  };
  const openFilter = () => {
    setClassName('active');
    setShowFilter(true);
  };
  const solution = (
    <div className="selectSolutionContainer">
      <div>Выберите препарат</div>
      <div className="select" onClick={openFilter}>
        Выбрать
      </div>
    </div>
  );
  return (
    <div className={`myFieldItem ${className}`}>
      {!showFilter ? (
        <div>
          <div className="saveFieldHeaderContainer">
            <div>
              <img
                src={back}
                alt="img"
                className="backImgSaveField"
                onClick={btnBack}
              />
            </div>
            <div className="saveFieldHeader">{t('conrolSystem')}</div>
          </div>
          <div>{solution}</div>
        </div>
      ) : (
        <div>
          <div className="saveFieldHeaderContainer">
            <div>
              <img
                src={back}
                alt="img"
                className="backImgSaveField"
                onClick={backToSave}
              />
            </div>
            <div className="saveFieldHeader">{t('setCrop')}</div>
          </div>
          <div className="saveFieldNameContainer">
            <input
              className="saveFieldNameLabel"
              placeholder={t('searchByName')}
              value={search}
              onChange={(e) => filter(e)}
            />
          </div>
          <div className="cultureitemsContainer">
            {cultureArray.map((item, index) => (
              <div
                className="cultureItem"
                key={index}
                onClick={() => selectCulture(item.name)}
              >
                <div className="cultureLabel">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlSystem;
