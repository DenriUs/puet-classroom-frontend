import { notification } from 'antd';

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
