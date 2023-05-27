import { useState, useEffect } from 'react';
import { Button, Layout, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { SagaAction } from '../../common/types';
import AppLoader from '../../components/AppLoader';
import HeaderPage from '../../components/header/HeaderPage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import SpecialityModal from '../../components/modals/speciality/Speciality';
import { columnsSpecialities } from './constants';

import './Specialities.scss';

const Specialities = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { specialities, speciality } = useAppSelector((state) => state.specialitiesReducer);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCreateShow = () => setShowCreate(true);

  const handleCreateClose = () => setShowCreate(false);

  const handleEditShow = () => setShowEdit(true);

  const handleEditClose = () => setShowEdit(false);

  const dispatch = useAppDispatch();

  const handleSpecialityUpdate = (id: string) => {
    dispatch({ type: SagaAction.SPECIALITY_GET, payload: id });
    handleEditShow();
  };

  const handleSpecialityDelete = (id: string) => {
    dispatch({ type: SagaAction.SPECIALITY_DELETE, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.SPECIALITIES_GET });
  }, [dispatch]);

  if (!specialities) return <AppLoader />;

  const dataSpecialities = specialities.map(({ id, ...rest }) => ({
    ...rest,
    actionsSepecialities: {
      updateSpecialities: () => handleSpecialityUpdate(id),
      deleteSpecialities: () => handleSpecialityDelete(id),
    },
  }));

  return (
    <Layout>
      <HeaderPage />
      <div className='specialities-page'>
        <div className='specialities-page__name-container'>
          <span>Спеціальності</span>
        </div>
        <div className='specialities-page__button-container'>
          <Button
            type='primary'
            shape='round'
            icon={<PlusCircleOutlined className='icon' />}
            className='specialities-page__button-connect'
            onClick={handleCreateShow}
          >
            Додати спеціальність
          </Button>
        </div>
      </div>
      <div className='specialities-page__table-container'>
        <div className='specialities-page__table'>
          <Table
            pagination={{ defaultPageSize: take }}
            columns={columnsSpecialities}
            dataSource={dataSpecialities}
          />
        </div>
        <SpecialityModal
          actionName='Додати'
          sagaActionType={SagaAction.SPECIALITY_CREATE}
          onStart={showCreate}
          handleClose={handleCreateClose}
        />
        <SpecialityModal
          {...speciality}
          actionName='Редагувати'
          sagaActionType={SagaAction.SPECIALITY_UPDATE}
          onStart={showEdit}
          handleClose={handleEditClose}
        />
      </div>
    </Layout>
  );
};

export default Specialities;
