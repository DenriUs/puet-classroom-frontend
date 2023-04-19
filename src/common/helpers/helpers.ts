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

interface Option {
  value: string;
  label: string;
}

export const getFromLocalStorage = (key: LocalStorageData): string | null =>
  localStorage.getItem(key);

export const setToLocalStorage = (key: LocalStorageData, value: string) =>
  localStorage.setItem(key, value);

export const removeFromLocalStorage = (key: LocalStorageData) => localStorage.removeItem(key);

export const showSuccessMessage = (message: string, description?: string) =>
  notification.success({ message, description });

export const showErrorMessage = (message: string, description?: string) =>
  notification.error({ message, description });

export const showInfoMessage = (message: string, description?: string) =>
  notification.info({ message, description });

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

export const getUserShortName = (user: Partial<UserEntity | undefined>) =>
  `${user?.firstName} ${user?.lastName}`;

export const getUserFullName = (user: Partial<UserEntity | undefined>) =>
  `${user?.lastName} ${user?.firstName} ${user?.middleName}`;

export const getFullDate = (date: Date) => {
  const fullDate = new Date(date);
  return fullDate.toLocaleDateString();
};

export const getDaysInSystem = (date: Date) => {
  const msInDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs(Number(new Date()) - Number(new Date(date))) / msInDay);
};

export const getCurrentDate = () => {
  const now = new Date();
  return now.toLocaleDateString();
};

export const getTypeActivity = (type: CourseActivityTypeEnum) =>
  type === 'LECTURE' ? 'Лекція' : 'Практична';

export const getVerifiedWorks = (
  passedAssignment: Partial<CoursePassedAssignmentEntity[] | undefined>,
) => passedAssignment?.filter((passed) => passed?.mark !== null).length;

export const getStatusAssignment = (
  passedAssignment: Partial<CoursePassedAssignmentEntity | undefined>,
) => {
  if (!passedAssignment) return 'Немає спроб';
  if (passedAssignment.mark || passedAssignment.mark === 0) return 'Оцінено';
  return 'Здано';
};

export const getMarkAssignment = (
  passedAssignment: Partial<CoursePassedAssignmentEntity | undefined>,
) => (passedAssignment?.mark === null || !passedAssignment ? 0 : passedAssignment?.mark);

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const filterOption = (input: string, option: Option | undefined) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const filterSort = (optionA: Option, optionB: Option) =>
  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase());

export const randomID = (length: number) => {
  let result = '';
  if (result) return result;
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  length = length || 5;
  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
};

export const getUrlParams = (url = window.location.href) => {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
};
