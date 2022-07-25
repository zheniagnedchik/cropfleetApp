import React, { useEffect, useState, Suspense } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import BottomSideBar from '../components/bottomSideBar/BottomSideBar';
import AddUserOnMap from '../components/AddUserOnMap/AddUserOnMap';
import MapsEventsComponent from '../components/MapsEventsComponent/MapsEventsComponent';
import 'leaflet/dist/leaflet.css';
import './mainPage.css';
import CloseModeAddField from '../components/CloseModeAddField/CloseModeAddField';
import HintsAddField from '../components/Hints/HintsAddField';
import PointField from '../components/PointField/PointField';
import { useDispatch, useSelector } from 'react-redux';
import SaveField from '../components/SaveField/SaveField';
import MyFields from '../components/MyFields/MyFields';
import MyFieldItem from '../components/MyFieldItem/MyFieldItem';
import ShowMyFieldMap from '../components/ShowMyFieldMap/ShowMyFieldMap';
import SelectDevice from '../components/SelectDevice/SelectDevice';
import DronRoute from '../components/DronRoute/DronRoute';
import SettingMission from '../components/SettingMission/SettingMission';
import { useSearchParams } from 'react-router-dom';
import i18n from '../utils/i18n';
import Shapefile from '../utils/ShapeFile';
import MissionSideBar from '../components/MissionSideBar/MissionSideBar';
import SettingSprayer from '../components/SettingSprayer/SettingSprayer';
import { AddApplication } from '../components/AddApplication/AddApplication';
import ComponentLoader from '../utils/ComponentLoader/ComponentLoader';
import { Applictaions } from '../components/Application/Application';
import SliceComponent from '../components/SliceComponent/SliceComponent';
import SlicedPolygons from '../components/SlicedPolygons/SlicedPolygons';
import ControlSystem from '../components/ControlSystem/ConrolSystem';

import { AddNote } from '../components/AddNote/AddNote';
import { setSmallMap } from '../redux/PointsReducer';

import { host } from '../http';
import Test from './AllRegions';
import AllRegions from './AllRegions';

const MainPage = () => {
  const dispatch = useDispatch();
  const [map, setMap] = useState();
  const center = [54.65486, 27.77704];

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({ page: false });
    dispatch(setSmallMap(false));
  }, []);

  const showScreen = searchParams.get('page') || 'false';
  const { textHint } = useSelector((state) => state.hints);
  const { isLogin } = useSelector((state) => state.user);
  const { smallMap } = useSelector((state) => state.points);
  const { req } = useSelector((state) => state.user);
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const { slice, slicePolygons } = useSelector((state) => state.slice);
  const handleChange = (data) => {
    let file = data.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    host.post('/field/buffer', formData).then((data) => console.log(data));
  };

  return (
    <div>
      {/* <input type="file" onChange={handleChange} /> */}
      <Suspense fallback={<div style={{ display: 'none' }}>Loading...</div>}>
        {req ? (
          !isLogin && <AddUserOnMap mapRef={map} />
        ) : (
          <div className="load">
            <ComponentLoader />
          </div>
        )}

        {showScreen === 'CloseAddFieldMode' && <CloseModeAddField />}
        {showScreen === 'SelectMode' && <MapsEventsComponent />}
        {showScreen !== 'SelectMode' &&
          showScreen !== 'SettingMission' &&
          showScreen !== 'SettingSrayer' && <BottomSideBar mapRef={map} />}
        {showScreen === 'SettingMission' && <MissionSideBar />}
        {showScreen === 'SettingSrayer' && <MissionSideBar />}
        {showScreen === 'SaveField' && <SaveField mapRef={map} />}
        {showScreen === 'MyFields' && <MyFields mapRef={map} />}
        {showScreen === 'SelectDevice' && <SelectDevice mapRef={map} />}
        {showScreen === 'showMyField' && <MyFieldItem mapRef={map} />}
        {showScreen === 'SettingMission' && <SettingMission mapRef={map} />}
        {showScreen === 'SettingSrayer' && <SettingSprayer mapRef={map} />}
        {showScreen === 'ControlSystem' && <ControlSystem mapRef={map} />}
        {showScreen === 'AddApplication' && <AddApplication mapRef={map} />}
        {showScreen === 'Applications' && <Applictaions mapRef={map} />}
        {showScreen === 'NotePage' && <AddNote />}
        {textHint && <HintsAddField />}
      </Suspense>
      <div className={smallMap ? 'smallMap' : 'map'}>
        <MapContainer
          center={center}
          zoom={11}
          whenCreated={setMap}
          editable={true}
          style={{ height: '100%' }}
        >
          <AllRegions />
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          <DronRoute />
          {!slicePolygons && <ShowMyFieldMap />}
          {slice && !slicePolygons && <SliceComponent />}
          {slicePolygons && <SlicedPolygons item={slicePolygons} />}

          {showScreen === 'CloseAddFieldMode' && <PointField mapRef={map} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default MainPage;
