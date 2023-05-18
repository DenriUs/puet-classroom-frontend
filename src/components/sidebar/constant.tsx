import {
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

export const sidebarData = [
  {
    name: 'home',
    title: 'Головна',
    iconFilled: <HomeFilled className='sidebar__icon' />,
    iconOutlined: <HomeOutlined className='sidebar__icon' />,
  },
  {
    name: 'courses',
    title: 'Курси',
    iconFilled: <BookFilled className='sidebar__icon' />,
    iconOutlined: <BookOutlined className='sidebar__icon' />,
  },
  {
    name: 'grade',
    title: 'Журнал оцінок',
    iconFilled: <FileTextFilled className='sidebar__icon' />,
    iconOutlined: <FileTextOutlined className='sidebar__icon' />,
  },
  {
    name: 'chat',
    title: 'Зустрічі',
    iconFilled: <PhoneFilled className='sidebar__icon' />,
    iconOutlined: <PhoneOutlined className='sidebar__icon' />,
  },
  {
    name: 'settings',
    title: 'Налаштування',
    iconFilled: <SettingFilled className='sidebar__icon' />,
    iconOutlined: <SettingOutlined className='sidebar__icon' />,
  },
];
