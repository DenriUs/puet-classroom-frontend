import { Layout, Empty, Menu } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { BookOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import MediaQuery from 'react-responsive';

import { SagaAction } from '../../../common/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import AppLoader from '../../../components/AppLoader';
import CourseHeader from '../../../components/courseHeader/CourseHeader';
import CardMaterial from '../../../components/cardMaterial/CardMaterial';
import { getIconActivity } from '../../../common/helpers';

import './CourseDetails.scss';

const Course = () => {
  const { course, courseTopics, courseTopic, courseActivities, courseActivity } = useAppSelector(
    (state) => state.coursesReducer,
  );

  const [openKeys, setOpenKeys] = useState(['']);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const onTopicOpen = (id: string | undefined) => {
    dispatch({ type: SagaAction.COURSES_TOPIC_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITIES_GET, payload: id });
  };

  const onActivitySelect = (id: string | undefined) => {
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITY_GET, payload: id });
  };

  const onActivityFileSelect = (id: string | undefined) => {
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITY_GET, payload: id });
    window.open(courseActivity?.file.src, '_blank');
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      onTopicOpen(latestOpenKey);
    }
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_GET, payload: id });
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch({ type: SagaAction.COURSES_RESET });
    };
  }, []);

  const topicsChilder = (topicId: string) => {
    const activitiesData = courseActivities?.map(({ id, title, type }) => ({
      key: id,
      label: title,
      icon: getIconActivity(type),
    }));
    return activitiesData ? activitiesData.filter(() => courseTopic?.id === topicId) : [];
  };

  const topicsData: MenuProps['items'] = useMemo(
    () =>
      courseTopics?.map(({ id, title }) => ({
        key: id,
        label: title,
        icon: <BookOutlined />,
        children: topicsChilder(id),
      })),
    [courseTopics, courseActivities],
  );

  if (!course) return <AppLoader />;

  return (
    <Layout>
      <CourseHeader />
      {courseTopics?.length === 0 ? (
        <Empty description={<span className='empty-title'>Теми відсутні</span>} />
      ) : (
        <div className='course-page__container'>
          <div className='course-page__sidebar'>
            <MediaQuery minWidth={1000}>
              <Menu
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                mode='inline'
                items={topicsData}
                inlineIndent={40}
                onSelect={({ key }) => onActivitySelect(key)}
              />
            </MediaQuery>
            <MediaQuery maxWidth={1000}>
              <Menu
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                mode='inline'
                items={topicsData}
                inlineIndent={40}
                onSelect={({ key }) => onActivityFileSelect(key)}
              />
            </MediaQuery>
          </div>
          <MediaQuery minWidth={1000}>
            <div className='course-page__task'>
              <CardMaterial />
            </div>
          </MediaQuery>
        </div>
      )}
    </Layout>
  );
};

export default Course;
