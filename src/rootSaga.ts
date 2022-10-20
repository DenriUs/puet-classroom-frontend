import { all } from 'redux-saga/effects';

import coursesSagas from './pages/Courses/saga';
import appSagas from './saga';

export default function* rootSaga() {
  yield all([...appSagas, ...coursesSagas]);
}
