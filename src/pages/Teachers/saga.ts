import { put, takeLatest, fork, call } from 'redux-saga/effects';

import {
  Api,
  APIResponse,
  SagaAction,
  loadData,
  UserEntity,
  ReduxAction,
  showSuccessMessage,
  UserRoleEnum,
} from '../../common';
import {
  createTeachers,
  deleteTeachers,
  setTeachers,
  updateTeachers,
} from '../../store/teachers.slice';

function* getTeachers() {
  yield put(loadData('users', setTeachers, { role: UserRoleEnum.TEACHER }));
}

function* createTeacher(action: ReduxAction<UserEntity>) {
  const response: APIResponse = yield call(Api.post, 'users', action.payload);
  if (response.error) return;
  yield put(createTeachers(response.data.data));
  yield showSuccessMessage('Викладача успішно додано!');
}

function* updateTeacher(action: ReduxAction<UserEntity>) {
  if (!action.payload) return;
  const { id, firstName, lastName, middleName, email, phoneNumber } = action.payload;
  const response: APIResponse = yield call(Api.patch, `users/${id}`, {
    firstName,
    lastName,
    middleName,
    email,
    phoneNumber,
  });
  if (response.error) return;
  yield put(updateTeachers(response.data.data));
  yield showSuccessMessage('Викладача успішно оновлено!');
}

function* deleteTeacher(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `users/${action.payload}`);
  if (response.error) return;
  yield put(deleteTeachers(action.payload));
  yield showSuccessMessage('Користувача успішно видалено!');
}

function* watchRequests() {
  yield takeLatest(SagaAction.TEACHERS_GET, getTeachers);
  yield takeLatest(SagaAction.TEACHER_CREATE, createTeacher);
  yield takeLatest(SagaAction.TEACHER_UPDATE, updateTeacher);
  yield takeLatest(SagaAction.TEACHER_DELETE, deleteTeacher);
}

const TeachersSagas = [fork(watchRequests)];

export default TeachersSagas;
