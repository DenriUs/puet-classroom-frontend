import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getFullDate, getTypeActivity, showConfirm } from '../../common/helpers';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';

import './Activities.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { CourseActivityEntity, CourseActivityTypeEnum, SagaAction } from '../../common/types';
import MaterialModal from '../modals/material/Material';

const Activities = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courseActivities, courseTopic } = useAppSelector((state) => state.coursesReducer);

  const [showAddMaterial, setShowAddMaterial] = useState(false);

  const dispatch = useAppDispatch();

  const handleMaterialClose = () => setShowAddMaterial(false);

  const handleMaterialShow = () => setShowAddMaterial(true);

  const handleMaterialDelete = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITY_DELETE, payload: id });
  };

  const materialsColumns: ColumnsType<CourseActivityEntity> = [
    {
      dataIndex: 'title',
      title: 'Назва',
      key: 'title',
      width: '50%',
      render: (title: string) => <span className='topic-name'>{title}</span>,
    },
    {
      dataIndex: 'type',
      title: 'Тип',
      key: 'type',
      width: '10%',
      render: (type: CourseActivityTypeEnum) => (
        <span className='topic-date'>{getTypeActivity(type)}</span>
      ),
    },
    {
      dataIndex: 'createdAt',
      title: 'Дата створення',
      key: 'createdAt',
      width: '15%',
      render: (createdAt: Date) => <span className='topic-date'>{getFullDate(createdAt)}</span>,
    },
    {
      dataIndex: 'updatedAt',
      title: 'Дата оновлення',
      key: 'updatedAt',
      width: '15%',
      render: (updatedAt: Date) => <span className='topic-date'>{getFullDate(updatedAt)}</span>,
    },
    {
      title: 'Дії',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <div>
          <EditOutlined className='topic-icons' />
          <DeleteOutlined
            className='topic-icons'
            onClick={() => showConfirm('видалити матеріал', () => handleMaterialDelete(record.id))}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className='activities__table_title'>
        <span>Матеріали</span>
        <PlusOutlined className='course-material__plus-icon' onClick={handleMaterialShow} />
      </div>
      <Table
        pagination={{ defaultPageSize: take }}
        columns={materialsColumns}
        dataSource={courseActivities}
      />
      <MaterialModal
        topic={courseTopic?.id}
        name='Додати'
        type={SagaAction.COURSES_TOPICS_ACTIVITY_CREATE}
        onStart={showAddMaterial}
        handleClose={handleMaterialClose}
      />
    </>
  );
};

export default Activities;
