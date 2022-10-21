import { Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const coursesColumns = [
  {
    dataIndex: 'name',
    key: 'name',
    width: '35%',
    render: (name: string) => <a className='course-name'>{name}</a>,
  },
  {
    dataIndex: 'teacher',
    key: 'teacher',
    width: '14%',
    render: (teacher: string) => (
      <div>
        <UserOutlined /> <span className='course-teacher'>{teacher}</span>
      </div>
    ),
  },
  {
    dataIndex: 'count',
    key: 'count',
    width: '10%',
    render: (count: string) => <span className='course-count'>{count}</span>,
  },
  {
    dataIndex: 'progress',
    key: 'progress',
    width: '10%',
    render: (progress: number) => <Progress percent={progress} />,
  },
];
