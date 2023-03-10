import { DeleteOutlined } from '@mui/icons-material';

export const columns = [
  {
    title: 'Назва',
    dataIndex: 'filename',
    key: 'filename',
    width: '23%',
    render: (filename: string) => <a className='file-name'>{filename}</a>,
  },
  {
    title: 'Розмір',
    dataIndex: 'size',
    key: 'size',
    width: '8%',
    render: (size: string) => <span className='file-size'>{size}</span>,
  },
  {
    title: 'Дата завантаження',
    dataIndex: 'date',
    key: 'date',
    width: '10%',
    render: (date: string) => <span className='file-date'>{date}</span>,
  },
  {
    title: 'Дія',
    key: 'delete',
    width: '8%',
    render: () => <DeleteOutlined className='topic-icons' />,
  },
];
