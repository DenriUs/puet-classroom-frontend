import { LocalStorageData } from './types';

export const getFromLocalStorage = (key: LocalStorageData): string | null =>
  localStorage.getItem(key);

export const setToLocalStorage = (key: LocalStorageData, value: string) =>
  localStorage.setItem(key, value);

export const removeFromLocalStorage = (key: LocalStorageData) => localStorage.removeItem(key);
