import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';

import './Topics.scss';

import { getFullDate, showConfirm } from '../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { CourseTopicEntity, SagaAction } from '../../common/types';
import TopicModal from '../modals/topic/Topic';

const Topics = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courseTopics, courseTopic, course } = useAppSelector((state) => state.coursesReducer);

  const [showAddTopic, setShowCreateTopic] = useState(false);
  const [showEditTopic, setShowEditTopic] = useState(false);
  const [rowColor, setRowColor] = useState<number | undefined>();

  const dispatch = useAppDispatch();

  const onTopicClick = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPIC_GET, payload: id });
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITIES_GET, payload: id });
  };

  const handleTopicDelete = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPIC_DELETE, payload: id });
    setRowColor(undefined);
  };

  const handleCreateTopicClose = () => setShowCreateTopic(false);

  const handleCreateTopicShow = () => setShowCreateTopic(true);

  const handleEditTopicClose = () => setShowEditTopic(false);

  const handleEditTopicShow = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPIC_GET, payload: id });
    setShowEditTopic(true);
  };

  const topicsColumns: ColumnsType<CourseTopicEntity> = [
    {
      dataIndex: 'title',
      title: 'Назва',
      key: 'title',
      width: '50%',
      render: (title: string, record) => (
        <span className='topic-name' onClick={() => onTopicClick(record.id)}>
          {title}
        </span>
      ),
    },
    {
      dataIndex: 'createdAt',
      title: 'Дата створення',
      key: 'createdAt',
      width: '20%',
      render: (createdAt: Date) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
    },
    {
      dataIndex: 'updatedAt',
      title: 'Дата оновлення',
      key: 'updatedAt',
      width: '20%',
      render: (updatedAt: Date) => <span className='topic-date'>{getFullDate(updatedAt)}</span>,
    },
    {
      title: 'Дії',
      key: 'action',
      width: '5%',
      render: (_, record) => (
        <div className='topic-icon-container'>
          <EditOutlined className='topic-icons' onClick={() => handleEditTopicShow(record.id)} />
          <DeleteOutlined
            className='topic-icons'
            onClick={() => showConfirm('видалити тему', () => handleTopicDelete(record.id))}
          />
        </div>
      ),
    },
  ];

  return (
    <div className='topic-material__table_topic-container'>
      <div className='topic-material__table_title'>
        <span>Теми</span>
        <PlusOutlined className='course-material__plus-icon' onClick={handleCreateTopicShow} />
      </div>
      <Table
        pagination={{ defaultPageSize: take }}
        columns={topicsColumns}
        dataSource={courseTopics}
        rowClassName={(_, index) => (index === rowColor ? 'table-row-select' : 'table-row-default')}
        onRow={(_, rowIndex) => ({
          onClick: () => {
            setRowColor(rowIndex);
          },
        })}
      />
      <TopicModal
        id={course?.id}
        name='Додати'
        type={SagaAction.COURSES_TOPICS_CREATE}
        onStart={showAddTopic}
        handleClose={handleCreateTopicClose}
      />
      <TopicModal
        id={courseTopic?.id}
        name='Редагувати'
        type={SagaAction.COURSES_TOPIC_UPDATE}
        onStart={showEditTopic}
        handleClose={handleEditTopicClose}
        topicName={courseTopic?.title}
      />
    </div>
  );
};

export default Topics;
