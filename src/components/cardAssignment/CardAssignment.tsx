import { FilePdfOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { CourseActivityEntity } from '../../common/types';

import './CardAssignment.scss';

import Practical from '../modals/practical/Practical';

interface Props {
  data: CourseActivityEntity;
}

const CardAssignment = (props: Props) => {
  const {
    data: { id, title },
  } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='box'>
      <div className='box-card'>
        <div className='box-card__title-container'>
          <div className='box-card__title-lecture'>{title}</div>
        </div>
        <div className='box-card__file'>
          <div className='name-file'>Інформаційних мереж.pdf</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
        <div className='mark'>Оцінка 0,00 / 4,00</div>
        <div>
          <Button shape='round' type='primary' className='button-pass' onClick={handleShow}>
            Здати роботу
          </Button>
          <Practical onStart={show} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default CardAssignment;
