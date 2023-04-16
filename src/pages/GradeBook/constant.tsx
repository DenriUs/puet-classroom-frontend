import { Progress } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { getFullDate } from '../../common/helpers';
import { CourseActivityEntity, CoursePassedAssignmentEntity } from '../../common/types';

export const courseGradeBookColumns: ColumnsType<CoursePassedAssignmentEntity> = [
  {
    title: 'Назва',
    dataIndex: 'activity',
    key: 'activity',
    width: '55%',
    render: (activity: CourseActivityEntity, record) => (
      <a href={record.file.src} target='_blank' className='course-name' rel='noreferrer'>
        {activity.title}
      </a>
    ),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата здачі',
    key: 'createdAt',
    responsive: ['lg'],
    render: (createdAt) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
  },
  {
    title: 'Оцінка',
    dataIndex: 'mark',
    key: 'mark',
    responsive: ['md'],
    render: (mark: number) => <span className='course-teacher'>{!mark ? 0 : mark}</span>,
  },
  {
    title: 'Відсоток',
    dataIndex: 'mark',
    key: 'progress',
    responsive: ['lg'],
    render: (mark: number) => <Progress status='normal' strokeColor='#254664' percent={mark} />,
  },
];
