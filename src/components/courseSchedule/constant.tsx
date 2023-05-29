import { DeleteOutlined } from '@ant-design/icons';
import { CourseTimeTableWeekdayEnum } from '../../common';
import { showConfirm } from '../../common/helpers';

const WeekdayNames = new Map<CourseTimeTableWeekdayEnum, string>([
  [CourseTimeTableWeekdayEnum.SUNDAY, 'Неділя'],
  [CourseTimeTableWeekdayEnum.MONDAY, 'Понеділок'],
  [CourseTimeTableWeekdayEnum.TUESDAY, 'Вівторок'],
  [CourseTimeTableWeekdayEnum.WEDNESDAY, 'Середа'],
  [CourseTimeTableWeekdayEnum.THURSDAY, 'Четвер'],
  [CourseTimeTableWeekdayEnum.FRIDAY, "П'ятниця"],
  [CourseTimeTableWeekdayEnum.SATURDAY, 'Субота'],
]);

export const courseScheduleColumns = [
  {
    title: 'День',
    dataIndex: 'weekday',
    key: 'weekday',
    width: '50%',
    render: (weekday: CourseTimeTableWeekdayEnum) => (
      <span className='table__title'>{WeekdayNames.get(weekday)}</span>
    ),
  },
  {
    title: 'Час початку пари',
    dataIndex: 'startTime',
    key: 'startTime',
    width: '20%',
    render: (startTime: string) => <span className='table__info'>{startTime.slice(0, 5)}</span>,
  },
  {
    title: 'Час закінчення пари',
    dataIndex: 'endTime',
    key: 'endTime',
    width: '20%',
    render: (endTime: string) => <span className='table__info'>{endTime.slice(0, 5)}</span>,
  },
  {
    title: 'Дія',
    dataIndex: 'deleteTime',
    key: 'deleteTime',
    width: '10%',
    render: (deleteTime: () => void) => (
      <div onClick={() => showConfirm('видалити день', deleteTime)}>
        <DeleteOutlined className='table__icon--select' />
      </div>
    ),
  },
];
