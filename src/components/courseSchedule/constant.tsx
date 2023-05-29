import { DeleteOutlined } from '@ant-design/icons';
import { getDayDate, getFullDate, getTimeDate, showConfirm } from '../../common/helpers';

export const courseScheduleColumns = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    width: '25%',
    render: (date: Date) => <span className='table__info'>{getFullDate(date)}</span>,
  },
  {
    title: 'День',
    dataIndex: 'date',
    key: 'date',
    width: '25%',
    render: (date: Date) => <span className='table__info'>{getDayDate(date)}</span>,
  },
  {
    title: 'Час початку пари',
    dataIndex: 'startTime',
    key: 'startTime',
    width: '20%',
    render: (startTime: Date) => <span className='table__info'>{getTimeDate(startTime)}</span>,
  },
  {
    title: 'Час закінчення пари',
    dataIndex: 'endTime',
    key: 'endTime',
    width: '20%',
    render: (endTime: Date) => <span className='table__info'>{getTimeDate(endTime)}</span>,
  },
  {
    title: 'Дія',
    dataIndex: 'deleteTime',
    key: 'deleteTime',
    width: '10%',
    render: (deleteTime: () => void) => (
      <div onClick={() => showConfirm('видалити дату', deleteTime)}>
        <DeleteOutlined className='table__icon--select' />
      </div>
    ),
  },
];
