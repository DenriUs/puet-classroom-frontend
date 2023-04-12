import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { getFromLocalStorage } from '../common/helpers';
import Course from './Courses/Courses';
import CourseDetails from './Courses/CourseDetails/CourseDetails';
import GradeBook from './GradeBook/GradeBook';
import Home from './Home/Home';
import LayoutPage from './Layout/Layout';
import Settings from './Settings/Settings';
import { useAppDispatch } from '../hooks/reduxhooks';
import { SagaAction } from '../common/types';
import CourseSettings from './Courses/CourseSettings/CourseSettings';

const MainRoutes = () => {
  const isAuthorized = getFromLocalStorage('token');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.PROFILE_GET });
  }, [dispatch]);

  if (!isAuthorized) {
    return <Navigate to='/auth' />;
  }

  return (
    <LayoutPage>
      <Routes>
        <Route index element={<Navigate to='/main/home' />} />
        <Route path='home' element={<Home />} />
        <Route path='courses' element={<Course />} />
        <Route path='grade' element={<GradeBook />} />
        <Route path='settings' element={<Settings />} />
        <Route path='courses/:id' element={<CourseDetails />} />
        <Route path='courses/:id/settings' element={<CourseSettings />} />
        <Route path='*' element={<Navigate to='/main/home' />} />
      </Routes>
    </LayoutPage>
  );
};

export default MainRoutes;
