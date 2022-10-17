import { Layout } from 'antd';
import CardLecture from '../../../components/cardLecture/CardLecture';
import CourseHeader from '../../../components/courseHeader/CourseHeader';
import CourseSidebar from '../../../components/courseSidebar/CourseSidebar';
import PracticalLecture from '../../../components/practicalLecture/PracticalLecture';

import './CourseDetails.scss';

const Course = () => (
  <Layout>
    <CourseHeader />
    <div className='course-page-container'>
      <div className='course-page__sidebar'>
        <div className='smartphone-menu-trigger'></div>
        <CourseSidebar />
      </div>
      <div className='course-page__task'>
        <CardLecture />
        <PracticalLecture />
        <CardLecture />
        <PracticalLecture />
      </div>
    </div>
  </Layout>
);

export default Course;
