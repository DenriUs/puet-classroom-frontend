import { Layout, Empty } from 'antd';
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

  const { course, courseTopics } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_GET, payload: id });
  }, [dispatch]);

  console.log(courseTopics);
  if (!course) return <AppLoader />;

  const renderedTopics = courseTopics?.map((topic) => (
    <CourseSidebar key={topic.id} data={topic} />
  ));

  return (
    <Layout>
      <CourseHeader data={course} />
      {courseTopics?.length == 0 ? (
        <Empty description={<span className='empty-title'>Теми відсутні</span>} />
      ) : (
        <div className='course-page-container'>
          <div className='course-page__sidebar'>
            <div className='smartphone-menu-trigger'></div>
            {renderedTopics}
          </div>
          <div className='course-page__task'>
            <CardLecture />
            <PracticalLecture />
            <CardLecture />
            <PracticalLecture />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Course;
