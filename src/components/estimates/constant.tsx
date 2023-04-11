import { ColumnsType } from 'antd/lib/table';
import { getFullDate } from '../../common/helpers';
import { CourseActivityEntity, CoursePassedAssignmentEntity } from '../../common/types';

export const courseGradeBookColumns: ColumnsType<CoursePassedAssignmentEntity> = [
  {
    title: 'Назва',
    dataIndex: 'activity',
    key: 'activity',
    width: '65%',
    render: (activity: CourseActivityEntity, record) => (
      <a href={record.file.src} target={'_blank'} className='course-name'>
        {activity.title}
      </a>
    ),
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата здачі',
    key: 'createdAt',
    width: '20%',
    render: (createdAt) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
  },
  {
    title: 'Оцінка',
    dataIndex: 'mark',
    key: 'mark',
    width: '15%',
    render: (mark: number) => <span className='course-teacher'>{!mark ? 0 : mark}</span>,
  },
];
