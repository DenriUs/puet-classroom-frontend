import { FilePdfOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { CourseActivityEntity, SagaAction, UserRoleEnum } from '../../common/types';

import './PracticalLecture.scss';

import Practical from '../modals/practical/Practical';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { showDeleteConfirm, showSuccessMessage } from '../../common/helpers';

interface Props {
  data: CourseActivityEntity;
}

const PracticalLecture = (props: Props) => {
  const {
    data: { id, title },
  } = props;

  const { user } = useAppSelector((state) => state.authReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const handlePracticalDelete = () => {
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITY_DELETE, payload: id });
    showSuccessMessage('Практичну видалено з курсу!');
  };

  return (
    <div className='box'>
      <div className='box-card'>
        <div className='box-card__title-container'>
          <div className='box-card__title-lecture'>{title}</div>
          {user?.role == UserRoleEnum.TEACHER && (
            <div className='box-card__delete-button'>
              <DeleteOutlined
                className='file-icon'
                onClick={() => showDeleteConfirm('практичну', handlePracticalDelete)}
              />
            </div>
          )}
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

export default PracticalLecture;
