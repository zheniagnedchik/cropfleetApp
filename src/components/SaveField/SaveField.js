import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { host } from '../../http';
import back from '../../images/icons/backArrow.svg';
import { setShowScreen } from '../../redux/showScreenAddField';
import { cultures } from '../../utils/cultures';
import * as turf from '@turf/turf';
import './SaveField.css';
import { ButtonLoader } from '../../utils/buttonloader/buttonLoader';
import { useNavigate } from 'react-router';
import { t } from 'i18next';

const SaveField = (props) => {
  const [className, setClassName] = useState('');
  const [showCultures, setShowCultures] = useState(false);
  const [cultureArray, setCultureArray] = useState(cultures);
  const [selectedCulture, setSelectedCulture] = useState(false);
  const [nameField, setNameField] = useState('');
  const [search, setSearch] = useState('');
  const { point } = useSelector((state) => state.points);
  const { info } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navig = useNavigate();
  const color = 'red';
  const dispatch = useDispatch();
  useEffect(() => {
    setClassName('active');
  }, []);

  const showCulture = () => {
    setClassName('list');
    setShowCultures(true);
  };

  const filter = (e) => {
    setSearch(e.target.value);
    const filteredList = cultures.filter(
      (i) => i.label.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    );
    setCultureArray(filteredList);
  };

  const selectCulture = (item) => {
    setSelectedCulture(item);
    setShowCultures(false);
    setClassName('active');
  };

  const backToSave = () => {
    setShowCultures(false);
    setClassName('active');
  };
  const getArea = () => {
    const polygon = turf.polygon([[...point, point[0]]]);
    const area = turf.area(polygon);
    return (area / 10000).toFixed(1);
  };

  const save = async () => {
    const newPoint = point.map((i) => {
      return [i[1], i[0]];
    });
    setLoading(true);
    let ndviId = null;
    const headers = {
      'Content-Type': 'application/json',
    };
    await axios
      .post(
        'https://api.agromonitoring.com/agro/1.0/polygons?appid=1bc4d7d2b62264cf9833ac010276f2b8',
        {
          name: 'Polygon Sam',
          geo_json: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [[...newPoint, newPoint[0]]],
            },
          },
        },
        { headers: headers }
      )
      .then((data) => {
        ndviId = data.data.id;
      });
    await console.log(ndviId);
    const area = getArea();
    await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${point[0][1]},${point[0][0]}.json?access_token=pk.eyJ1IjoieWF1aGVuaWNyb3AiLCJhIjoiY2tzMjZ0c2NzMWlhZTJ2bXN4ZHJvaHhuMSJ9.Ofc9a7Yyg_4RGw2HCugHMg`
      )
      .then((data) => {
   
        if (data.status == 200) {
          host
            .post('/field/add', {
              name: nameField,
              area: area,
              coordinate: point,
              color: color,
              location: data.data.features[0].place_name,
              culture: selectedCulture,
              userId: info.id,
              ndviId: ndviId,
            })
            .then((data) => {
              if (data.status == 200) {
                setLoading(false);
                dispatch(setShowScreen('MyFields', navig));
              }
            });
        }
      });
  };
  return (
    <div className={`SaveFielContainer ${className}`}>
      {!showCultures ? (
        <div>
          <div className="saveFieldHeaderContainer">
            <div
              onClick={() =>
                dispatch(setShowScreen('CloseAddFieldMode', navig))
              }
            >
              <img src={back} alt="img" className="backImgSaveField" />
            </div>
            <div className="saveFieldHeader">{t('saveFeild')}</div>
          </div>
          <div className="saveFieldNameContainer">
            <input
              className="saveFieldNameLabel"
              placeholder={t('setFieldName')}
              value={nameField}
              onChange={(e) => setNameField(e.target.value)}
            />
          </div>
          <div className="saveFieldCultureContainer">
            <div className="saveFieldCultureLabel">{t('crop')}</div>
            {!selectedCulture ? (
              <div className="selectCulture" onClick={showCulture}>
                {t('point')}
              </div>
            ) : (
              <div className="selectCulture" onClick={showCulture}>
                {selectedCulture}
              </div>
            )}
          </div>
          <div className="saveBtnContainer" onClick={save}>
            <div className="saveBtn">
              {loading ? <ButtonLoader /> : <span>{t('save')}</span>}
            </div>
          </div>
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
            {cultureArray.map((item) => (
              <div
                className="cultureItem"
                key={item.label.toString()}
                onClick={() => selectCulture(item.label)}
              >
                <div className="cultureLabel">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveField;
