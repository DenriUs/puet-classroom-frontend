import { Layout } from 'antd';
import { useEffect } from 'react';
import { SagaAction } from '../../../common/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { useParams } from 'react-router';
import AppLoader from '../../../components/AppLoader';
import CardLecture from '../../../components/cardLecture/CardLecture';
import CourseHeader from '../../../components/courseHeader/CourseHeader';
import CourseSidebar from '../../../components/courseSidebar/CourseSidebar';
import PracticalLecture from '../../../components/practicalLecture/PracticalLecture';

import './CourseDetails.scss';

const Course = () => {
  const { id } = useParams();

  const { course } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_GET, payload: id });
  }, [dispatch]);

  if (!course) return <AppLoader />;

  return (
    <Layout>
      <CourseHeader data={course} />
      <div className='course-page-container'>
        <div className='course-page__sidebar'>
          <div className='smartphone-menu-trigger'></div>
          <CourseSidebar />
        </div>
        <div className='course-page__task'>
          <CardLecture />
          <PracticalLecture />
          <CardLecture />
          <PracticalLecture />
        </div>
      </div>
    </Layout>
  );
};

export default Course;
