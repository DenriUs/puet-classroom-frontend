import { Button, Layout, Table } from 'antd';
import { useEffect, useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

import './Files.scss';

import { columnsFiles } from './constant';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { SagaAction } from '../../common/types';
import AppLoader from '../../components/AppLoader';
import HeaderPage from '../../components/header/HeaderPage';
import FileModal from '../../components/modals/file/File';

const Files = () => {
  const { take } = useAppSelector((state) => state.paginatedDataReducer);
  const { files } = useAppSelector((state) => state.filesReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const handleFileDelete = (id: string) => {
    dispatch({ type: SagaAction.FILE_DELETE, payload: id });
  };

  useEffect(() => {
    dispatch({ type: SagaAction.FIELS_GET });
  }, [dispatch]);

  if (!files) return <AppLoader />;

  const dataFiles = files?.map(({ id, filename, createdAt, src }) => ({
    id,
    filename,
    src,
    createdAt,
    deleteFiles: () => handleFileDelete(id),
  }));

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
            <FileModal onStart={show} handleClose={handleClose} />
          </div>
        </div>
        <div className='files-page__table-container'>
          <div className='files-page__table'>
            <Table
              pagination={{ defaultPageSize: take }}
              columns={columnsFiles}
              dataSource={dataFiles}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Files;
