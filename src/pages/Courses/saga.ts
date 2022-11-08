import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { APIResponse } from '../../common/api';
import Api from '../../common/api/services/api';

import { loadData } from '../../common/helpers';
import { CourseActivityTypeEnum, ReduxAction, SagaAction } from '../../common/types';
import {
  setCourses,
  setCourse,
  setCourseTopics,
  setCourseTopicActivities,
  createCourses,
  createCoursesTopic,
  setCourseTopic,
  createCoursesTopicActivity,
} from '../../store/courses.slice';

interface Topic {
  id: string;
  title: string;
}

interface Activity {
  courseTopicId: string;
  title: string;
  type: CourseActivityTypeEnum;
}

function* getCourses() {
  yield put(loadData('courses', setCourses));
}

function* getCourse(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/${action.payload}`);
  if (response.error) return;
  yield put(setCourse(response.data.data));
}

function* createCourse(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.post, `courses`, action.payload);
  if (response.error) return;
  yield put(createCourses(response.data.data));
}

function* getTopics(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/${action.payload}/topics`);
  if (response.error) return;
  yield put(setCourseTopics(response.data.data.result));
}

function* getTopic(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/topics/${action.payload}`);
  if (response.error) return;
  yield put(setCourseTopic(response.data.data));
}

function* createTopic(action: ReduxAction<Topic>) {
  if (!action.payload) return;
  const { id, title } = action.payload;
  const response: APIResponse = yield call(Api.post, `courses/${id}/topics`, { title });
  if (response.error) return;
  yield put(createCoursesTopic(response.data.data));
}

function* getActivities(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/topics/${action.payload}/activities`);
  if (response.error) return;
  yield put(setCourseTopicActivities(response.data.data.result));
}

function* createActivity(action: ReduxAction<Activity>) {
  if (!action.payload) return;
  const { courseTopicId, title, type } = action.payload;
  const response: APIResponse = yield call(Api.post, `courses/topics/${courseTopicId}/activities`, {
    title,
    type,
  });
  if (response.error) return;
  yield put(createCoursesTopicActivity(response.data.data));
}

function* watchRequests() {
  yield takeLatest(SagaAction.COURSES_GET, getCourses);
  yield takeLatest(SagaAction.COURSE_GET, getCourse);
  yield takeLatest(SagaAction.COURSES_CREATE, createCourse);
  yield takeLatest(SagaAction.COURSES_TOPICS_GET, getTopics);
  yield takeLatest(SagaAction.COURSES_TOPIC_GET, getTopic);
  yield takeLatest(SagaAction.COURSES_TOPICS_CREATE, createTopic);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITIES_GET, getActivities);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITY_CREATE, createActivity);
}

const coursesSagas = [fork(watchRequests)];

export default coursesSagas;
