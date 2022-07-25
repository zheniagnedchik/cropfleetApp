import { t } from 'i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { delNote, AddNote as AdNote, getField } from '../../http/userAPI';
import { setMyFieldPoints } from '../../redux/PointsReducer';
import { setShowScreen } from '../../redux/showScreenAddField';
import { Button } from '../ButtonComponent/Button';
import InputField from '../InputField/inputField';
import { HeaderPage } from '../MenuPagesHeader/MenuPageHeader';
import style from './AddNote.module.css';
import Plus from '../../images/icons/blackPlus.svg';
export const AddNote = () => {
  const dispatch = useDispatch();
  const navig = useNavigate();

  const [moreInfo, setMoreInfo] = React.useState(false);
  const { myField } = useSelector((state) => state.points);
  const [localShowScreen, setLocalShowScreen] = React.useState(
    myField.notes && myField.notes.length ? 'notesScreen' : 'emptyNote'
  );
  const [loader, setLoader] = React.useState(false);
  const [name, setName] = React.useState();
  const [text, setText] = React.useState();
  const [firstTime, setFirstTime] = React.useState(true);

  const backHendler = () => {
    dispatch(setShowScreen('showMyField', navig));
  };

  const setMoreInfoHandler = (info) => {
    setMoreInfo(info);
    setLocalShowScreen('moreInfo');
  };

  const lesInfoHandler = () => {
    setLocalShowScreen('notesScreen');
  };

  const delNoteHandler = async () => {
    setLoader(true);
    dispatch(setMyFieldPoints(await delNote(moreInfo._id)));
    lesInfoHandler();
    setLoader(false);
  };

  const addNoteHandler = async () => {
    if (!name) {
      setFirstTime(false);
      return;
    }
    setLoader(true);
    dispatch(setMyFieldPoints(await AdNote(name, text, myField._id)));
    lesInfoHandler();
    setLoader(false);
    setName();
    setText();
  };

  const addNoteScreenHeandler = () => {
    setLocalShowScreen('addNote');
  };

  React.useEffect(() => {
    if (localShowScreen == 'notesScreen' && myField && !myField.notes.length) {
      setLocalShowScreen('emptyNote');
    }
    if (localShowScreen == 'addNote') {
      setFirstTime(true);
    }
  }, [localShowScreen]);

  const setShowScreenFunc = () => {
    switch (localShowScreen) {
      case 'notesScreen': {
        return (
          <div>
            {myField &&
              myField.notes.map((note, index) => (
                <div
                  key={index}
                  className={style.Note__Notes}
                  onClick={() => setMoreInfoHandler(note)}
                >
                  <h4>{note.name}</h4>
                </div>
              ))}
            <div
              onClick={addNoteScreenHeandler}
              className={style.Note__AddNotesContainer}
            >
              <h3 className={style.Note__Addnotes}>{t('addNote')}</h3>
              <img src={Plus} className={style.Note__BlackPlus} />
            </div>
          </div>
        );
      }
      case 'moreInfo': {
        return (
          <div className={style.Note__MoreInfo}>
            <h2>{t('noteName')}</h2>
            <h3>{moreInfo.name || t('fieldIsEmpty')}</h3>
            <h2>{t('noteText')}</h2>
            <h4>{moreInfo.text || t('fieldIsEmpty')}</h4>
            <Button
              event={delNoteHandler}
              loader={!loader}
              text={t('delNote')}
            />
          </div>
        );
      }
      case 'addNote': {
        return (
          <div className={style.Note__AddNote}>
            <div>
              <h3>{t('noteName')}</h3>
              <InputField
                Value={name}
                setValue={setName}
                mode={'Waring'}
                firstTime={firstTime}
              />
            </div>
            <div>
              <h3>{t('noteText')}</h3>
              <InputField
                Value={text}
                setValue={setText}
                mode={'Waring'}
                firstTime={firstTime}
              />
            </div>
            <Button
              text={t('addNoteBtn')}
              event={addNoteHandler}
              loader={!loader}
            />
          </div>
        );
      }
      case 'emptyNote': {
        return (
          <div className={style.Note__NoNotes} onClick={addNoteScreenHeandler}>
            <h3>{t('EmptyNote')}</h3>
            <img src={Plus} className={style.Note__BlackPlus} />
          </div>
        );
      }
    }
  };
  return (
    <HeaderPage
      title={'back'}
      onClick={localShowScreen == 'notesScreen' ? backHendler : lesInfoHandler}
    >
      <div className={style.Note__Container}>{setShowScreenFunc()}</div>
    </HeaderPage>
  );
};
