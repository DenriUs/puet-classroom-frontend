import { Layout } from 'antd';

import './Home.scss';

import HeaderPage from '../../components/header/HeaderPage';
import Schedule from '../../components/schedule/Schedule';
import Course from '../../components/course/Course';
import CardStatistics from '../../components/cardStatistics/CardStatistics';

import { Column, Liquid } from '@ant-design/plots';
import CurrentActivity from '../../components/currentActivity/CurrentActivity';

const data = [
  {
    type: 'ПН',
    sales: 38,
  },
  {
    type: 'ВТ',
    sales: 52,
  },
  {
    type: 'СР',
    sales: 61,
  },
  {
    type: 'ЧТ',
    sales: 145,
  },
  {
    type: 'ПТ',
    sales: 48,
  },
  {
    type: 'СБ',
    sales: 38,
  },
  {
    type: 'НД',
    sales: 38,
  },
];

const configColumn = {
  data,
  height: 250,
  xField: 'type',
  yField: 'sales',
  columnStyle: {
    radius: [10, 10, 0, 0],
  },
  yAxis: {
    label: {
      style: {
        opacity: 0,
      },
      autoHide: true,
      autoRotate: false,
    },
  },
  xAxis: {
    label: {
      style: {
        opacity: 1,
      },
      autoHide: true,
      autoRotate: false,
    },
  },
};

const configLiquid = {
  percent: 0.25,
  height: 250,
  outline: {
    border: 4,
    distance: 8,
  },
  wave: {
    length: 128,
  },
};

const Home = () => (
  <Layout>
    <HeaderPage />
    <div className='home-page__name-container'>
      <span>Головна сторінка</span>
    </div>
    <div className='home-page'>
      <div className='container-statistics'>
        <CardStatistics />
        <CurrentActivity />
      </div>
      <div className='container-chart'>
        <div className='home-page-column'>
          <span className='column-name'>CТУДЕНСЬКА АКТИВНІСТЬ</span>
          <Column {...configColumn} />
        </div>
        <div className='home-page-liquid'>
          <span className='liquid-name'>ПРОГРЕС СЕМЕСТРУ</span>
          <Liquid {...configLiquid} />
        </div>
        <Schedule />
      </div>
    </div>
    <Course />
  </Layout>
);

export default Home;
