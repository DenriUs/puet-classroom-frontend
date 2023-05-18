import { Layout, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';

import logo from '../../assets/logo.svg';
import { sidebarData } from './constant';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider breakpoint='md' collapsedWidth='0' className='sidebar' width={150}>
    <div className='sidebar__top'>
      <div className='sidebar__logo-image'>
        <img src={logo} alt='logo' />
      </div>
    </div>
    <div className='sidebar__center'>
      <ul className='sidebar__center__nav-links'>
        {sidebarData.map((sidebar) => (
          <li>
            <NavLink to={sidebar.name}>
              {({ isActive }) => (
                <Tooltip placement='rightTop' color='#254664' title={sidebar.title}>
                  {isActive ? (
                    <div className='icon-container'>{sidebar.iconFilled}</div>
                  ) : (
                    <div className='icon-container'>{sidebar.iconOutlined}</div>
                  )}
                </Tooltip>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </Sider>
);

export default Sidebar;
