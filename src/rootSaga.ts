import { all } from 'redux-saga/effects';

import coursesSagas from './pages/Courses/saga';
import filesSagas from './pages/Files/saga';
import groupsSagas from './pages/Groups/saga';
import teachersSagas from './pages/Teachers/saga';
import studentsSagas from './pages/Students/saga';
import profileSagas from './pages/Layout/saga';
import authSagas from './components/modals/login/saga';
import specialitiesSagas from './pages/Specialities/saga';
import appSagas from './saga';

export default function* rootSaga() {
  yield all([
    ...appSagas,
    ...coursesSagas,
    ...authSagas,
    ...filesSagas,
    ...groupsSagas,
    ...teachersSagas,
    ...studentsSagas,
    ...profileSagas,
    ...specialitiesSagas,
  ]);
}
