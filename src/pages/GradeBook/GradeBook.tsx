import { Layout, Progress, Select, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import './GradeBook.scss';

import HeaderPage from '../../components/header/HeaderPage';

const { Option } = Select;

const columns = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    width: '23%',
    render: (name: string) => <span className='grade-name'>{name}</span>,
  },
  {
    title: 'Оцінка',
    dataIndex: 'mark',
    key: 'mark',
    width: '8%',
    render: (mark: string) => <span className='grade-mark'>{mark}</span>,
  },
  {
    title: 'Інтервал',
    dataIndex: 'interval',
    key: 'interval',
    width: '10%',
    render: (interval: string) => <span className='grade-interval'>{interval}</span>,
  },
  {
    title: 'Відсоток',
    dataIndex: 'progress',
    key: 'progress',
    width: '8%',
    render: (progress: number) => <Progress status='normal' percent={progress}></Progress>,
  },
];
const data = [
  {
    key: '1',
    name: 'Практичне заняття 1. Знайомство з Anaconda та Python',
    mark: '4,00',
    interval: '0-5',
    progress: 80,
  },
  {
    key: '2',
    name: 'Практичне заняття 2. Видалення аномальних спостережень',
    mark: '4,00',
    interval: '0-5',
    progress: 80,
  },
  {
    key: '3',
    name: 'Практичне заняття 3. Робота з даними в Python',
    mark: '5,00',
    interval: '0-5',
    progress: 100,
  },
  {
    key: '4',
    name: 'Практичне заняття 4. Перевірка стохастичності вибірки',
    mark: '5,00',
    interval: '0-5',
    progress: 100,
  },
  {
    key: '5',
    name: 'Практичне заняття 5. Основні статистичні характеристики',
    mark: '5,00',
    interval: '0-5',
    progress: 100,
  },
  {
    key: '6',
    name: 'Практичне заняття 6. Коефіцієнт кореляції',
    mark: '5,00',
    interval: '0-5',
    progress: 100,
  },
  {
    key: '7',
    name: 'Практичне заняття 7. Кореляція якісних змінних',
    mark: '5,00',
    interval: '0-5',
    progress: 100,
  },
  {
    key: '8',
    name: 'Практичне заняття 8. Частинна кореляція',
    mark: '5,00',
    interval: '0-5',
    progress: 100,
  },
  {
    key: '9',
    name: 'Практичне заняття 9-10. Парна лінійна регресія',
    mark: '5,00',
    interval: '0-5',
    progress: 100,
  },
  {
    key: '10',
    name: 'Практичне заняття 11. Обчислення параметрів парної регресії засобами MS Excel',
    mark: '5,00',
    interval: '0-5',
    progress: 100,
  },
];

const GradeBook = () => {
  return (
    <Layout>
      <HeaderPage />
      <div className='grade-page'>
        <div className='grade-page__name-container'>
          <span>Журнал оцінок</span>
        </div>
        <div className='grade-page__table-container'>
          <div className='grade-page__card'>
            <div className='grade-page__select'>
              <Select
                className='grade-select'
                showSearch
                placeholder='Введіть назву курсу'
                size='large'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                <Option value='1'>Аналіз даних та проектування в проектування</Option>
                <Option value='2'>Фізика</Option>
                <Option value='3'>Математика</Option>
                <Option value='4'>Біологія</Option>
                <Option value='5'>Інформатика</Option>
                <Option value='6'>Фізкультура</Option>
              </Select>
            </div>
            <div className='grade-page__table'>
              <Table
                pagination={{
                  defaultPageSize: 10,
                }}
                columns={columns}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GradeBook;
