import { useState, useEffect } from 'react';
import { Button, Layout, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { SagaAction } from '../../common/types';
import AppLoader from '../../components/AppLoader';
import HeaderPage from '../../components/header/HeaderPage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { columnsStudents } from './constants';
import StudentModal from '../../components/modals/student/Student';

import './Students.scss';

const Students = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { students, student } = useAppSelector((state) => state.studentsReducer);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCreateShow = () => setShowCreate(true);

  const handleCreateClose = () => setShowCreate(false);

  const handleEditShow = () => setShowEdit(true);

  const handleEditClose = () => setShowEdit(false);

  const dispatch = useAppDispatch();

  const handleStudentUpdate = (id: string) => {
    dispatch({ type: SagaAction.STUDENT_GET, payload: id });
    handleEditShow();
  };

  const handleStudentDelete = (id: string) => {
    dispatch({ type: SagaAction.STUDENT_DELETE, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.STUDENTS_GET });
  }, [dispatch]);

  if (!students) return <AppLoader />;

  const dataStudents = students.map(({ id, ...rest }) => ({
    id,
    ...rest,
    actionsStudents: {
      updateStudents: () => handleStudentUpdate(id),
      deleteStudents: () => handleStudentDelete(id),
    },
  }));

  return (
    <Layout>
      <HeaderPage />
      <div className='students-page'>
        <div className='students-page__name-container'>
          <span>Студенти</span>
        </div>
        <div className='students-page__button-container'>
          <Button
            type='primary'
            shape='round'
            icon={<PlusCircleOutlined className='icon' />}
            className='students-page__button-connect'
            onClick={handleCreateShow}
          >
            Додати студента
          </Button>
        </div>
      </div>
      <div className='students-page__table-container'>
        <div className='students-page__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            columns={columnsStudents}
            dataSource={dataStudents}
          />
        </div>
        <StudentModal
          actionName='Додати'
          sagaActionType={SagaAction.STUDENT_CREATE}
          onStart={showCreate}
          handleClose={handleCreateClose}
        />
        <StudentModal
          {...student}
          {...(student?.groups[0] && { group: student?.groups[0] })}
          actionName='Редагувати'
          sagaActionType={SagaAction.STUDENT_UPDATE}
          onStart={showEdit}
          handleClose={handleEditClose}
        />
      </div>
    </Layout>
  );
};

export default Students;
