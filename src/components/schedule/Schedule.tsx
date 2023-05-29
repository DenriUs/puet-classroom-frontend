import { Empty, Steps } from 'antd';
import { useEffect } from 'react';

import { getCurrentISODate, SagaAction } from '../../common';
import { getCurrentDate } from '../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';

import './Schedule.scss';

const { Step } = Steps;

interface Props {}

const Schedule = (props: Props) => {
  const { courseTimetableToday } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.COURSES_TIMETABLE_GET, payload: getCurrentISODate() });
  }, [dispatch]);

  return (
    <div className='schedule'>
      <div className='schedule__title'>РОЗКЛАД НА СЬОГОДНІ {getCurrentDate()}</div>

      {courseTimetableToday ? (
        <Steps size='small' progressDot direction='vertical'>
          {courseTimetableToday?.coursesTimetables.map((time) => (
            <Step
              title={time.courseName}
              description={`${time.startTime?.slice(0, 5)}-${time.endTime?.slice(0, 5)}`}
              status='finish'
            />
          ))}
        </Steps>
      ) : (
        <div className='schedule__empty'>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Розклад відсутній' />
        </div>
      )}
    </div>
  );
};

export default Schedule;
