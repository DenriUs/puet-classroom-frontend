import { UserOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { CourseEntity, GroupEntity } from '../../common/types';
import { getFullDate, getUserFullName } from '../../common/helpers';

export const courseStudentColumns: ColumnsType<CourseEntity> = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    width: '60%',
    render: (name: string, record) => (
      <Link to={`/main/courses/${record.id}`} className='course-name'>
        {name}
      </Link>
    ),
  },
  {
    title: 'Викладач',
    dataIndex: 'teacher',
    key: 'teacher',
    width: '20%',
    responsive: ['xl'],
    render: (_, record) => (
      <div>
        <UserOutlined /> <span className='topic-date'>{getUserFullName(record.teacher)}</span>
      </div>
    ),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата створення',
    key: 'createdAt',
    width: '20%',
    responsive: ['xl'],
    render: (createdAt: Date) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
  },
];

export const courseTeacherColumns: ColumnsType<CourseEntity> = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    width: '45%',
    render: (name: string, record) => (
      <Link to={`/main/courses/${record.id}`} className='course-name'>
        {name}
      </Link>
    ),
  },
  {
    title: 'Група',
    dataIndex: 'group',
    key: 'group',
    width: '10%',
    responsive: ['md'],
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
    responsive: ['lg'],
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
    responsive: ['xl'],
    render: (createdAt: Date) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
  },
  {
    dataIndex: 'updatedAt',
    title: 'Дата оновлення',
    key: 'updatedAt',
    width: '15%',
    responsive: ['xl'],
    render: (updatedAt: Date) => <span className='topic-date'>{getFullDate(updatedAt)}</span>,
  },
];
