import { Layout } from 'antd';
import './CourseDetails.scss';
import CourseHeader from '../../components/courseHeader/CourseHeader';
import CourseMain from '../../components/courseMain/CourseMain';

const CourseDetailsPage = () => {
  return (
    <Layout>
      <CourseHeader />
      <CourseMain />
    </Layout>
  );
};

export default CourseDetailsPage;
