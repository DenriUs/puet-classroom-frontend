import { useEffect } from 'react';
import { Layout, Calendar, Select, Popover } from 'antd';
import moment from 'moment';
import type { Moment } from 'moment';

import HeaderPage from '../../components/header/HeaderPage';
import { CourseTimetableEntity, SagaAction, getTimeDate } from '../../common';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { months } from './constants';

import './Timetable.scss';

const Timetable = () => {
  const { courseTimetableForUser } = useAppSelector((state) => state.coursesReducer);

  const dispatch = useAppDispatch();

  const onPanelChange = (value: Moment) => {
    dispatch({
      type: SagaAction.COURSES_TIMETABLES_GET_FOR_USER,
      payload: {
        startDate: value.startOf('month').toISOString(),
        endDate: value.endOf('month').toISOString(),
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: SagaAction.COURSES_TIMETABLES_GET_FOR_USER,
      payload: {
        startDate: moment(new Date()).startOf('month').toISOString(),
        endDate: moment(new Date()).endOf('month').toISOString(),
      },
    });
  }, [dispatch]);

  const renderCalendarHeader = ({
    value,
    onChange,
  }: {
    value: Moment;
    onChange: (date: Moment) => void;
  }) => {
    const selectedDateMonth = value.month();
    return (
      <div className='timetable-header'>
        <span className='timetable-header__title'>Місяць:</span>
        <Select
          className='timetable-header__select-container'
          size='small'
          dropdownMatchSelectWidth={false}
          value={selectedDateMonth}
          options={(months || []).map((month, index) => ({
            value: index,
            label: month,
          }))}
          onChange={(newMonth) => {
            const now = value.clone().month(newMonth);
            onChange(now);
          }}
        />
      </div>
    );
  };

  const renderPopoverContent = (timetables: CourseTimetableEntity[]) => (
    <div className='popover'>
      {timetables.map((timetable) => {
        const { teacher } = timetable.course;
        return (
          <div className='popover__container'>
            <span>{timetable.course.name}</span>
            <span>
              {getTimeDate(timetable.startTime)}-{getTimeDate(timetable.endTime)}
            </span>
            <span>
              {teacher?.lastName} {teacher?.firstName} {teacher?.middleName}
            </span>
          </div>
        );
      })}
    </div>
  );

  const dateCellRender = (value: Moment) => {
    const timetables = courseTimetableForUser?.filter((timetable) => {
      const timetableDate = new Date(timetable.date);
      const dateCellDate = value.toDate();
      timetableDate.setHours(0, 0, 0, 0);
      dateCellDate.setHours(0, 0, 0, 0);
      return timetableDate.getTime() === dateCellDate.getTime();
    });
    if (!timetables) return;
    return (
      <Popover content={renderPopoverContent(timetables)}>
        <div className='date-cell'>
          {timetables.map((timetable) => (
            <div className='date-cell__row'>
              <span className='date-cell__row-text'>{timetable.course.name}</span>
            </div>
          ))}
        </div>
      </Popover>
    );
  };

  return (
    <Layout>
      <HeaderPage />
      <div className='timetable-page'>
        <div className='timetable-page__content-container'>
          <div className='timetable-page__content'>
            <Calendar
              headerRender={renderCalendarHeader}
              dateCellRender={dateCellRender}
              onPanelChange={onPanelChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Timetable;
