import {
  TeamOutlined,
  SettingOutlined,
  DatabaseOutlined,
  ReconciliationOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import CourseMaterial from '../../../components/courseMaterial/CourseMaterial';
import CourseSchedule from '../../../components/courseTimetable/CourseTimetable';
import CourseStudents from '../../../components/courseStudents/CourseStudents';
import Estimates from '../../../components/estimates/Estimates';
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
    children: [<Estimates />],
    icon: <ReconciliationOutlined />,
  },
  {
    label: 'Розклад',
    key: '4',
    children: [<CourseSchedule />],
    icon: <CalendarOutlined />,
  },
  {
    label: 'Налаштування',
    key: '5',
    children: [<SettingsCourse />],
    icon: <SettingOutlined />,
  },
];
