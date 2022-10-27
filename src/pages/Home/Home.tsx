import { Layout } from 'antd';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxhooks';
import { useNavigate } from 'react-router';
import { SagaAction } from '../../common/types';

import './Home.scss';

import HeaderPage from '../../components/header/HeaderPage';
import Schedule from '../../components/schedule/Schedule';
import Course from '../../components/course/Course';
import CurrentActivity from '../../components/currentActivity/CurrentActivity';
import AppLoader from '../../components/AppLoader';

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
        <Schedule />
        <CurrentActivity />
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
