import { Navigate, Route, Routes } from 'react-router';

import { getFromLocalStorage } from '../common/helpers';
import CoursePage from './Courses/Course';
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
        <Route path='course/:id' element={<CoursePage />} />
        <Route path='*' element={<Navigate to='/main/home' />} />
      </Routes>
    </LayoutPage>
  );
};

export default MainRoutes;
