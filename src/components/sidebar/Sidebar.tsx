import puetLogo from '../../../public/puetLogo.png';
import {
  MenuOutlined,
  FileTextFilled,
  CloudFilled,
  StarFilled,
  SettingFilled,
} from '@ant-design/icons';
import { Layout } from 'antd';
import './Sidebar.scss';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider breakpoint="md" collapsedWidth="0" className="sidebar" width={340}>
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
              <MenuOutlined className="sidebar__icon" />
              <span>Курси</span>
            </a>
          </li>
          <li>
            <a>
              <FileTextFilled className="sidebar__icon" />
              <span>Журанал оцінок</span>
            </a>
          </li>
          <li>
            <a>
              <CloudFilled className="sidebar__icon" />
              <span>Архів</span>
            </a>
          </li>
          <li>
            <a>
              <StarFilled className="sidebar__icon" />
              <span>Мої файли</span>
            </a>
          </li>
          <li>
            <a>
              <SettingFilled className="sidebar__icon" />
              <span>Налаштування</span>
            </a>
          </li>
        </ul>
      </div>
    </Sider>
  );
};

export default Sidebar;
