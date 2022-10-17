import { Routes, Route, Navigate } from 'react-router';

import { getFromLocalStorage } from './common/helpers';
import LoginModal from './components/modals/login';
import MainRoutes from './pages/MainRoutes';

function App() {
  return (
    <Routes>
      <Route
        index
        element={getFromLocalStorage('token') ? <Navigate to='/main' /> : <Navigate to='/main' />}
      />
      <Route path='/auth' element={<LoginModal />} />
      <Route path='/main/*' element={<MainRoutes />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
