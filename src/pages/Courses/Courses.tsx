import { useEffect, useState } from 'react';
import { Button, Layout, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { getUserShortName } from '../../common/helpers';
import { coursesColumns } from './constants';
import { SagaAction, UserRoleEnum } from '../../common/types';

import './Courses.scss';

import HeaderPage from '../../components/header/HeaderPage';
import AppLoader from '../../components/AppLoader';
import CourseModal from '../../components/modals/course/Course';

const Courses = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { courses } = useAppSelector((state) => state.coursesReducer);
  const { user } = useAppSelector((state) => state.authReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_GET });
  }, [dispatch]);

  if (!courses) return <AppLoader />;

  const tableData = courses.map(({ id, name, teacher }) => ({
    key: id,
    name,
    teacher: getUserShortName(teacher),
    count: '15/30',
    progress: 80,
  }));

  return (
    <Layout>
      <HeaderPage />
      <div className='course-page'>
        <div className='course-page__name-container'>
          <span>Мої курси</span>
        </div>
        {user?.role == UserRoleEnum.TEACHER && (
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
        )}
      </div>
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

export default Courses;
