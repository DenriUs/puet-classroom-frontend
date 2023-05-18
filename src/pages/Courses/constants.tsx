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
      <Link to={`/main/courses/${record.id}`} className='table__title table__title--active'>
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
        <UserOutlined /> <span className='table__info'>{getUserFullName(record.teacher)}</span>
      </div>
    ),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата створення',
    key: 'createdAt',
    width: '20%',
    responsive: ['xl'],
    render: (createdAt: Date) => <span className='table__info'>{getFullDate(createdAt)}</span>,
  },
];

export const courseTeacherColumns: ColumnsType<CourseEntity> = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    width: '45%',
    render: (name: string, record) => (
      <Link to={`/main/courses/${record.id}`} className='table__title table__title--active'>
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
        <UserOutlined /> <span className='table__info'>{group?.name}</span>
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
        <span className='table__info'>{group?.speciality?.name}</span>
      </div>
    ),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата створення',
    key: 'createdAt',
    width: '15%',
    responsive: ['xl'],
    render: (createdAt: Date) => <span className='table__info'>{getFullDate(createdAt)}</span>,
  },
  {
    dataIndex: 'updatedAt',
    title: 'Дата оновлення',
    key: 'updatedAt',
    width: '15%',
    responsive: ['xl'],
    render: (updatedAt: Date) => <span className='table__info'>{getFullDate(updatedAt)}</span>,
  },
];
