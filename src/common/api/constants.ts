import { AxiosRequestConfig } from 'axios';

const { VITE_SERVER_URL, VITE_TELEGRAM_BOT_LINK } = import.meta.env;

const TIMEOUT_SECONDS = 20;

export const defaultConfig: AxiosRequestConfig = {
  baseURL: VITE_SERVER_URL,
  timeout: TIMEOUT_SECONDS * 1000,
};

export const errorsDictionary = {
  AUTH_INCORRECT_CREDENTIALS: 'Неправильно введена пошта або пароль',
};

export const telegramBotLink = VITE_TELEGRAM_BOT_LINK;
