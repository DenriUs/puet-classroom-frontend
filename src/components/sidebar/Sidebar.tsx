import puetLogo from '../../../public/puetLogo.png';
import './Sidebar.scss';
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudIcon from '@mui/icons-material/Cloud';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo-image">
          <img src={puetLogo} alt="logo" />
        </div>
        <span className="sidebar__logo-name">Classroom</span>
      </div>
      <div className="sidebar__center">
        <ul className="sidebar__center__nav-links">
          <li>
            <a>
              <MenuIcon className="sidebar__icon" />
              <span>Курси</span>
            </a>
          </li>
          <li>
            <a>
              <DescriptionIcon className="sidebar__icon" />
              <span>Журанал оцінок</span>
            </a>
          </li>
          <li>
            <a>
              <CloudIcon className="sidebar__icon" />
              <span>Архів</span>
            </a>
          </li>
          <li>
            <a>
              <StarIcon className="sidebar__icon" />
              <span>Мої файли</span>
            </a>
          </li>
          <li>
            <a>
              <SettingsIcon className="sidebar__icon" />
              <span>Налаштування</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
