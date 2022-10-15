import { Navigate, Route, Routes } from 'react-router';

import { getFromLocalStorage } from '../common/helpers';
import Course from './Course/Course';
import Home from './Home/Home';
import LayoutPage from './Layout/Layout';

const MainRoutes = () => {
  const isAuthorized = getFromLocalStorage('token');

  if (!isAuthorized) {
    return <Navigate to='/auth' />;
  }

  return (
    <LayoutPage>
      <Routes>
        <Route index element={<Navigate to='/main/home' />} />
        <Route path='home' element={<Home />} />
        <Route path='course' element={<Course />} />
        <Route path='*' element={<Navigate to='/main/home' />} />
      </Routes>
    </LayoutPage>
  );
};

export default MainRoutes;
