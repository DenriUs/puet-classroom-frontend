import { Button, Select, Table } from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { filterOption, filterSort, getUserFullName } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseParticipantsColumns } from './constant';
import { CouserStudentSchemaType } from './type';
import { courseStudentSchema } from './schemas';

import './CourseStudents.scss';

const CourseStudents = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { course, courseParticipants } = useAppSelector((state) => state.coursesReducer);
  const { students } = useAppSelector((state) => state.studentsReducer);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<CouserStudentSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(courseStudentSchema),
  });

  const dispatch = useAppDispatch();

  const handleCourseStudentSubmit = (data: CouserStudentSchemaType) => {
    dispatch({
      type: SagaAction.COURSES_PARTICIPANTS_CREATE,
      payload: { course: course?.id, id: data.studentId },
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className='course-students'>
      <div className='course-students__title'>Cтуденти</div>
      <div className='course-students__table-container'>
        <form onSubmit={handleSubmit(handleCourseStudentSubmit)}>
          <div className='course-students__form-container'>
            <div className='course-students__form'>
                <Controller
                  control={control}
                  name='studentId'
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Select
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      disabled={isSubmitting}
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
                      onDropdownVisibleChange={() => {
                        dispatch({ type: SagaAction.STUDENTS_GET });
                      }}
                    />
                  )}
                />
            </div>
            <div className='course-students__button'>
              <Button shape='round' type='primary' htmlType='submit' className='save-button'>
                Додати студента
              </Button>
            </div>
            {errors.studentId && <p className='form-error-label'>{errors.studentId.message}</p>}
          </div>
        </form>
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
