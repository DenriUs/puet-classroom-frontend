import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseScheduleColumns } from './constant';

import './CourseSchedule.scss';
import TimeModal from '../modals/time/Time';

const CourseSchedule = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { course, courseTimetable } = useAppSelector((state) => state.coursesReducer);

  const [showCreate, setShowCreate] = useState(false);

  const dispatch = useAppDispatch();

  const handleCreateShow = () => setShowCreate(true);

  const handleCreateClose = () => setShowCreate(false);

  const handleTimeTableDelete = (id: string) => {
    dispatch({ type: SagaAction.COURSES_TIMETABLE_DELETE, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_TIMETABLES_GET, payload: course?.id });
  }, [course?.id, dispatch]);

  const dataCourseTimeTable = courseTimetable?.map(({ id, ...rest }) => ({
    ...rest,
    deleteTime: () => handleTimeTableDelete(id),
  }));

  return (
    <div className='course-students'>
      <div className='course-students__title'>Розклад</div>
      <div className='course-students__table-container'>
        <div className='topic-material__table_title'>
          <span>Додати день</span>
          <PlusOutlined className='course-material__plus-icon' onClick={handleCreateShow} />
        </div>
        <div className='course-students__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            columns={courseScheduleColumns}
            dataSource={dataCourseTimeTable}
          />
        </div>
      </div>
      <TimeModal onStart={showCreate} handleClose={handleCreateClose} />
    </div>
  );
};

export default CourseSchedule;
