import { Layout, Empty } from 'antd';
import { useEffect } from 'react';
import { CourseActivityTypeEnum, SagaAction } from '../../../common/types';
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

  const { course, courseTopics, courseTopicsActivities } = useAppSelector(
    (state) => state.coursesReducer,
  );

  const dispatch = useAppDispatch();

  const onTopicClick = (id: string) =>
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITIES_GET, payload: id });

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_GET, payload: id });
  }, [dispatch]);

  if (!course) return <AppLoader />;

  console.log(courseTopicsActivities);

  const renderedTopics = courseTopics?.map((topic) => (
    <CourseSidebar onClick={() => onTopicClick(topic.id)} key={topic.id} data={topic} />
  ));

  const renderedCourseTopics = courseTopicsActivities?.map((activities) => {
    if (activities.topic == CourseActivityTypeEnum.LECTURE) {
      return <CardLecture key={activities.id} data={activities} />;
    }
  });

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
            {courseTopicsActivities?.length == 0 ? (
              <Empty description={<span className='empty-title'>Матеріал відсутній</span>} />
            ) : (
              renderedCourseTopics
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Course;
