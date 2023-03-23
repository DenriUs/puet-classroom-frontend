import { notification } from 'antd';
import { Action } from 'redux';
import { SelectEffect, select as sagaSelect } from 'redux-saga/effects';

import {
  CourseActivityTypeEnum,
  LoadDataPayload,
  PaginationQueryParams,
  ReduxAction,
  RootState,
  SagaAction,
  SortingDirection,
  UserEntity,
} from '../types';

import { LocalStorageData } from './types';

export const getFromLocalStorage = (key: LocalStorageData): string | null =>
  localStorage.getItem(key);

export const setToLocalStorage = (key: LocalStorageData, value: string) =>
  localStorage.setItem(key, value);

export const removeFromLocalStorage = (key: LocalStorageData) => localStorage.removeItem(key);

export const showSuccessMessage = (message: string, description?: string) =>
  notification.success({ message, description });

export const showErrorMessage = (message: string, description?: string) =>
  notification.error({ message, description });

export const selectState = <T>(selector: (s: RootState) => T): SelectEffect => sagaSelect(selector);

export const constructPaginationUrlQuery = (params: PaginationQueryParams) =>
  Object.entries(params)
    .map(([name, param]) => param && `${name}=${param}`)
    .filter((param) => param)
    .join('&');

export const getSortingDirectionShortName = (direction?: SortingDirection) =>
  direction === 'ascend' ? 'asc' : 'desc';

export const loadData = <T = any>(
  endpoint: string,
  action: (data: T) => Action,
  query?: Record<string, string | number>,
): ReduxAction<LoadDataPayload> => ({
  type: SagaAction.LOAD_DATA,
  payload: { endpoint, action, query },
});

export const getUserShortName = (user: Partial<UserEntity>) => `${user.firstName} ${user.lastName}`;

export const getUserFullName = (user: Partial<UserEntity | undefined>) =>
  `${user?.lastName} ${user?.firstName} ${user?.middleName}`;

export const getFullDate = (date: Date) => {
  const fullDate = new Date(date);
  return fullDate.toLocaleDateString();
};

export const getTypeActivity = (type: CourseActivityTypeEnum) => {
  return type == 'LECTURE' ? 'Лекція' : 'Практична';
};
