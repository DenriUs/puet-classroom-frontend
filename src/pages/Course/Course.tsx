import { Layout } from 'antd';

import './Course.scss';

import CourseHeader from '../../components/courseHeader/CourseHeader';
import CourseMain from '../../components/courseMain/CourseMain';

const Course = () => (
  <Layout>
    <CourseHeader />
    <CourseMain />
  </Layout>
);

export default Course;
