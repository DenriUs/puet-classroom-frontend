import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getFullDate, showConfirm } from '../../common';

export const coursesAmount = 4;

export const columnsGroups = [
  {
    title: 'Назва',
    dataIndex: 'name',
    width: '67%',
    render: (name: string) => <span>{name}</span>,
  },
  {
    title: 'Дата створення',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '20%',
    render: (createdAt: Date) => <span>{getFullDate(createdAt)}</span>,
  },
  {
    title: 'Дата зміни',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: '20%',
    render: (updatedAt: Date) => <span>{getFullDate(updatedAt)}</span>,
  },
  {
    title: 'Дії',
    key: 'delete',
    width: '14%',
    dataIndex: 'actionsGroups',
    render: ({
      updateGroups,
      deleteGroups,
    }: {
      updateGroups: () => void;
      deleteGroups: () => void;
    }) => (
      <div className='table__icon--container'>
        <EditOutlined className='table__icon' onClick={updateGroups} />
        <DeleteOutlined
          className='table__icon'
          onClick={() => showConfirm('видалити групу', deleteGroups)}
        />
      </div>
    ),
  },
];
