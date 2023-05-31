import { Button, Empty, Steps } from 'antd';
import { useEffect } from 'react';

import { getCurrentISODate, getTimeDate, SagaAction, telegramBotLink } from '../../common';
import { getCurrentDate } from '../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';

import telegramLogo from '../../assets/telegram-logo.svg';

import './Timetable.scss';

const { Step } = Steps;

const TimetableModal = () => {
  const { user } = useAppSelector((state) => state.profileReducer);
  const { courseTimetableToday } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  const handleTelegramClick = () => window.open(telegramBotLink, '_blank');

  useEffect(() => {
    dispatch({
      type: SagaAction.COURSES_TIMETABLE_GET,
      payload: { startDate: getCurrentISODate(), endDate: getCurrentISODate() },
    });
  }, [dispatch]);

  return (
    <div className='timetable'>
      <div className='timetable__title'>РОЗКЛАД НА СЬОГОДНІ {getCurrentDate()}</div>
      {courseTimetableToday ? (
        <>
          <Steps size='small' progressDot direction='vertical'>
            {courseTimetableToday?.map((time) => (
              <Step
                title={time.course.name}
                description={`${getTimeDate(time.startTime)}-${getTimeDate(time.endTime)}`}
                status='finish'
              />
            ))}
          </Steps>
          {user?.telegramId && (
            <div className='telegram-button__container'>
              <Button
                type='text'
                shape='round'
                icon={<img className='telegram-button__icon' alt='' src={telegramLogo} />}
                className='telegram-button'
                onClick={handleTelegramClick}
              >
                Розклад в Telegram
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className='timetable__empty'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Розклад відсутній' />
        </div>
      )}
    </div>
  );
};

export default TimetableModal;
