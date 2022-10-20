import { notification } from 'antd';
import { SelectEffect, select as sagaSelect } from 'redux-saga/effects';

import { PaginationQueryParams, RootState, SortingDirection } from '../types';

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
