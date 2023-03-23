import { ColumnsType } from 'antd/lib/table';
import { getFullDate } from '../../common/helpers';
import { CoursePassedAssignmentEntity } from '../../common/types';

export const passedAssignmentColumns: ColumnsType<CoursePassedAssignmentEntity> = [
  {
    dataIndex: 'title',
    title: 'П.І.Б',
    key: 'title',
    width: '45%',
    render: (title) => <span className='topic-name'>{title}</span>,
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата здачі',
    key: 'createdAt',
    width: '20%',
    render: (createdAt) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
  },
  {
    dataIndex: 'mark',
    title: 'Оцінка',
    key: 'mark',
    width: '15%',
    render: (mark) => <span className='topic-date'>{mark === null ? 0 : mark} / 100</span>,
  },
  {
    dataIndex: 'staus',
    title: 'Статус',
    key: 'status',
    width: '20%',
    render: (status) => <span className='topic-date'>{status}</span>,
  },
];
