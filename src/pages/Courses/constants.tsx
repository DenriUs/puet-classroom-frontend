import { Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface Course {
  key: string;
}

export const coursesColumns = [
  {
    dataIndex: 'name',
    key: 'name',
    width: '35%',
    render: (name: string, course: Course) => (
      <Link to={'/main/courses/' + course.key} className='course-name'>
        {name}
      </Link>
    ),
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
