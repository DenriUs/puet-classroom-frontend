import { useEffect, useState } from 'react';
import { Button, Empty, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { materialsColumns, topicsColumns } from './constant';
import TopicModal from '../modals/topic/Topic';
import MaterialModal from '../modals/material/Material';
import { useParams } from 'react-router';

import './CourseMaterial.scss';

const CourseMaterial = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courseTopics, courseActivities } = useAppSelector((state) => state.coursesReducer);

  const [showAddTopic, setShowTopic] = useState(false);
  const [showAddMaterial, setShowMaterial] = useState(false);

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const handleTopicClose = () => setShowTopic(false);

  const handleTopicShow = () => setShowTopic(true);

  const handleMaterialClose = () => setShowMaterial(false);

  const handleMaterialShow = () => setShowMaterial(true);

  const onTopicClick = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPIC_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITIES_GET, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_GET, payload: id });
  }, [dispatch]);

  const handleTopicDelete = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPIC_DELETE, payload: id });
  };

  const handlePracticalDelete = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITY_DELETE, payload: id });
  };

  const topicsData = courseTopics?.map(({ id, title, createdAt, updatedAt }) => ({
    key: id,
    title,
    createdAt,
    updatedAt,
    deleteTopic: () => handleTopicDelete(id),
  }));

  const activitiesData = courseActivities?.map(({ id, title, type, createdAt, updatedAt }) => ({
    key: id,
    title,
    type,
    createdAt,
    updatedAt,
    deleteActivities: () => handlePracticalDelete(id),
  }));

  return (
    <>
      {courseTopics?.length == 0 ? (
        <div className='topic-empty'>
          <Empty description={<span className='empty-title'>Матеріали відсутні</span>} />
          <Button
            type='primary'
            shape='round'
            className='button-create-topic'
            onClick={handleTopicShow}
          >
            Додати
          </Button>
        </div>
      ) : (
        <div className='course-material'>
          <div className='course-material__title-container'>
            <span>Матеріали</span>
          </div>
          <div className='course-material__table_topic-container'>
            <div className='course-material__table_title'>
              <span>Теми</span>
              <PlusOutlined className='course-material__plus-icon' onClick={handleTopicShow} />
            </div>
            <Table
              pagination={{ defaultPageSize: take }}
              columns={topicsColumns}
              dataSource={topicsData}
              rowSelection={{
                type: 'radio',
                onSelect: (record) => {
                  onTopicClick(record.key);
                },
              }}
            />
          </div>
          <div className='course-material__table_material-container'>
            {!courseActivities ? (
              <div>
                <Empty description={<span className='empty-title'>Виберіть тему !</span>} />
              </div>
            ) : (
              <>
                <div className='course-material__table_title'>
                  <span>Матеріали</span>
                  <PlusOutlined
                    className='course-material__plus-icon'
                    onClick={handleMaterialShow}
                  />
                </div>
                <Table
                  pagination={{ defaultPageSize: take }}
                  columns={materialsColumns}
                  dataSource={activitiesData}
                />
              </>
            )}
          </div>
        </div>
      )}
      <TopicModal
        title='Додати тему'
        type={SagaAction.COURSES_TOPICS_CREATE}
        onStart={showAddTopic}
        handleClose={handleTopicClose}
      />
      <MaterialModal onStart={showAddMaterial} handleClose={handleMaterialClose} />
    </>
  );
};

export default CourseMaterial;
