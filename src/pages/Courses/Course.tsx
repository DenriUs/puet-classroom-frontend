import { useEffect } from 'react';
import { Layout, Table } from 'antd';

import './Course.scss';

import CourseStatistics from '../../components/courseStatistics/CourseStatistics';
import HeaderPage from '../../components/header/HeaderPage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import AppLoader from '../../components/AppLoader';
import { getTeacherShortName } from '../../common/helpers';
import { coursesColumns } from './constants';
import { SagaAction } from '../../common/types';

const Course = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_GET });
  }, [dispatch]);

  if (!courses) return <AppLoader />;

  const tableData = courses.map(({ id, name, teacher }) => ({
    key: id,
    name,
    teacher: getTeacherShortName(teacher),
    count: '15/30',
    progress: 100,
  }));

  return (
    <Layout>
      <HeaderPage />
      <div className='course-page__name-container'>
        <span>Мої курси</span>
      </div>
      <CourseStatistics />
      <div className='course-page__table-container'>
        <div className='course-page__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            showHeader={false}
            columns={coursesColumns}
            dataSource={tableData}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Course;
