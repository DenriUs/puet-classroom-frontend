import { Empty, Layout } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAppSelector, useAppDispatch } from '../../hooks/reduxhooks';
import { SagaAction, UserRoleEnum } from '../../common/types';
import HeaderPage from '../../components/header/HeaderPage';
import Schedule from '../../components/schedule/Schedule';
import Course from '../../components/course/Course';
import CurrentActivity from '../../components/currentActivity/CurrentActivity';
import Meetings from '../../components/meetings/Meetings';

import './Home.scss';

const Home = () => {
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { user } = useAppSelector((state) => state.profileReducer);

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
      <div className='home-page'>
        <div className='home-page__name-container'>
          <span>Головна сторінка</span>
        </div>
        <div className='home-page__content-container'>
          <div className='home-page__course'>
            {courses?.length ? (
              <div className='course-card'>{renderedCourses}</div>
            ) : (
              <Empty description={<span className='empty-title'>Курси відсутні</span>} />
            )}
          </div>
          <div className='home-page__activity'>
            {user?.role === UserRoleEnum.TEACHER ? <Meetings /> : <CurrentActivity />}
            <Schedule />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
