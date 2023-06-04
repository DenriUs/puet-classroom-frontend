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

interface IUpdate extends Partial<UserEntity> {
  groupId: string;
}

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

function* updateStudent(action: ReduxAction<IUpdate>) {
  if (!action.payload) return;
  const { id, firstName, lastName, middleName, email, phoneNumber, groupId } = action.payload;
  const response: APIResponse = yield call(Api.patch, `users/${id}`, {
    firstName,
    lastName,
    middleName,
    email,
    phoneNumber,
    groupId,
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

function* updateStudentPassword(action: ReduxAction<string>) {
  if (!action.payload) return;
  const response: APIResponse = yield call(Api.patch, `users/${action.payload}/password`);
  if (response.error) return;
  yield put(updateStudents(response.data.data));
  yield showSuccessMessage('Новий пароль для студента успішно згенеровано!');
}

function* watchRequests() {
  yield takeLatest(SagaAction.STUDENTS_GET, getStudents);
  yield takeLatest(SagaAction.STUDENT_GET, getStudent);
  yield takeLatest(SagaAction.STUDENT_CREATE, createStudent);
  yield takeLatest(SagaAction.STUDENT_UPDATE, updateStudent);
  yield takeLatest(SagaAction.STUDENT_DELETE, deleteStudent);
  yield takeLatest(SagaAction.STUDENT_PASSWORD_UPDATE, updateStudentPassword);
}

const StudentsSagas = [fork(watchRequests)];

export default StudentsSagas;
