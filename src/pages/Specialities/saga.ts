import { put, takeLatest, fork, call } from 'redux-saga/effects';

import {
  Api,
  APIResponse,
  ReduxAction,
  SagaAction,
  loadData,
  showSuccessMessage,
  SpecialityEntity,
} from '../../common';
import {
  createSpecialities,
  deleteSpecialities,
  setSpecialities,
  setSpeciality,
  updateSpecialities,
} from '../../store/specialities.slice';

function* getSpecialities() {
  yield put(loadData('specialities', setSpecialities));
}

function* getSpeciality(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `specialities/${action.payload}`);
  if (response.error) return;
  yield put(setSpeciality(response.data.data));
}

function* createSpeciality(action: ReduxAction<SpecialityEntity>) {
  const response: APIResponse = yield call(Api.post, 'specialities', action.payload);
  if (response.error) return;
  yield put(createSpecialities(response.data.data));
  yield showSuccessMessage('Спеціальність успішно додано!');
}

function* updateSpeciality(action: ReduxAction<SpecialityEntity>) {
  if (!action.payload) return;
  const { id, name } = action.payload;
  const response: APIResponse = yield call(Api.patch, `specialities/${id}`, { name });
  if (response.error) return;
  yield put(updateSpecialities(response.data.data));
  yield showSuccessMessage('Спеціальність успішно оновлено!');
}

function* deleteSpeciality(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `specialities/${action.payload}`);
  if (response.error) return;
  yield put(deleteSpecialities(action.payload));
  yield showSuccessMessage('Спеціальність успішно видалено!');
}

function* watchRequests() {
  yield takeLatest(SagaAction.SPECIALITIES_GET, getSpecialities);
  yield takeLatest(SagaAction.SPECIALITY_GET, getSpeciality);
  yield takeLatest(SagaAction.SPECIALITY_CREATE, createSpeciality);
  yield takeLatest(SagaAction.SPECIALITY_UPDATE, updateSpeciality);
  yield takeLatest(SagaAction.SPECIALITY_DELETE, deleteSpeciality);
}

const specialitiesSagas = [fork(watchRequests)];

export default specialitiesSagas;
