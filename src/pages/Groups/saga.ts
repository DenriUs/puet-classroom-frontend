import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { APIResponse } from '../../common/api';
import { loadData } from '../../common/helpers';
import { ReduxAction, SagaAction } from '../../common/types';
import { setGroup, setGroups } from '../../store/groups.slice';

import Api from '../../common/api/services/api';

function* getGroups() {
  yield put(loadData('groups', setGroups));
}

function* getGroup(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `groups/${action.payload}`);
  if (response.error) return;
  yield put(setGroup(response.data.data));
}

function* watchRequests() {
  yield takeLatest(SagaAction.GROUPS_GET, getGroups);
  yield takeLatest(SagaAction.GROUP_GET, getGroup);
}

const groupsSagas = [fork(watchRequests)];

export default groupsSagas;
