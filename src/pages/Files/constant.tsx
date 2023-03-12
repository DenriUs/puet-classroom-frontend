import { DeleteOutlined } from '@mui/icons-material';
import { getFullDate, showConfirm } from '../../common/helpers';
import { FileEntity } from '../../common/types';

export const columnsFiles = [
  {
    title: 'Назва',
    dataIndex: 'filename',
    width: '67%',
    render: (filename: string, record: FileEntity) => (
      <a href={record.src} download className='file-name'>
        {filename}
      </a>
    ),
  },
  {
    title: 'Дата завантаження',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '20%',
    render: (createdAt: Date) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
  },
  {
    title: 'Дія',
    key: 'delete',
    width: '14%',
    dataIndex: 'deleteFiles',
    render: (deleteFiles: () => void) => (
      <DeleteOutlined
        className='topic-icons'
        onClick={() => showConfirm('видалити файл', deleteFiles)}
      />
    ),
  },
];
