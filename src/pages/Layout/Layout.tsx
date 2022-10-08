import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './Layout.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import CourseDetailsPage from '../CourseDetails/CourseDetails';
import CoursePage from '../Courses/Course';

const LayoutPage = () => {
  return (
    <Layout>
      <Sidebar />
      <CourseDetailsPage />
    </Layout>
  );
};

export default LayoutPage;
