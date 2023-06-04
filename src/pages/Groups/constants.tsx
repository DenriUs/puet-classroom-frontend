import { EditOutlined, TeamOutlined, DeleteOutlined } from '@ant-design/icons';
import { SpecialityEntity, getFullDate, showConfirm } from '../../common';

export const coursesAmount = 4;

export const columnsGroups = [
  {
    title: 'Назва',
    dataIndex: 'name',
    width: '33%',
    render: (name: string) => <span>{name}</span>,
  },
  {
    title: 'Назва спеціальності',
    dataIndex: 'speciality',
    width: '33%',
    render: (speciality: SpecialityEntity) => <span>{speciality.name}</span>,
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
      studentGroups,
      deleteGroups,
    }: {
      updateGroups: () => void;
      studentGroups: () => void;
      deleteGroups: () => void;
    }) => (
      <div className='table__icon--container'>
        <EditOutlined className='table__icon' onClick={updateGroups} />
        <TeamOutlined className='table__icon' onClick={studentGroups} />
        <DeleteOutlined
          className='table__icon'
          onClick={() => showConfirm('видалити групу', deleteGroups)}
        />
      </div>
    ),
  },
];
