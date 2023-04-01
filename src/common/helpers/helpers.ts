import { notification } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { Action } from 'redux';
import { SelectEffect, select as sagaSelect } from 'redux-saga/effects';

import {
  CourseActivityTypeEnum,
  CoursePassedAssignmentEntity,
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

export const getVerifiedWorks = (
  passedAssignment: Partial<CoursePassedAssignmentEntity[] | undefined>,
) => {
  return passedAssignment?.filter((passed) => passed?.mark !== null).length;
};

export const getStatusAssignment = (
  passedAssignment: Partial<CoursePassedAssignmentEntity | undefined>,
) => {
  return !passedAssignment ? 'Немає спроб' : !passedAssignment?.mark ? 'Здано' : 'Оцінено';
};

export const getMarkAssignment = (
  passedAssignment: Partial<CoursePassedAssignmentEntity | undefined>,
) => {
  return passedAssignment?.mark === null || !passedAssignment ? 0 : passedAssignment?.mark;
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
