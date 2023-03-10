import { all } from 'redux-saga/effects';

import coursesSagas from './pages/Courses/saga';
import filesSagas from './pages/Files/saga';
import groupsSagas from './pages/Groups/saga';
import authSagas from './pages/Layout/saga';
import appSagas from './saga';

export default function* rootSaga() {
  yield all([...appSagas, ...coursesSagas, ...authSagas, ...filesSagas, ...groupsSagas]);
}
