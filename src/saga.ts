import { call, fork, put, takeLatest } from 'redux-saga/effects';

import { APIResponse } from './common/api';
import Api from './common/api/services/api';
import { getSortingDirectionShortName, constructPaginationUrlQuery } from './common/helpers';
import { LoadDataPayload, ReduxAction, SagaAction } from './common/types';

function* loadData(action: ReduxAction<LoadDataPayload>) {
  if (!action.payload) return;
  const { page, take, search, sortingField, sortingDirection } = action.payload;
  const shortSortingDirection = getSortingDirectionShortName(sortingDirection);
  const response: APIResponse = yield call(
    Api.get,
    `${action.payload.endpoint}?${constructPaginationUrlQuery({
      page,
      take,
      search: search?.trim(),
      [shortSortingDirection]: sortingField,
      ...action.payload.query,
    })}`,
  );
  if (response.error) return;
  yield put(action.payload.action(response.data));
}

function* watchRequests() {
  yield takeLatest(SagaAction.LOAD_DATA, loadData);
}

const appSagas = [fork(watchRequests)];

export default appSagas;
