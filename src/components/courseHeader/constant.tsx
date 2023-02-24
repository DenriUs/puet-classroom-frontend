import { ReadOutlined, ReconciliationOutlined, FileDoneOutlined } from '@ant-design/icons';

export const statistics = [
  {
    number: 20,
    title: 'лекцій',
    icon: <ReadOutlined className='statistic__icon' />,
  },
  {
    number: 15,
    title: 'практичних',
    icon: <ReconciliationOutlined className='statistic__icon' />,
  },
  {
    number: 15,
    title: 'тестів',
    icon: <FileDoneOutlined className='statistic__icon' />,
  },
];
