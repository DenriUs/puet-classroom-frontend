import { ColumnsType } from 'antd/lib/table';
import { getFullDate, getStatusMark } from '../../common/helpers';
import { CourseActivityEntity, CoursePassedAssignmentEntity } from '../../common/types';

export const courseGradeBookColumns: ColumnsType<CoursePassedAssignmentEntity> = [
  {
    title: 'Назва',
    dataIndex: 'activity',
    key: 'activity',
    width: '55%',
    render: (activity: CourseActivityEntity, record) => (
      <a href={record.file.src} target="_blank" className='table__title table__title--active' rel="noreferrer">
        {activity.title}
      </a>
    ),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата здачі',
    key: 'createdAt',
    width: '15%',
    render: (createdAt) => <span className='table__info'>{getFullDate(createdAt)}</span>,
  },
  {
    title: 'Оцінка',
    dataIndex: 'mark',
    key: 'mark',
    width: '10%',
    render: (mark: number) => <span className='table__info'>{!mark ? 0 : mark} / 100</span>,
  },
  {
    dataIndex: 'staus',
    title: 'Статус',
    key: 'status',
    width: '10%',
    render: (_, record) => <span className='table__info'>{getStatusMark(record.mark)}</span>,
  },
];
