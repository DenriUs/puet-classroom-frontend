import { useState, useEffect } from 'react';
import { Button, Layout, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { columnsGroups } from './constants';
import { SagaAction } from '../../common/types';
import AppLoader from '../../components/AppLoader';
import HeaderPage from '../../components/header/HeaderPage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import GroupModal from '../../components/modals/group/Group';
import GroupStudentsModal from '../../components/modals/groupStudents/GroupStudents';

import './Groups.scss';

const Groups = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { group, groups } = useAppSelector((state) => state.groupsReducer);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showGroupStudents, setShowGroupStudents] = useState(false);

  const handleCreateShow = () => setShowCreate(true);

  const handleCreateClose = () => setShowCreate(false);

  const handleGroupStudentsShow = () => setShowGroupStudents(true);

  const handleGroupStudentsClose = () => setShowGroupStudents(false);

  const handleEditShow = () => setShowEdit(true);

  const handleEditClose = () => setShowEdit(false);

  const dispatch = useAppDispatch();

  const handleGroupUpdate = (id: string) => {
    dispatch({ type: SagaAction.GROUP_GET, payload: id });
    handleEditShow();
  };

  const handleStudentGroups = (id: string) => {
    dispatch({ type: SagaAction.GROUP_GET, payload: id });
    dispatch({ type: SagaAction.GROUPS_PARTICIPANTS_GET, payload: id });
    handleGroupStudentsShow();
  };

  const handleGroupDelete = (id: string) => {
    dispatch({ type: SagaAction.GROUP_DELETE, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.GROUPS_GET });
  }, [dispatch]);

  if (!groups) return <AppLoader />;

  const dataGroups = groups.map(({ id, ...rest }) => ({
    ...rest,
    actionsGroups: {
      updateGroups: () => handleGroupUpdate(id),
      studentGroups: () => handleStudentGroups(id),
      deleteGroups: () => handleGroupDelete(id),
    },
  }));

  return (
    <Layout>
      <HeaderPage />
      <div className='groups-page'>
        <div className='groups-page__name-container'>
          <span>Групи</span>
        </div>
        <div className='groups-page__button-container'>
          <Button
            type='primary'
            shape='round'
            icon={<PlusCircleOutlined className='icon' />}
            className='groups-page__button-connect'
            onClick={handleCreateShow}
          >
            Додати групу
          </Button>
        </div>
      </div>
      <div className='groups-page__table-container'>
        <div className='groups-page__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            columns={columnsGroups}
            dataSource={dataGroups}
          />
        </div>
        <GroupModal
          actionName='Додати'
          sagaActionType={SagaAction.GROUP_CREATE}
          onStart={showCreate}
          handleClose={handleCreateClose}
        />
        <GroupModal
          {...group}
          specialityId={group?.speciality?.id}
          actionName='Редагувати'
          sagaActionType={SagaAction.GROUP_UPDATE}
          onStart={showEdit}
          handleClose={handleEditClose}
        />
        <GroupStudentsModal onStart={showGroupStudents} handleClose={handleGroupStudentsClose} />
      </div>
    </Layout>
  );
};

export default Groups;
