import { Layout, Empty, Button } from 'antd';
import { useEffect, useState } from 'react';
import { SagaAction, UserRoleEnum } from '../../../common/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { useParams } from 'react-router';

import AppLoader from '../../../components/AppLoader';
import CardLecture from '../../../components/cardLecture/CardLecture';
import CourseHeader from '../../../components/courseHeader/CourseHeader';
import CourseSidebar from '../../../components/courseSidebar/CourseSidebar';
import PracticalLecture from '../../../components/practicalLecture/PracticalLecture';

import './CourseDetails.scss';

const Course = () => {
  const { course, courseTopics, courseActivities } = useAppSelector(
    (state) => state.coursesReducer,
  );

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const onTopicClick = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITIES_GET, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_GET, payload: id });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch({ type: SagaAction.COURSES_RESET });
    };
  }, []);

  if (!course) return <AppLoader />;

  const renderedTopics = courseTopics?.map((topic) => (
    <CourseSidebar onClick={() => onTopicClick(topic.id)} key={topic.id} data={topic} />
  ));

  const renderedTopicsLecture = courseActivities?.map((activities) => (
    <CardLecture key={activities.id} data={activities} />
  ));

  const renderedTopicsAssigment = courseActivities?.map((activities) => (
    <PracticalLecture key={activities.id} data={activities} />
  ));

  return (
    <Layout>
      <CourseHeader />
      {courseTopics?.length == 0 ? (
        <></>
      ) : (
        <div className='course-page-container'>
          <div className='course-page__sidebar'>
            <div className='smartphone-menu-trigger'></div>
            {renderedTopics}
          </div>
          <div className='course-page__task'>
            {!renderedTopicsLecture || !renderedTopicsAssigment ? (
              <Empty description={<span className='empty-title'>Виберіть тему</span>} />
            ) : (
              <>
                {renderedTopicsLecture?.length == 0 && renderedTopicsAssigment?.length == 0 ? (
                  <></>
                ) : (
                  <>{renderedTopicsLecture}</>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Course;
