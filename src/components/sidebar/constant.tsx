import {
  AuditOutlined,
  UserOutlined,
  TeamOutlined,
  BranchesOutlined,
  HomeFilled,
  HomeOutlined,
  BookFilled,
  BookOutlined,
  FileTextFilled,
  FileTextOutlined,
  SettingFilled,
  PhoneFilled,
  PhoneOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { UserRoleEnum } from '../../common';

import userFilled from '../../assets/user-filled.png';
import teamFilled from '../../assets/team-filled.png';
import branchesFilled from '../../assets/branches-filled.png';

export const sidebarData = [
  {
    name: 'teachers',
    title: 'Викладачі',
    roles: [UserRoleEnum.ADMIN],
    iconFilled: <AuditOutlined className='sidebar__icon' />,
    iconOutlined: <AuditOutlined className='sidebar__icon' />,
  },
  {
    name: 'students',
    title: 'Студенти',
    roles: [UserRoleEnum.ADMIN],
    iconFilled: <img alt='' className='sidebar__icon--small' src={userFilled} />,
    iconOutlined: <UserOutlined className='sidebar__icon' />,
  },
  {
    name: 'groups',
    title: 'Групи',
    roles: [UserRoleEnum.ADMIN],
    iconFilled: <img alt='' className='sidebar__icon--small' src={teamFilled} />,
    iconOutlined: <TeamOutlined className='sidebar__icon' />,
  },
  {
    name: 'specialities',
    title: 'Спеціальності',
    roles: [UserRoleEnum.ADMIN],
    iconFilled: <img alt='' className='sidebar__icon--normal' src={branchesFilled} />,
    iconOutlined: <BranchesOutlined className='sidebar__icon' />,
  },
  {
    name: 'home',
    title: 'Головна',
    roles: [UserRoleEnum.STUDENT, UserRoleEnum.TEACHER],
    iconFilled: <HomeFilled className='sidebar__icon' />,
    iconOutlined: <HomeOutlined className='sidebar__icon' />,
  },
  {
    name: 'courses',
    title: 'Курси',
    roles: [UserRoleEnum.STUDENT, UserRoleEnum.TEACHER],
    iconFilled: <BookFilled className='sidebar__icon' />,
    iconOutlined: <BookOutlined className='sidebar__icon' />,
  },
  {
    name: 'grade',
    title: 'Журнал оцінок',
    roles: [UserRoleEnum.STUDENT, UserRoleEnum.TEACHER],
    iconFilled: <FileTextFilled className='sidebar__icon' />,
    iconOutlined: <FileTextOutlined className='sidebar__icon' />,
  },
  {
    name: 'chat',
    title: 'Зустрічі',
    roles: [UserRoleEnum.STUDENT, UserRoleEnum.TEACHER],
    iconFilled: <PhoneFilled className='sidebar__icon' />,
    iconOutlined: <PhoneOutlined className='sidebar__icon' />,
  },
  {
    name: 'settings',
    title: 'Налаштування',
    roles: [UserRoleEnum.STUDENT, UserRoleEnum.TEACHER],
    iconFilled: <SettingFilled className='sidebar__icon' />,
    iconOutlined: <SettingOutlined className='sidebar__icon' />,
  },
];
