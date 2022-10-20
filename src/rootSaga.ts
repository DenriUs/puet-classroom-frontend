import { all } from 'redux-saga/effects';

import appSagas from './saga';

export default function* rootSaga() {
  yield all([...appSagas]);
}
