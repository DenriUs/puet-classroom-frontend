import { Layout, Progress, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './Course.scss';

import CourseStatistics from '../../components/courseStatistics/CourseStatistics';
import HeaderPage from '../../components/header/HeaderPage';

const columns = [
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
    render: (progress: number) => <Progress percent={progress}></Progress>,
  },
];
const data = [
  {
    key: '1',
    name: 'Базові поняття інформаційних мереж',
    teacher: 'Тацій Денис',
    count: '14/20',
    progress: 10,
  },
  {
    key: '2',
    name: 'Аналіз даних та прикладні пакети статистичної обробки математика',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 30,
  },
  {
    key: '3',
    name: 'Інформаційні мережі',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 50,
  },
  {
    key: '4',
    name: 'Курсовий проект з фаху (КН бакалаври)',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 60,
  },
  {
    key: '5',
    name: 'Проектування програмних систем',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 40,
  },
  {
    key: '6',
    name: 'Базові поняття інформаційних мереж',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 100,
  },
  {
    key: '7',
    name: 'Базові поняття інформаційних мереж',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 100,
  },
  {
    key: '8',
    name: 'Базові поняття інформаційних мереж',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 100,
  },
  {
    key: '9',
    name: 'Базові поняття інформаційних мереж',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 100,
  },
  {
    key: '10',
    name: 'Базові поняття інформаційних мереж',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 100,
  },
  {
    key: '11',
    name: 'Базові поняття інформаційних мереж',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 100,
  },
  {
    key: '12',
    name: 'Базові поняття інформаційних мереж',
    teacher: 'Тацій Денис',
    count: '15/30',
    progress: 100,
  },
];

const Course = () => (
  <Layout>
    <HeaderPage />
    <div className='course-page__name-container'>
      <span>Мої курси</span>
    </div>
    <CourseStatistics />
    <div className='course-page__table-container'>
      <div className='course-page__table'>
        <Table
          pagination={{
            defaultPageSize: 10,
          }}
          showHeader={false}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  </Layout>
);

export default Course;
