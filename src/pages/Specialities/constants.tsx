import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getFullDate, showConfirm } from '../../common';

export const columnsSpecialities = [
  {
    title: 'Назва',
    key: 'name',
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
    key: 'actions',
    width: '14%',
    dataIndex: 'actionsSepecialities',
    render: ({
      updateSpecialities,
      deleteSpecialities,
    }: {
      updateSpecialities: () => void;
      deleteSpecialities: () => void;
    }) => (
      <div className='table__icon--container'>
        <EditOutlined className='table__icon' onClick={updateSpecialities} />
        <DeleteOutlined
          className='table__icon'
          onClick={() => showConfirm('видалити спеціальність', deleteSpecialities)}
        />
      </div>
    ),
  },
];
