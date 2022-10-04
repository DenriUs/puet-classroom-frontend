import { Layout } from 'antd';
import './Course.scss';
import HeaderPage from '../../components/header/HeaderPage';
import Schedule from '../../components/schedule/Schedule';
import Course from '../../components/course/Course';

const CoursePage = () => {
  return (
    <Layout>
      <HeaderPage />
      <Schedule />
      <Course />
    </Layout>
  );
};

export default CoursePage;
