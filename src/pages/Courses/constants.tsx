import { Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CourseEntity, CourseParticipantEntity, GroupEntity } from '../../common/types';
import type { ColumnsType } from 'antd/es/table';
import { getFullDate } from '../../common/helpers';

interface Course {
  key: string;
}

export const courseStudentColumns = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    width: '35%',
    render: (name: string, key: Course) => (
      <Link to={'/main/courses/' + key} className='course-name'>
        {name}
      </Link>
    ),
  },
  {
    title: 'Викладач',
    dataIndex: 'teacher',
    key: 'teacher',
    width: '14%',
    render: (teacher: string) => (
      <div>
        <UserOutlined /> <span className='course-teacher'>{teacher}</span>
      </div>
    ),
  },
  {
    title: 'Завдання',
    dataIndex: 'count',
    key: 'count',
    width: '10%',
    render: (count: string) => <span className='course-count'>{count}</span>,
  },
  {
    title: 'Прогрес',
    dataIndex: 'progress',
    key: 'progress',
    width: '10%',
    render: (progress: number) => <Progress percent={progress} />,
  },
];

export const courseTeacherColumns: ColumnsType<CourseEntity> = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    width: '45%',
    render: (name: string, record) => (
      <Link to={'/main/courses/' + record.id} className='course-name'>
        {name}
      </Link>
    ),
  },
  {
    title: 'Група',
    dataIndex: 'group',
    key: 'group',
    width: '10%',
    render: (group: GroupEntity) => (
      <div>
        <UserOutlined /> <span className='course-teacher'>{group?.name}</span>
      </div>
    ),
  },
  {
    title: 'Спеціальність',
    dataIndex: 'group',
    key: 'group',
    width: '15%',
    render: (group: GroupEntity) => (
      <div>
        <span className='course-teacher'>{group?.speciality?.name}</span>
      </div>
    ),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата створення',
    key: 'createdAt',
    width: '15%',
    render: (createdAt: Date) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
  },
  {
    dataIndex: 'updatedAt',
    title: 'Дата оновлення',
    key: 'updatedAt',
    width: '15%',
    render: (updatedAt: Date) => <span className='topic-date'>{getFullDate(updatedAt)}</span>,
  },
];
