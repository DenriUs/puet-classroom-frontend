import { Layout } from 'antd';
import { useEffect } from 'react';
import { Column, Liquid } from '@ant-design/plots';

import './Home.scss';

import HeaderPage from '../../components/header/HeaderPage';
import Schedule from '../../components/schedule/Schedule';
import Course from '../../components/course/Course';
import CardStatistics from '../../components/cardStatistics/CardStatistics';
import CurrentActivity from '../../components/currentActivity/CurrentActivity';
import { SagaAction } from '../../common/types';
import AppLoader from '../../components/AppLoader';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxhooks';
import { useNavigate } from 'react-router';

const data = [
  {
    type: 'ПН',
    sales: 38,
  },
  {
    type: 'ВТ',
    sales: 52,
  },
  {
    type: 'СР',
    sales: 61,
  },
  {
    type: 'ЧТ',
    sales: 145,
  },
  {
    type: 'ПТ',
    sales: 48,
  },
  {
    type: 'СБ',
    sales: 38,
  },
  {
    type: 'НД',
    sales: 38,
  },
];

const configColumn = {
  data,
  height: 250,
  xField: 'type',
  yField: 'sales',
  columnStyle: {
    radius: [10, 10, 0, 0],
  },
  yAxis: {
    label: {
      style: {
        opacity: 0,
      },
      autoHide: true,
      autoRotate: false,
    },
  },
  xAxis: {
    label: {
      style: {
        opacity: 1,
      },
      autoHide: true,
      autoRotate: false,
    },
  },
};

const configLiquid = {
  percent: 0.25,
  height: 250,
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
};

const Home = () => {
  const { courses } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onCourseClick = (id: string) => navigate(`/main/courses/${id}`);

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_GET });
  }, [dispatch]);

  const renderedCourses = courses?.map((course) => (
    <Course onClick={() => onCourseClick(course.id)} key={course.id} data={course} />
  ));

  return (
    <Layout>
      <HeaderPage />
      <div className='home-page__name-container'>
        <span>Головна сторінка</span>
      </div>
      <div className='home-page'>
        <div className='container-statistics'>
          <div className='container-statistics-cards'>
            <CardStatistics />
          </div>
          <div className='container-statistics-schedule'>
            <CurrentActivity />
          </div>
        </div>
        <div className='container-chart'>
          <div className='home-page-column'>
            <span className='column-name'>CТУДЕНСЬКА АКТИВНІСТЬ</span>
            <Column {...configColumn} />
          </div>
          <div className='home-page-liquid'>
            <span className='liquid-name'>ПРОГРЕС СЕМЕСТРУ</span>
            <Liquid {...configLiquid} />
          </div>
          <Schedule />
        </div>
      </div>
      <div className='course'>
        <div className='course__title-container'>
          <p className='course__title'>Мої поточні курси</p>
        </div>
        {courses ? <div className='course-card'>{renderedCourses}</div> : <AppLoader />}
      </div>
    </Layout>
  );
};

export default Home;
