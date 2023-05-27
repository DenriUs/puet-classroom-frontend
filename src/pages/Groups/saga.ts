import { put, takeLatest, fork, call } from 'redux-saga/effects';

import {
  Api,
  APIResponse,
  ReduxAction,
  SagaAction,
  loadData,
  showSuccessMessage,
  GroupEntity,
} from '../../common';
import {
  createGroups,
  deleteGroups,
  setGroup,
  setGroups,
  updateGroups,
} from '../../store/groups.slice';

interface IUpdate extends Partial<GroupEntity> {
  specialityId: string;
}

function* getGroups() {
  yield put(loadData('groups', setGroups));
}

function* getGroup(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `groups/${action.payload}`);
  if (response.error) return;
  yield put(setGroup(response.data.data));
}

function* createGroup(action: ReduxAction<GroupEntity>) {
  const response: APIResponse = yield call(Api.post, 'groups', action.payload);
  if (response.error) return;
  yield put(createGroups(response.data.data));
  yield showSuccessMessage('Групу успішно додано!');
}

function* updateGroup(action: ReduxAction<IUpdate>) {
  if (!action.payload) return;
  const { id, name, courseNumber, specialityId } = action.payload;
  const response: APIResponse = yield call(Api.patch, `groups/${id}`, {
    name,
    courseNumber,
    specialityId,
  });
  if (response.error) return;
  yield put(updateGroups(response.data.data));
  yield showSuccessMessage('Групу успішно оновлено!');
}

function* deleteGroup(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `groups/${action.payload}`);
  if (response.error) return;
  yield put(deleteGroups(action.payload));
  yield showSuccessMessage('Групу успішно видалено!');
}

function* watchRequests() {
  yield takeLatest(SagaAction.GROUPS_GET, getGroups);
  yield takeLatest(SagaAction.GROUP_GET, getGroup);
  yield takeLatest(SagaAction.GROUP_CREATE, createGroup);
  yield takeLatest(SagaAction.GROUP_UPDATE, updateGroup);
  yield takeLatest(SagaAction.GROUP_DELETE, deleteGroup);
}

const groupsSagas = [fork(watchRequests)];

export default groupsSagas;
