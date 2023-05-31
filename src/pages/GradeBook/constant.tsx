import { Progress } from 'antd';
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
      <a
        href={record.file.src}
        target='_blank'
        className='table__title table__title--active'
        rel='noreferrer'
      >
        {activity.title}
      </a>
    ),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата здачі',
    key: 'createdAt',
    responsive: ['lg'],
    render: (createdAt) => <span>{getFullDate(createdAt)}</span>,
  },
  {
    title: 'Оцінка',
    dataIndex: 'mark',
    key: 'mark',
    responsive: ['md'],
    render: (mark: number) => <span>{!mark ? 0 : mark}</span>,
  },
  {
    dataIndex: 'staus',
    title: 'Статус',
    key: 'status',
    responsive: ['md'],
    render: (_, record) => <span>{getStatusMark(record.mark)}</span>,
  },
  {
    title: 'Відсоток',
    dataIndex: 'mark',
    key: 'progress',
    responsive: ['lg'],
    render: (mark: number) => <Progress status='normal' strokeColor='#254664' percent={mark} />,
  },
];
