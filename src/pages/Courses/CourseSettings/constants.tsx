import {
  TeamOutlined,
  SettingOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import CourseMaterial from '../../../components/courseMaterial/CourseMaterial';
import CourseStudents from '../../../components/courseStudents/CourseStudents';
import SettingsCourse from '../../../components/settingsCourse/SettingsCourse';

export const tabsItems = [
  {
    label: 'Матеріали',
    key: '1',
    children: [<CourseMaterial />],
    icon: <DatabaseOutlined />,
  },
  {
    label: 'Тести',
    key: '2',
    children: [],
    icon: <FileDoneOutlined />,
  },
  {
    label: 'Студенти',
    key: '3',
    children: [<CourseStudents />],
    icon: <TeamOutlined />,
  },
  {
    label: 'Журнал оцінок',
    key: '4',
    children: [],
    icon: <ReconciliationOutlined />,
  },
  {
    label: 'Налаштування',
    key: '5',
    children: [<SettingsCourse />],
    icon: <SettingOutlined />,
  },
];
