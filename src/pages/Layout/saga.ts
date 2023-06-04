import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { Api, APIResponse, SagaAction, telegramBotLink } from '../../common';
import { setProfile } from '../../store/profile.slice';

function* getProfile() {
  const response: APIResponse = yield call(Api.get, 'auth/profile', { eager: true });
  if (response.error) return;
  yield put(setProfile(response.data.data));
}

function* getTelegramToken() {
  const response: APIResponse = yield call(Api.post, 'users/token-telegram');
  if (response.error) return;
  window.open(`${telegramBotLink}?start=${response.data.data.token}`, '_blank');
}

function* watchRequests() {
  yield takeLatest(SagaAction.PROFILE_GET, getProfile);
  yield takeLatest(SagaAction.TELEGRAM_TOKEN_GET, getTelegramToken);
}

const profileSagas = [fork(watchRequests)];

export default profileSagas;
