import {
  HomeFilled,
  BookFilled,
  FileTextFilled,
  SettingFilled,
} from '@ant-design/icons';

export const coursesColumns = [
  {
    name: 'home',
    title: 'Головна',
    icon: <HomeFilled className='sidebar__icon' />,
  },
  {
    name: 'courses',
    title: 'Курси',
    icon: <BookFilled className='sidebar__icon' />,
  },
  {
    name: 'grade',
    title: 'Журнал оцінок',
    icon: <FileTextFilled className='sidebar__icon' />,
  },
  {
    name: 'settings',
    title: 'Налаштування',
    icon: <SettingFilled className='sidebar__icon' />,
  },
];
