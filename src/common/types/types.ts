import { Action } from 'redux';

import store from '../../store';

export enum SagaAction {
  LOAD_DATA = 'LOAD_DATA',
  LOG_OUT = 'LOG_OUT',
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type PaginationQueryParams =
  | {
      page: number;
      take: number;
      asc?: string;
      desc?: string;
      select?: string[];
      search?: string;
    }
  | { [key: string]: string };

export interface PaginationResult<T> {
  result: T[];
  total: number;
}

export type SortingDirection = 'ascend' | 'descend';

export interface LoadDataPayload<T = any> {
  endpoint: string;
  action: (data: T) => Action;
  query?: Record<string, string | number>;
  page: number;
  take: number;
  search?: string;
  sortingField?: string;
  sortingDirection?: SortingDirection;
}

export interface ReduxAction<T = any> {
  type: SagaAction;
  payload?: T;
}
