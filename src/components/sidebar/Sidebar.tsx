import { Layout, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';

import AppLoader from '../AppLoader';
import { useAppSelector } from '../../hooks/reduxhooks';
import { sidebarData } from './constant';

import logo from '../../assets/logo.svg';

const { Sider } = Layout;

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.profileReducer);

  if (!user) return <AppLoader />;

  return (
    <Sider breakpoint='md' collapsedWidth='0' className='sidebar' width={150}>
      <div className='sidebar__top'>
        <div className='sidebar__logo-image'>
          <img src={logo} alt='logo' />
        </div>
      </div>
      <div className='sidebar__center'>
        <ul className='sidebar__center__nav-links'>
          {sidebarData
            .filter((sidebar) => sidebar.roles.includes(user.role))
            .map((sidebar) => (
              <li key={sidebar.name}>
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
};

export default Sidebar;
