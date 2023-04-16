import { Layout, Select, Table } from 'antd';
import { useEffect, useState } from 'react';

import { filterOption, filterSort, getUserFullName } from '../../common/helpers';
import { SagaAction, UserRoleEnum } from '../../common/types';
import HeaderPage from '../../components/header/HeaderPage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseGradeBookColumns } from './constant';

import './GradeBook.scss';

const GradeBook = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courses, courseGradeBook, courseParticipants } = useAppSelector(
    (state) => state.coursesReducer,
  );
  const { user } = useAppSelector((state) => state.authReducer);

  const [course, setCourse] = useState();
  const [participant, setParticipant] = useState<string>();

  const dispatch = useAppDispatch();

  const handleCourseStudentSubmit = (id: string) => {
    dispatch({
      type: SagaAction.COURSES_GRADE_BOOK_GET_FOR_STUDENT,
      payload: { courseId: id },
    });
  };

  const handleCourseTeacherSubmit = (id: string) => {
    dispatch({
      type: SagaAction.COURSES_GRADE_BOOK_GET_FOR_TEACHER,
      payload: { courseId: course, participantId: id },
    });
  };

  useEffect(
    () => () => {
      dispatch({ type: SagaAction.COURSES_GRADE_BOOK_RESET });
    },
    [dispatch],
  );

  return (
    <Layout>
      <HeaderPage />
      <div className='grade-page'>
        <div className='grade-page__name-container'>
          <span>Журнал оцінок</span>
        </div>
        <div className='grade-page__table-container'>
          <div className='grade-page__card'>
            <div className='grade-page__select-container'>
              <div className='grade-page__select'>
                <Select
                  className='estimates__select'
                  showSearch
                  placeholder='Виберіть курс'
                  size='large'
                  optionFilterProp='children'
                  filterOption={(input, option) => filterOption(input, option)}
                  filterSort={(optionA, optionB) => filterSort(optionA, optionB)}
                  options={(courses || []).map((course) => ({
                    value: course.id,
                    label: course.name,
                  }))}
                  onChange={(value) => {
                    if (user?.role === UserRoleEnum.STUDENT) {
                      handleCourseStudentSubmit(value);
                    }
                    if (user?.role === UserRoleEnum.TEACHER) {
                      setParticipant(undefined);
                      setCourse(value);
                    }
                  }}
                  onDropdownVisibleChange={() => {
                    dispatch({ type: SagaAction.COURSES_GET });
                  }}
                />
              </div>
              {user?.role === UserRoleEnum.TEACHER && course && (
                <div className='grade-page__select'>
                  <Select
                    className='estimates__select'
                    showSearch
                    placeholder='Виберіть студента'
                    size='large'
                    optionFilterProp='children'
                    value={participant}
                    filterOption={(input, option) => filterOption(input, option)}
                    filterSort={(optionA, optionB) => filterSort(optionA, optionB)}
                    options={(courseParticipants || []).map((participant) => ({
                      value: participant.id,
                      label: getUserFullName(participant.user),
                    }))}
                    onChange={(value: string) => {
                      setParticipant(value);
                      handleCourseTeacherSubmit(value);
                    }}
                    onDropdownVisibleChange={() => {
                      dispatch({ type: SagaAction.COURSES_PARTICIPANTS_GET, payload: course });
                    }}
                  />
                </div>
              )}
            </div>
            <div className='grade-page__table'>
              <Table
                pagination={{ defaultPageSize: take }}
                columns={courseGradeBookColumns}
                dataSource={courseGradeBook}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GradeBook;
