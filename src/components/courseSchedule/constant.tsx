import { DeleteOutlined } from '@ant-design/icons';
import { showConfirm } from '../../common/helpers';

export const courseScheduleColumns = [
  {
    title: 'День',
    dataIndex: 'name',
    key: 'name',
    width: '60%',
    render: (name: string) => <span className='table__title'>{name}</span>,
  },
  {
    title: 'Час початку пари',
    dataIndex: 'email',
    key: 'email',
    width: '30%',
    render: (email: string) => <span className='course-teacher'>{email}</span>,
  },
  {
    title: 'Час закінчення пари',
    dataIndex: 'email',
    key: 'email',
    width: '30%',
    render: (email: string) => <span className='course-teacher'>{email}</span>,
  },
  {
    title: 'Дія',
    dataIndex: 'deleteStudents',
    key: 'deleteStudents',
    width: '10%',
    render: (deleteStudents: () => void) => (
      <div onClick={() => showConfirm('видалити студента з курсу', deleteStudents)}>
        <DeleteOutlined className='file-icon' />
      </div>
    ),
  },
];
