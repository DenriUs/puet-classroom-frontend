import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { APIResponse } from '../../common/api';
import Api from '../../common/api/services/api';

import { SagaAction } from '../../common/types';
import { setProfile } from '../../store/auth.slice';

function* getProfile() {
  const response: APIResponse = yield call(Api.get, `auth/profile`);
  if (response.error) return;
  yield put(setProfile(response.data.data));
}

function* watchRequests() {
  yield takeLatest(SagaAction.PROFILE_GET, getProfile);
}

const authSagas = [fork(watchRequests)];

export default authSagas;
