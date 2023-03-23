import { Button } from 'antd';
import { useState } from 'react';

import './AssignmentInfo.scss';

import FileModal from '../modals/file/File';

const AssignmentInfo = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='assignment-info__container'>
      <div className='assignment-info__title-container'>
        <p className='title__status'>Статус оцінювання роботи :</p>
        <p className='title__status'>Оцінка :</p>
      </div>
      <div className='assignment-info__title-container'>
        <p className='title__mark'>Немає спроб</p>
        <p className='title__mark'>0 / 100</p>
      </div>
      <div className='assignment-info__button-container'>
        <Button
          shape='round'
          type='primary'
          className='assignment-info__button-pass'
          onClick={handleShow}
        >
          Здати роботу
        </Button>
        <FileModal onStart={show} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default AssignmentInfo;
