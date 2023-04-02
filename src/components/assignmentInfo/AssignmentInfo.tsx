import { Button } from 'antd';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { SagaAction } from '../../common/types';
import { getMarkAssignment, getStatusAssignment } from '../../common/helpers';
import PassedModal from '../modals/passed/Passed';

import './AssignmentInfo.scss';

const AssignmentInfo = () => {
  const { courseActivity, coursePassedAssignments } = useAppSelector(
    (state) => state.coursesReducer,
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_PASSED_ASSIGNMENTS_GET, payload: courseActivity?.id });
  }, [dispatch, courseActivity]);

  const coursePassedAssignment = coursePassedAssignments?.[0];

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
        <Button
          shape='round'
          type='primary'
          className='assignment-info__button-pass'
          onClick={handleShow}
        >
          Здати роботу
        </Button>
        <PassedModal onStart={show} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default AssignmentInfo;
