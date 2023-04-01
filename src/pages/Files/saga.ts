import { put, takeLatest, fork, call } from 'redux-saga/effects';

import { APIResponse } from '../../common/api';
import { loadData, showSuccessMessage } from '../../common/helpers';
import { FileEntity, ReduxAction, SagaAction } from '../../common/types';
import { deleteFiles, setFile, setFiles } from '../../store/files.slice';

import Api from '../../common/api/services/api';

interface FileUpload {
  id: string;
  file: File;
}

function* getFiles() {
  yield put(loadData('files', setFiles));
}

function* getFile(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `files/${action.payload}`);
  if (response.error) return;
  yield put(setFile(response.data.data));
}

function* createFile(action: ReduxAction<File>) {
  const response: APIResponse = yield call(Api.postFile, `files`, action.payload);
  if (response.error) return;
  yield showSuccessMessage('Файл успішно додано!');
}

function* uploadFile(action: ReduxAction<FileUpload>) {
  if (!action.payload) return;
  const { id, file } = action.payload;
  const response: APIResponse = yield call(Api.uploadFile, id, file);
  if (response.error) return;
  yield showSuccessMessage('Файл успішно оновлено!');
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
  yield takeLatest(SagaAction.FILE_UPLOAD, uploadFile);
  yield takeLatest(SagaAction.FILE_CREATE, createFile);
}

const filesSagas = [fork(watchRequests)];

export default filesSagas;
