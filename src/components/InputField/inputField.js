import React, { useState } from 'react';
import styles from './input.module.css';
import { t } from 'i18next';

const InputField = ({ firstTime, Value, setValue, mode, plasehold }) => {
  const InputChange = (event) => {
    setValue(event.target.value);
  };
  function modeSwitch() {
    switch (mode) {
      case 'password': {
        const passwordSize = Value.length > 8;
        return (
          <div style={{ width: '100%' }}>
            <input
              className={styles.input}
              type="password"
              placeholder={plasehold}
              value={Value}
              onChange={InputChange}
            />
            <ul
              className="waring"
              style={{
                display:
                  !firstTime && !passwordSize && mode == 'password'
                    ? 'flex'
                    : 'none',
              }}
            >
              {!passwordSize ? <li>{t('smallPass')}</li> : null}
            </ul>
          </div>
        );
      }
      case 'Spassword': {
        return (
          <div style={{ width: '100%' }}>
            <input
              className={styles.input}
              type="password"
              placeholder={plasehold}
              value={Value}
              onChange={InputChange}
            />
          </div>
        );
      }
      case 'Waring': {
        return (
          <div style={{ width: '100%' }}>
            <input
              className={styles.input}
              placeholder={plasehold}
              value={Value}
              onChange={InputChange}
            />
            <ul
              className="waring"
              style={{
                display: !firstTime && !Value ? 'flex' : 'none',
              }}
            >
              {!Value ? <li>{t('emptyField')}</li> : null}
            </ul>
          </div>
        );
      }
      default: {
        return (
          <div style={{ width: '100%' }}>
            <input
              className={styles.input}
              placeholder={plasehold}
              value={Value}
              onChange={InputChange}
            />
            {/* <ul
              className="waring"
              style={{
                display: !firstTime && !Value ? 'flex' : 'none',
              }}
            >
              {!Value ? <li>{t('emptyField')}</li> : null}
            </ul> */}
          </div>
        );
      }
    }
  }

  return <div className={styles.body}>{modeSwitch()}</div>;
};

export default InputField;
