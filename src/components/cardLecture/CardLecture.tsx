import { useAppSelector } from '../../hooks/reduxhooks';
import { Button, Empty } from 'antd';
import { useState } from 'react';

import Practical from '../modals/practical/Practical';

import './CardLecture.scss';

const CardLecture = () => {
  const { courseActivity } = useAppSelector((state) => state.coursesReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {!courseActivity ? (
        <Empty description={<span className='empty-title'>Виберіть матеріал</span>} />
      ) : (
        <div className='card-material'>
          <div className='card-material__container'>
            <div className='card-material__title-container'>
              <div className='card-material__title-lecture'>{courseActivity?.title}</div>
            </div>
            <div className='card-material__file-container'></div>
            {courseActivity.type == 'ASSIGNMENT' && (
              <div className='card-material__file-container'>
                <Button shape='round' type='primary' className='button-pass' onClick={handleShow}>
                  Здати роботу
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <Practical onStart={show} handleClose={handleClose} />
    </>
  );
};

export default CardLecture;
