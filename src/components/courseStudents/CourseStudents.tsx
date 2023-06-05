import { Select, Table } from 'antd';
import { useEffect } from 'react';

import { filterOption, filterSort, getUserFullName } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseParticipantsColumns } from './constant';

import './CourseStudents.scss';

const CourseStudents = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { course, courseParticipants } = useAppSelector((state) => state.coursesReducer);
  const { students } = useAppSelector((state) => state.studentsReducer);

  const dispatch = useAppDispatch();

  const handleCourseStudentSubmit = (id: string) => {
    dispatch({
      type: SagaAction.COURSES_PARTICIPANTS_CREATE,
      payload: { course: course?.id, id },
    });
  };

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
      <div className='course-students__title'>Cтуденти</div>
      <div className='course-students__table-container'>
        <div className='course-students__form'>
          <label>Додати студента на курс</label>
          <Select
            className='grade-students-select'
            showSearch
            placeholder="Введіть призвіще та ім'я студента"
            size='large'
            optionFilterProp='children'
            filterOption={(input, option) => filterOption(input, option)}
            filterSort={(optionA, optionB) => filterSort(optionA, optionB)}
            options={(students || []).map((student) => ({
              value: student.id,
              label: getUserFullName(student),
            }))}
            onChange={(value) => {
              handleCourseStudentSubmit(value);
            }}
            onDropdownVisibleChange={() => {
              dispatch({ type: SagaAction.STUDENTS_GET });
            }}
          />
        </div>
        <div className='course-students__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            columns={courseParticipantsColumns}
            dataSource={courseParticipantsData}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseStudents;
