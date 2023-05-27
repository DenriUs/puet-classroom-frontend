import { useState, useEffect } from 'react';
import { Button, Layout, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { SagaAction } from '../../common/types';
import AppLoader from '../../components/AppLoader';
import HeaderPage from '../../components/header/HeaderPage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { columnsTeachers } from './constants';
import TeacherModal from '../../components/modals/teacher/Teacher';

import './Teachers.scss';

const Teachers = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { teachers, teacher } = useAppSelector((state) => state.teachersReducer);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCreateShow = () => setShowCreate(true);

  const handleCreateClose = () => setShowCreate(false);

  const handleEditShow = () => setShowEdit(true);

  const handleEditClose = () => setShowEdit(false);

  const dispatch = useAppDispatch();

  const handleTeacherUpdate = (id: string) => {
    dispatch({ type: SagaAction.TEACHER_GET, payload: id });
    handleEditShow();
  };

  const handleTeacherDelete = (id: string) => {
    dispatch({ type: SagaAction.TEACHER_DELETE, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.TEACHERS_GET });
  }, [dispatch]);

  if (!teachers) return <AppLoader />;

  const dataTeachers = teachers.map(({ id, ...rest }) => ({
    id,
    ...rest,
    actionsTeachers: {
      updateTeachers: () => handleTeacherUpdate(id),
      deleteTeachers: () => handleTeacherDelete(id),
    },
  }));

  console.log(teacher);

  return (
    <Layout>
      <HeaderPage />
      <div className='teachers-page'>
        <div className='teachers-page__name-container'>
          <span>Викладачі</span>
        </div>
        <div className='teachers-page__button-container'>
          <Button
            type='primary'
            shape='round'
            icon={<PlusCircleOutlined className='icon' />}
            className='teachers-page__button-connect'
            onClick={handleCreateShow}
          >
            Додати викладача
          </Button>
        </div>
      </div>
      <div className='teachers-page__table-container'>
        <div className='students-page__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            columns={columnsTeachers}
            dataSource={dataTeachers}
          />
        </div>
        <TeacherModal
          actionName='Додати'
          sagaActionType={SagaAction.TEACHER_CREATE}
          onStart={showCreate}
          handleClose={handleCreateClose}
        />
        <TeacherModal
          {...teacher}
          actionName='Редагувати'
          sagaActionType={SagaAction.TEACHER_UPDATE}
          onStart={showEdit}
          handleClose={handleEditClose}
        />
      </div>
    </Layout>
  );
};

export default Teachers;
