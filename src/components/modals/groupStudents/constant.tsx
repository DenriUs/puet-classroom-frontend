import { DeleteOutlined } from '@ant-design/icons';
import { showConfirm } from '../../../common/helpers';

export const groupParticipantsColumns = [
  {
    title: 'П.І.Б',
    dataIndex: 'name',
    width: '33%',
    render: (name: string) => <span>{name}</span>,
  },
  {
    title: 'Пошта',
    dataIndex: 'email',
    width: '20%',
    render: (email: string) => <span>{email}</span>,
  },
  {
    title: 'Номер телефону',
    dataIndex: 'phoneNumber',
    width: '20%',
    render: (phoneNumber: string) => <span>{phoneNumber}</span>,
  },
  {
    title: 'Дія',
    dataIndex: 'deleteStudents',
    key: 'deleteStudents',
    width: '10%',
    render: (deleteStudents: () => void) => (
      <div onClick={() => showConfirm('видалити студента', deleteStudents)}>
        <DeleteOutlined className='table__icon' />
      </div>
    ),
  },
];
