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
  createStudents,
  deleteStudents,
  setStudents,
  setStudent,
  updateStudents,
} from '../../store/students.slice';

function* getStudents() {
  yield put(loadData('users', setStudents, { role: UserRoleEnum.STUDENT }));
}

function* getStudent(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `users/${action.payload}`);
  if (response.error) return;
  yield put(setStudent(response.data.data));
}

function* createStudent(action: ReduxAction<UserEntity>) {
  const response: APIResponse = yield call(Api.post, 'users', action.payload);
  if (response.error) return;
  yield put(createStudents(response.data.data));
  yield showSuccessMessage('Студента успішно додано!');
}

function* updateStudent(action: ReduxAction<UserEntity>) {
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
  yield put(updateStudents(response.data.data));
  yield showSuccessMessage('Студента успішно оновлено!');
}

function* deleteStudent(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `users/${action.payload}`);
  if (response.error) return;
  yield put(deleteStudents(action.payload));
  yield showSuccessMessage('Студента успішно видалено!');
}

function* watchRequests() {
  yield takeLatest(SagaAction.STUDENTS_GET, getStudents);
  yield takeLatest(SagaAction.STUDENT_GET, getStudent);
  yield takeLatest(SagaAction.STUDENT_CREATE, createStudent);
  yield takeLatest(SagaAction.STUDENT_UPDATE, updateStudent);
  yield takeLatest(SagaAction.STUDENT_DELETE, deleteStudent);
}

const StudentsSagas = [fork(watchRequests)];

export default StudentsSagas;
