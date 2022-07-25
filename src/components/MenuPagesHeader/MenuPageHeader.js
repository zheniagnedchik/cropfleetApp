import style from './MenuPageHeader.module.css';
import { t } from 'i18next';
import back from '../../images/icons/backArrow.svg';
export const HeaderPage = ({ children, title = 'No title', onClick }) => {
  return (
    <div className={style.Header}>
      <div
        className="saveFieldHeaderContainer"
        style={{ width: '90%' }}
        onClick={onClick}
      >
        <div>
          <img src={back} alt="img" className="backImgSaveField" />
        </div>
        <div className="saveFieldHeader">{title}</div>
      </div>
      {children}
    </div>
  );
};
