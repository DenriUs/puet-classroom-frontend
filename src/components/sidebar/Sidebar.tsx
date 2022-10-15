import {
  HomeFilled,
  BookFilled,
  FileTextFilled,
  StarFilled,
  SettingFilled,
} from '@ant-design/icons';
import { Layout } from 'antd';

import './Sidebar.scss';

import puetLogo from '../../assets/puetLogo.png';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider breakpoint='md' collapsedWidth='0' className='sidebar' width={320}>
    <div className='sidebar__top'>
      <div className='sidebar__logo-image'>
        <img src={puetLogo} alt='logo' />
      </div>
      <span className='sidebar__logo-name'>Classroom</span>
    </div>
    <div className='sidebar__center'>
      <ul className='sidebar__center__nav-links'>
        <li>
          <a href='*'>
            <div className='icon-container'>
              <HomeFilled className='sidebar__icon' />
            </div>
            <span className='sidebar-title'>Головна</span>
          </a>
        </li>
        <li>
          <a href='*'>
            <div className='icon-container'>
              <BookFilled className='sidebar__icon' />
            </div>
            <span className='sidebar-title'>Курси</span>
          </a>
        </li>
        <li>
          <a href='*'>
            <div className='icon-container'>
              <FileTextFilled className='sidebar__icon' />
            </div>
            <span className='sidebar-title'>Журанал оцінок</span>
          </a>
        </li>
        <li>
          <a href='*'>
            <div className='icon-container'>
              <StarFilled className='sidebar__icon' />
            </div>
            <span className='sidebar-title'>Мої файли</span>
          </a>
        </li>
        <li>
          <a href='*'>
            <div className='icon-container'>
              <SettingFilled className='sidebar__icon' />
            </div>
            <span className='sidebar-title'>Налаштування</span>
          </a>
        </li>
      </ul>
    </div>
  </Sider>
);

export default Sidebar;
