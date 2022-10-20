import { Button, Layout, Table } from 'antd';
import { useState } from 'react';
import { ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';

import './Files.scss';

import HeaderPage from '../../components/header/HeaderPage';
import Practical from '../../components/modals/practical/Practical';

const columns = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    width: '23%',
    render: (name: string) => <a className='file-name'>{name}</a>,
  },
  {
    title: 'Розмір',
    dataIndex: 'size',
    key: 'size',
    width: '8%',
    render: (size: string) => <span className='file-size'>{size}</span>,
  },
  {
    title: 'Дата завантаження',
    dataIndex: 'date',
    key: 'date',
    width: '10%',
    render: (date: string) => <span className='file-date'>{date}</span>,
  },
  {
    title: 'Дія',
    key: 'progress',
    width: '8%',
    render: () => (
      <a>
        <DeleteOutlined className='file-icon' />
      </a>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'Базові поняття інформаційних мереж.pdf',
    size: '100 Mb',
    date: '10.11.2022',
  },
  {
    key: '2',
    name: 'Інформаційні мережі.png',
    size: '30 Kb',
    date: '10.11.2022',
  },
  {
    key: '3',
    name: 'Курсовий проект з фаху.pdf',
    size: '10 Kb',
    date: '10.11.2022',
  },
  {
    key: '4',
    name: 'Базові поняття .rar',
    size: '1 Mb',
    date: '10.11.2022',
  },
  {
    key: '5',
    name: 'Хімія поняття.rar',
    size: '30 Mb',
    date: '10.11.2022',
  },
  {
    key: '6',
    name: 'Фізика поняття.rar',
    size: '10 Mb',
    date: '10.11.2022',
  },
];

const Files = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Table pagination={false} columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Files;
