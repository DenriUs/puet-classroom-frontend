import { Empty, Layout } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import './Home.scss';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxhooks';
import { SagaAction, UserRoleEnum } from '../../common/types';
import HeaderPage from '../../components/header/HeaderPage';
import Schedule from '../../components/schedule/Schedule';
import Course from '../../components/course/Course';
import CurrentActivity from '../../components/currentActivity/CurrentActivity';
import CardStatistics from '../../components/cardStatistics/CardStatistics';
import Meetings from '../../components/meetings/Meetings';

const Home = () => {
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { user } = useAppSelector((state) => state.authReducer);

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
          <CardStatistics />
        </div>
        <Schedule />
        {user?.role === UserRoleEnum.TEACHER ? <Meetings /> : <CurrentActivity />}
      </div>
      <div className='course'>
        <div className='course__title-container'>
          <p className='course__title'>Мої поточні курси</p>
        </div>
        {courses?.length ? (
          <div className='course-card'>{renderedCourses}</div>
        ) : (
          <Empty description={<span className='empty-title'>Курси відсутні</span>} />
        )}
      </div>
    </Layout>
  );
};

export default Home;
