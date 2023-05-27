import { useEffect, useState } from 'react';
import { Button, Layout, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import './Courses.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { courseStudentColumns, courseTeacherColumns } from './constants';
import { SagaAction, UserRoleEnum } from '../../common/types';

import HeaderPage from '../../components/header/HeaderPage';
import CourseModal from '../../components/modals/course/Course';
import AppLoader from '../../components/AppLoader';

const Courses = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { user } = useAppSelector((state) => state.profileReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_GET });
  }, [dispatch]);

  if (!courses) return <AppLoader />;

  return (
    <Layout>
      <HeaderPage />
      <div className='course-page'>
        <div className='course-page__name-container'>
          <span>Мої курси</span>
        </div>
        <div className='course-page__button-container'>
          <Button
            type='primary'
            shape='round'
            icon={<PlusCircleOutlined className='icon' />}
            className='course-page__button-connect'
            onClick={handleShow}
          >
            Додати курс
          </Button>
          <CourseModal onStart={show} handleClose={handleClose} />
        </div>
      </div>
      <div className='course-page__table-container'>
        <div className='course-page__table'>
          {user?.role === UserRoleEnum.TEACHER ? (
            <Table
              pagination={{ defaultPageSize: take }}
              columns={courseTeacherColumns}
              dataSource={courses}
            />
          ) : (
            <Table
              pagination={{ defaultPageSize: take }}
              columns={courseStudentColumns}
              dataSource={courses}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
