import { Button } from 'antd';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { SagaAction } from '../../common/types';
import { getMarkAssignment, getStatusAssignment } from '../../common/helpers';
import PassedModal from '../modals/passed/Passed';

import './AssignmentInfo.scss';

const AssignmentInfo = () => {
  const { courseActivity, coursePassedAssignment } = useAppSelector(
    (state) => state.coursesReducer,
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const handleEditPassed = () => {
    dispatch({
      type: SagaAction.COURSES_PASSED_ASSIGNMENT_GET,
      payload: coursePassedAssignment?.id,
    });
    handleShow();
  };

  useEffect(() => {
    dispatch({
      type: SagaAction.COURSES_PASSED_ASSIGNMENT_GET_FOR_STUDENT,
      payload: courseActivity?.id,
    });
  }, [dispatch, courseActivity]);

  return (
    <div className='assignment-info__container'>
      <div className='assignment-info__title-container'>
        <p className='title__status'>Статус оцінювання роботи :</p>
        <p className='title__status'>Оцінка :</p>
      </div>
      <div className='assignment-info__title-container'>
        <p className='title__mark'>{getStatusAssignment(coursePassedAssignment)}</p>
        <p className='title__mark'>{getMarkAssignment(coursePassedAssignment)} / 100</p>
      </div>
      <div className='assignment-info__button-container'>
        {!coursePassedAssignment ? (
          <Button
            shape='round'
            type='primary'
            className='assignment-info__button-pass'
            onClick={handleShow}
          >
            Здати роботу
          </Button>
        ) : (
          <Button
            shape='round'
            type='primary'
            className='assignment-info__button-pass'
            onClick={handleEditPassed}
          >
            Редагувати відповідь
          </Button>
        )}
        <PassedModal data={coursePassedAssignment} onStart={show} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default AssignmentInfo;
