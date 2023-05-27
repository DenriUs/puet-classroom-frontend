import { call, fork, put, takeLatest } from 'redux-saga/effects';

import { Api, APIResponse } from './common';
import {
  getSortingDirectionShortName,
  constructPaginationUrlQuery,
  selectState,
} from './common/helpers';
import { LoadDataPayload, ReduxAction, SagaAction } from './common/types';
import { setPaginatedDataTotal } from './store/paginated-data.slice';

function* loadData(action: ReduxAction<LoadDataPayload>) {
  if (!action.payload) return;
  const { page, take, search, sortingField, sortingDirection } = yield selectState(
    (state) => state.paginatedDataReducer,
  );
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
  yield put(action.payload.action(response.data.data.result));
  yield put(setPaginatedDataTotal(response.data.data.total));
}

function* watchRequests() {
  yield takeLatest(SagaAction.LOAD_DATA, loadData);
}

const appSagas = [fork(watchRequests)];

export default appSagas;
