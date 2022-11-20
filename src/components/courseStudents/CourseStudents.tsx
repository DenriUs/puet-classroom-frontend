import { Select } from 'antd';
import { useEffect } from 'react';

import { getUserFullName, showSuccessMessage } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import CourseTableStudents from './CourseTableStudents';

import './CourseStudents.scss';

const CourseStudents = () => {
  const { users } = useAppSelector((state) => state.authReducer);
  const { course } = useAppSelector((state) => state.coursesReducer);

  const courseId = course?.id;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.USERS_GET });
  }, [dispatch]);

  const handleCourseStudentSubmit = (id: string) => {
    dispatch({ type: SagaAction.COURSES_PARTICIPANTS_CREATE, payload: { courseId, id } });
    showSuccessMessage('Cтудента на курс успішно додано!');
  };

  return (
    <div className='course-students'>
      <div className='course-students__title'>Cтуденти</div>
      <div className='course-students__form'>
        <label>Додати студента на курс</label>
        <Select
          className='grade-students-select'
          showSearch
          placeholder='Виберіть студента'
          size='large'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={(users || []).map((user) => ({
            value: user.id,
            label: getUserFullName(user),
          }))}
          onChange={(value) => {
            handleCourseStudentSubmit(value);
          }}
        />
      </div>
      <div className='course-students__table'>
        <CourseTableStudents />
      </div>
    </div>
  );
};

export default CourseStudents;
