import React, { useState } from 'react';
import './MyFieldItem.css';
import back from '../../images/icons/backArrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setShowScreen } from '../../redux/showScreenAddField';
import { setSmallMap } from '../../redux/PointsReducer';
import axios from 'axios';
import L from 'leaflet';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import backArrow from '../../images/icons/bottomArray.svg';
import { ShapeFile } from '../../utils/ShapeFile';

let ndviLayer;
let geoJson;

const MyFieldItem = (props) => {
  const navig = useNavigate();
  const { mapRef } = props;
  const dispatch = useDispatch();
  const { myField } = useSelector((state) => state.points);
  const [ndviActive, setNdviActive] = useState(false);
  const [listTile, setListStile] = useState([]);
  const [showList, setShowList] = useState(false);
  const { t } = useTranslation();
  const [selectedLayer, setSelectedLayer] = useState('Layers');

  console.log(myField);

  const btnBack = () => {
    
    dispatch(setShowScreen('MyFields', navig));
    dispatch(setSmallMap(false));
  };
  const selectDevice = () => {
    dispatch(setShowScreen('SelectDevice', navig));
  };

  const addNote = () => {
    dispatch(setShowScreen('NotePage', navig));
  };
  const getNdvi = () => {
    axios
      .get(
        `https://api.agromonitoring.com/agro/1.0/image/search?start=1609459200&end=1634123629&clouds_max=50&polyid=${myField.ndviId}&appid=1bc4d7d2b62264cf9833ac010276f2b8`
      )
      .then((data) => {
        const setList = data.data;
        for (let i = 0; i < setList.length; i++) {
          setList[i].dt = new Date(setList[i].dt * 1000).toLocaleString(
            'ru-RU',
            { day: 'numeric', month: 'short' }
          );
        }
        setListStile(setList);
        console.log(listTile);
        setNdviActive(true);
      });
  };
  const addLayerNdvi = (item) => {
    ndviLayer = L.tileLayer(`${item.tile.ndvi}&paletteid=4`).addTo(mapRef);
  };

  const selectlayer = (item) => {
    setSelectedLayer(item);

    if (ndviLayer) {
      mapRef.removeLayer(ndviLayer);
    }
    if (geoJson) {
      mapRef.removeLayer(geoJson);
    }
    setShowList(false);
    if (item === 'Agrochemical analysis') {
      const data = { data: myField.agrochemicalAnalysis };
      geoJson = ShapeFile(data, mapRef);
      geoJson.addData(data.data);
    }
    if (item === 'NDVI') {
      getNdvi();
    }
  };

  const postToWebWiew = () => {
    const test = 'complete';
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(test);
    }
    dispatch(setShowScreen('AddApplication', navig));
  };
  return (
    <div>
      {listTile.length > 0 && (
        <div className="listndvi">
          {listTile.map((item) => (
            <div
              key={item.dt.toString()}
              className="ndviItem"
              onClick={() => addLayerNdvi(item)}
            >
              {item.dt}
            </div>
          ))}
        </div>
      )}
      <div>
        <div className="btnSelectLayer" onClick={() => setShowList(!showList)}>
          <div>{selectedLayer}</div>
          <img src={backArrow} alt="img" />
        </div>
        {/* <button
          onClick={getNdvi}
          className={ndviActive ? 'ndviButtonActive' : 'ndviButton'}
        >
          NDVI
        </button> */}
      </div>
      {showList && (
        <div className="listSelectLayer">
          <div
            className="listSelectLayerItem"
            onClick={() => selectlayer('NDVI')}
          >
            NDVI
          </div>
          <div
            className="listSelectLayerItem"
            onClick={() => selectlayer('Harvest map')}
          >
            Harvest map
          </div>
          <div
            className="listSelectLayerItem"
            onClick={() => selectlayer('Agrochemical analysis')}
          >
            Agrochemical analysis
          </div>
        </div>
      )}
      <div className="myFieldItem">
        <div className="saveFieldHeaderContainer">
          <div>
            <img
              src={back}
              alt="img"
              className="backImgSaveField"
              onClick={btnBack}
            />
          </div>
          <div className="saveFieldHeader">{myField.name}</div>
        </div>
        <div className="itemFieldDescription">
          <div className="descItemContaner">
            <div className="descitemField">{t('area')}</div>
            <div className="descitemField">
              {myField.area} {t('ha')}
            </div>
          </div>
          <div className="descItemContaner">
            <div className="descitemField">{t('culture')}:</div>
            <div className="descitemField">{myField.culture}</div>
          </div>
          <div className="descItemContaner">
            <div className="descitemField">{t('address')}:</div>
            <div className="descitemField">{myField.location}</div>
          </div>
        </div>
        <div className="fieldBtnGroup">
          <div className="fieldBtn" onClick={selectDevice}>
            {t('missionStart')}
          </div>
          <div className="fieldBtn" onClick={postToWebWiew}>
            {t('addAplication')}
          </div>
          <div className="fieldBtn" onClick={addNote}>
            {t('addNote')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFieldItem;
