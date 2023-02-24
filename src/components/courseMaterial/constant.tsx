import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getFullDate, getTypeActivity, showConfirm } from '../../common/helpers';
import { CourseActivityTypeEnum } from '../../common/types';

export const topicsColumns = [
  {
    dataIndex: 'title',
    title: 'Назва',
    key: 'title',
    width: '50%',
    render: (title: string) => <span className='topic-name'>{title}</span>,
  },
  {
    dataIndex: 'createdAt',
    title: 'Дата створення',
    key: 'createdAt',
    width: '20%',
    render: (createdAt: Date) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
  },
  {
    dataIndex: 'updatedAt',
    title: 'Дата оновлення',
    key: 'updatedAt',
    width: '20%',
    render: (updatedAt: Date) => <span className='topic-date'>{getFullDate(updatedAt)}</span>,
  },
  {
    dataIndex: 'deleteTopic',
    key: 'deleteTopic',
    title: 'Дії',
    width: '10%',
    render: (deleteTopic: any) => (
      <div>
        <EditOutlined className='topic-icons' />
        <DeleteOutlined
          className='topic-icons'
          onClick={() => showConfirm('видалити тему', deleteTopic)}
        />
      </div>
    ),
  },
];

export const materialsColumns = [
  {
    dataIndex: 'title',
    title: 'Назва',
    key: 'title',
    width: '50%',
    render: (title: string) => <span className='topic-name'>{title}</span>,
  },
  {
    dataIndex: 'type',
    title: 'Тип',
    key: 'type',
    width: '10%',
    render: (type: CourseActivityTypeEnum) => (
      <span className='topic-date'>{getTypeActivity(type)}</span>
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
  {
    dataIndex: 'deleteActivities',
    title: 'Дії',
    key: 'deleteActivities',
    width: '10%',
    render: (deleteActivities: any) => (
      <div>
        <EditOutlined className='topic-icons' />
        <DeleteOutlined
          className='topic-icons'
          onClick={() => showConfirm('видалити матеріал', deleteActivities)}
        />
      </div>
    ),
  },
];
