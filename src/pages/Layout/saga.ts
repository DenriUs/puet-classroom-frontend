import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { APIResponse } from '../../common/api';
import Api from '../../common/api/services/api';
import { loadData } from '../../common/helpers';

import { SagaAction } from '../../common/types';
import { setProfile, setUsers } from '../../store/auth.slice';

function* getProfile() {
  const response: APIResponse = yield call(Api.get, `auth/profile`, { eager: true });
  if (response.error) return;
  yield put(setProfile(response.data.data));
}

function* getUsers() {
  yield put(loadData('users', setUsers));
}

function* watchRequests() {
  yield takeLatest(SagaAction.PROFILE_GET, getProfile);
  yield takeLatest(SagaAction.USERS_GET, getUsers);
}

const authSagas = [fork(watchRequests)];

export default authSagas;
