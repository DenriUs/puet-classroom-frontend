import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { APIResponse } from '../../common/api';
import { loadData, showSuccessMessage } from '../../common/helpers';
import { ReduxAction, SagaAction } from '../../common/types';
import { deleteFiles, setFile, setFiles } from '../../store/files.slice';

import Api from '../../common/api/services/api';

function* getFiles() {
  yield put(loadData('files', setFiles));
}

function* getFile(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `files/${action.payload}`);
  if (response.error) return;
  yield put(setFile(response.data.data));
}

function* createFile(action: ReduxAction<File>) {
  yield showSuccessMessage('Файл успішно додано!');
}

function* deleteFile(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `files/${action.payload}`);
  if (response.error) return;
  yield put(deleteFiles(action.payload));
  yield showSuccessMessage('Файл успішно видалено!');
}

function* watchRequests() {
  yield takeLatest(SagaAction.FIELS_GET, getFiles);
  yield takeLatest(SagaAction.FILE_GET, getFile);
  yield takeLatest(SagaAction.FILE_DELETE, deleteFile);
  yield takeLatest(SagaAction.FILE_CREATE, createFile);
}

const filesSagas = [fork(watchRequests)];

export default filesSagas;
