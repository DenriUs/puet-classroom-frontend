import { Action } from 'redux';

import store from '../../store';

export enum SagaAction {
  LOAD_DATA = 'LOAD_DATA',
  LOG_OUT = 'LOG_OUT',

  PROFILE_GET = 'PROFILE_GET',

  COURSES_GET = 'COURSES_GET',
  COURSE_GET = 'COURSE_GET',
  COURSES_CREATE = 'COURSES_CREATE',
  COURSE_UPDATE = 'COURSE_UPDATE',
  COURSE_DELETE = 'COURSE_DELETE',
  COURSES_TOPICS_GET = 'COURSES_TOPICS_GET',
  COURSES_TOPIC_GET = 'COURSES_TOPIC_GET',
  COURSES_TOPICS_CREATE = 'COURSES_TOPICS_CREATE',
  COURSES_TOPICS_LECTURE_ACTIVITIES_GET = 'COURSES_TOPICS_LECTURE_ACTIVITIES_GET',
  COURSES_TOPICS_LECTURE_ASSIGNMENT_GET = 'COURSES_TOPICS_LECTURE_ASSIGNMENT_GET',
  COURSES_TOPICS_ACTIVITY_CREATE = 'COURSES_TOPICS_ACTIVITY_CREATE',
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
}

export interface ReduxAction<T = any> {
  type: SagaAction;
  payload?: T;
}
