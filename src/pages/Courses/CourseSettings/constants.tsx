import {
  TeamOutlined,
  SettingOutlined,
  DatabaseOutlined,
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
    label: 'Студенти',
    key: '2',
    children: [<CourseStudents />],
    icon: <TeamOutlined />,
  },
  {
    label: 'Журнал оцінок',
    key: '3',
    children: [],
    icon: <ReconciliationOutlined />,
  },
  {
    label: 'Налаштування',
    key: '4',
    children: [<SettingsCourse />],
    icon: <SettingOutlined />,
  },
];
