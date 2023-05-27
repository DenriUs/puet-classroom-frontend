import { takeLatest, fork, call } from 'redux-saga/effects';

import { Api, APIResponse, ReduxAction, SagaAction, setToLocalStorage } from '../../../common';

function* login(action: ReduxAction<any>) {
  const response: APIResponse = yield call(Api.post, 'auth/login', action.payload);
  if (response.error) return;
  setToLocalStorage('token', response.data.data.token);
  window.location.replace('/');
}

function* watchRequests() {
  yield takeLatest(SagaAction.LOG_IN, login);
}

const authSagas = [fork(watchRequests)];

export default authSagas;
