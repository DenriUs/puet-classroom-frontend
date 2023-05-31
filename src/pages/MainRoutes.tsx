import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { getFromLocalStorage } from '../common/helpers';
import Course from './Courses/Courses';
import CourseDetails from './Courses/CourseDetails/CourseDetails';
import GradeBook from './GradeBook/GradeBook';
import Home from './Home/Home';
import LayoutPage from './Layout/Layout';
import Settings from './Settings/Settings';
import { useAppDispatch, useAppSelector } from '../hooks/reduxhooks';
import { SagaAction, UserRoleEnum } from '../common/types';
import CourseSettings from './Courses/CourseSettings/CourseSettings';
import Groups from './Groups/Groups';
import Specialities from './Specialities/Specialities';
import AppLoader from '../components/AppLoader';
import Chat from './Chat/Chat';
import Teachers from './Teachers/Teachers';
import Students from './Students/Students';
import Timetable from './Timetable/Timetable';

const MainRoutes = () => {
  const { user } = useAppSelector((state) => state.profileReducer);

  const isAuthorized = getFromLocalStorage('token');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.PROFILE_GET });
  }, [dispatch]);

  if (!isAuthorized) return <Navigate to='/auth' />;
  if (!user) return <AppLoader />;

  return (
    <LayoutPage>
      <Routes>
        {user.role === UserRoleEnum.ADMIN ? (
          <>
            <Route index element={<Navigate to='/main/teachers' />} />
            <Route path='teachers' element={<Teachers />} />
            <Route path='students' element={<Students />} />
            <Route path='groups' element={<Groups />} />
            <Route path='specialities' element={<Specialities />} />
            <Route path='courses' element={<Course />} />
            <Route path='*' element={<Navigate to='/main/students' />} />
          </>
        ) : (
          <>
            <Route index element={<Navigate to='/main/home' />} />
            <Route path='home' element={<Home />} />
            <Route path='courses' element={<Course />} />
            <Route path='timetable' element={<Timetable />} />
            <Route path='grade' element={<GradeBook />} />
            <Route path='chat' element={<Chat />} />
            <Route path='settings' element={<Settings />} />
            <Route path='courses/:id' element={<CourseDetails />} />
            <Route path='courses/:id/settings' element={<CourseSettings />} />
            <Route path='*' element={<Navigate to='/main/home' />} />
          </>
        )}
      </Routes>
    </LayoutPage>
  );
};

export default MainRoutes;
