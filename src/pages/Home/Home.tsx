import { Layout } from 'antd';

import './Home.scss';

import HeaderPage from '../../components/header/HeaderPage';
import Schedule from '../../components/schedule/Schedule';
import Course from '../../components/course/Course';

const Home = () => (
  <Layout>
    <HeaderPage />
    <Schedule />
    <Course />
  </Layout>
);

export default Home;
