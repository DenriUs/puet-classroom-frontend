import { Button, Layout, Table } from 'antd';
import { useEffect, useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

import './Files.scss';

import HeaderPage from '../../components/header/HeaderPage';
import Practical from '../../components/modals/practical/Practical';
import { columns } from './constant';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { SagaAction } from '../../common/types';

const Files = () => {
  const { files } = useAppSelector((state) => state.filesReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_GET });
  }, [dispatch]);

  return (
    <Layout>
      <HeaderPage />
      <div className='files-page'>
        <div className='files-page-footer'>
          <div className='files-page-footer__name-container'>
            <span>Мої файли</span>
          </div>
          <div className='files-page-footer__button-container'>
            <Button
              shape='round'
              type='primary'
              icon={<ArrowUpOutlined className='icon' />}
              className='button-upload-file'
              onClick={handleShow}
            >
              Завантажити файл
            </Button>
            <Practical onStart={show} handleClose={handleClose} />
          </div>
        </div>
        <div className='files-page__table-container'>
          <div className='files-page__table'>
            <Table pagination={false} columns={columns} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Files;
