import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import './CurrentActitivity.scss';

import live from '../../global/images/icons/live.png';
import liveOff from '../../global/images/icons/liveOff.png';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { getUserShortName } from '../../common/helpers';
import { SagaAction } from '../../common/types';

const CurrentActivity = () => {
  const { courses, courseMeeting } = useAppSelector((state) => state.coursesReducer);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onConnectClick = () => navigate(`/main/chat?roomID=${courseMeeting?.meetingUrl}`);

  useEffect(() => {
    dispatch({ type: SagaAction.COURSE_MEETING_GET });
  }, [courses, dispatch]);

  return (
    <div className='current-activity'>
      {courseMeeting ? (
        <div className='current-activity__container'>
          <div className='current-activity__title'>{courseMeeting?.name}</div>
          <div className='current-activity__owner'>
            <UserOutlined className='icon' />
            {getUserShortName(courseMeeting?.teacher)}
          </div>
          <div onClick={onConnectClick} className='current-activity__image'>
            <img className='title-icon' src={live} alt='live' />
          </div>
        </div>
      ) : (
        <div className='current-activity__offline'>
          <p className='current-activity__offline-text'>Мітинги відсутні</p>
          <img className='title-icon' src={liveOff} alt='live' />
        </div>
      )}
    </div>
  );
};

export default CurrentActivity;
