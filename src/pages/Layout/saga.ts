import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { Api, APIResponse, SagaAction } from '../../common';
import { setProfile } from '../../store/profile.slice';

function* getProfile() {
  const response: APIResponse = yield call(Api.get, `auth/profile`, { eager: true });
  if (response.error) return;
  yield put(setProfile(response.data.data));
}

function* watchRequests() {
  yield takeLatest(SagaAction.PROFILE_GET, getProfile);
}

const profileSagas = [fork(watchRequests)];

export default profileSagas;
