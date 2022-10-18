import { Navigate, Route, Routes } from 'react-router';

import { getFromLocalStorage } from '../common/helpers';
import Course from './Courses/Course';
import CourseDetails from './Courses/CourseDetails/CourseDetails';
import Home from './Home/Home';
import LayoutPage from './Layout/Layout';
import Settings from './Settings/Settings';

const MainRoutes = () => {
  const isAuthorized = getFromLocalStorage('token');

  // if (!isAuthorized) {
  //   return <Navigate to='/auth' />;
  // }

  return (
    <LayoutPage>
      <Routes>
        <Route index element={<Navigate to='/main/home' />} />
        <Route path='home' element={<Home />} />
        <Route path='courses' element={<Course />} />
        <Route path='settings' element={<Settings />} />
        <Route path='courses/:id' element={<CourseDetails />} />
        <Route path='*' element={<Navigate to='/main/home' />} />
      </Routes>
    </LayoutPage>
  );
};

export default MainRoutes;
