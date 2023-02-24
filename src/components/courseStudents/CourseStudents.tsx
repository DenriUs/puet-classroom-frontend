import { Select, Table } from 'antd';
import { useEffect } from 'react';

import { getUserFullName, showConfirm, showSuccessMessage } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseParticipantsColumns } from './constant';

import './CourseStudents.scss';

const CourseStudents = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { course, courseParticipants } = useAppSelector((state) => state.coursesReducer);
  const { users } = useAppSelector((state) => state.authReducer);

  const courseId = course?.id;

  const dispatch = useAppDispatch();

  const handleCourseStudentSubmit = (id: string) => {
    dispatch({ type: SagaAction.COURSES_PARTICIPANTS_CREATE, payload: { courseId, id } });
    showSuccessMessage('Студента на курс успішно додано!');
  };

  const handleCourseStudentDelete = (id: string) => {
    dispatch({ type: SagaAction.COURSES_PARTICIPANTS_DELETE, payload: id });
    showSuccessMessage('Студента видалено з курсу!');
  };

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_PARTICIPANTS_GET, payload: course?.id });
  }, [dispatch]);

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
            placeholder='Введіть призвіще та імя студента'
            size='large'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={(users || []).map((user) => ({
              value: user.id,
              label: getUserFullName(user),
            }))}
            onChange={(value) => {
              handleCourseStudentSubmit(value);
            }}
            onDropdownVisibleChange={() => {
              dispatch({ type: SagaAction.USERS_GET });
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
