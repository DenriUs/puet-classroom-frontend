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
import TopicModal from '../../../components/modals/topic/Topic';
import MaterialModal from '../../../components/modals/material/Material';

import './CourseDetails.scss';

const Course = () => {
  const [showAddTopic, setShowTopic] = useState(false);
  const [showAddMaterial, setShowMaterial] = useState(false);

  const handleTopicClose = () => setShowTopic(false);
  const handleTopicShow = () => setShowTopic(true);
  const handleMaterialClose = () => setShowMaterial(false);
  const handleMaterialShow = () => setShowMaterial(true);

  const { id } = useParams();

  const { course, courseTopics, courseActivitiesLecture, courseActivitiesAssignment } =
    useAppSelector((state) => state.coursesReducer);

  const { user } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();

  const onTopicClick = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPICS_LECTURE_ACTIVITIES_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_LECTURE_ASSIGNMENT_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPIC_GET, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_GET, payload: id });
  }, [dispatch]);

  if (!course) return <AppLoader />;

  const renderedTopics = courseTopics?.map((topic) => (
    <CourseSidebar onClick={() => onTopicClick(topic.id)} key={topic.id} data={topic} />
  ));

  const renderedTopicsLecture = courseActivitiesLecture?.map((activities) => (
    <CardLecture key={activities.id} data={activities} />
  ));

  const renderedTopicsAssigment = courseActivitiesAssignment?.map((activities) => (
    <PracticalLecture key={activities.id} data={activities} />
  ));

  const renderButton = (title: string, modal: () => void) => {
    return (
      <div className='topic-empty'>
        <Empty description={<span className='empty-title'>{title}</span>} />
        {user?.role == UserRoleEnum.TEACHER && (
          <>
            <Button type='primary' shape='round' className='button-create-topic' onClick={modal}>
              Додати
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <CourseHeader />
      {courseTopics?.length == 0 ? (
        <>{renderButton('Теми відсутні', handleTopicShow)}</>
      ) : (
        <div className='course-page-container'>
          <div className='course-page__sidebar'>
            <div className='smartphone-menu-trigger'></div>
            {renderedTopics}
            {user?.role == UserRoleEnum.TEACHER && (
              <>
                <div className='button-topic-add' onClick={handleTopicShow}>
                  Додати
                </div>
              </>
            )}
          </div>
          <div className='course-page__task'>
            {!renderedTopicsLecture || !renderedTopicsAssigment ? (
              <Empty description={<span className='empty-title'>Виберіть тему</span>} />
            ) : (
              <>
                {renderedTopicsLecture?.length == 0 && renderedTopicsAssigment?.length == 0 ? (
                  <>{renderButton('Матеріал відсутній', handleMaterialShow)}</>
                ) : (
                  <>
                    {renderedTopicsLecture}
                    {renderedTopicsAssigment}
                    {user?.role == UserRoleEnum.TEACHER && (
                      <div className='box-create-activity'>
                        <div className='box-card-create-activity'>
                          <Button
                            type='primary'
                            shape='round'
                            className='button-create-activity'
                            onClick={handleMaterialShow}
                          >
                            Додати матеріал
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <TopicModal onStart={showAddTopic} handleClose={handleTopicClose} />
      <MaterialModal onStart={showAddMaterial} handleClose={handleMaterialClose} />
    </Layout>
  );
};

export default Course;
