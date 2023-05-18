import { Table } from 'antd';
import { useEffect } from 'react';

import { getUserFullName } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseScheduleColumns } from './constant';

import './CourseSchedule.scss';

const CourseSchedule = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { course, courseParticipants } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  const handleCourseStudentDelete = (id: string) => {
    dispatch({ type: SagaAction.COURSES_PARTICIPANTS_DELETE, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_PARTICIPANTS_GET, payload: course?.id });
  }, [course?.id, dispatch]);

  const courseParticipantsData = courseParticipants?.map(({ id, user }) => ({
    key: id,
    name: getUserFullName(user),
    email: user.email,
    deleteStudents: () => handleCourseStudentDelete(id),
  }));

  return (
    <div className='course-students'>
      <div className='course-students__title'>Розклад</div>
      <div className='course-students__table-container'>
        <div className='course-students__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            columns={courseScheduleColumns}
            dataSource={courseParticipantsData}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseSchedule;
