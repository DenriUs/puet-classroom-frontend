import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { APIResponse } from '../../common/api';
import Api from '../../common/api/services/api';

import { loadData } from '../../common/helpers';
import { CourseActivityTypeEnum, ReduxAction, SagaAction } from '../../common/types';
import {
  setCourses,
  setCourse,
  setCourseTopics,
  createCourses,
  createCoursesTopic,
  setCourseTopic,
  createCoursesTopicActivity,
  setCourseTopicActivities,
  createCoursesParticipant,
  setCoursesParticipants,
  deleteCourseParticipant,
  deleteCourseTopic,
  deleteCourses,
  deleteCourseActivity,
  resetCourse,
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

interface Paricipant {
  courseId: string;
  id: string;
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

function* deleteСourse(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `courses/${action.payload}`);
  if (response.error) return;
  yield put(deleteCourses(action.payload));
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

function* deleteTopic(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `courses/topics/${action.payload}`);
  console.log(response);
  if (response.error) return;
  yield put(deleteCourseTopic(action.payload));
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

function* deleteActivity(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.delete,
    `courses/topics/activities/${action.payload}`,
  );
  if (response.error) return;
  const id = action.payload;
  yield put(deleteCourseActivity({ id, ...response.data.data }));
}

function* getParticipants(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/${action.payload}/participants`);
  if (response.error) return;
  yield put(setCoursesParticipants(response.data.data.result));
}

function* createParticipant(action: ReduxAction<Paricipant>) {
  if (!action.payload) return;
  const { courseId, id } = action.payload;
  const response: APIResponse = yield call(Api.post, `courses/${courseId}/participants`, { id });
  if (response.error) return;
  yield put(createCoursesParticipant(response.data.data));
}

function* deleteParticipant(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `courses/participants/${action.payload}`);
  if (response.error) return;
  yield put(deleteCourseParticipant(action.payload));
}

function* resetCourses() {
  yield put(resetCourse());
}

function* watchRequests() {
  yield takeLatest(SagaAction.COURSES_GET, getCourses);
  yield takeLatest(SagaAction.COURSE_GET, getCourse);
  yield takeLatest(SagaAction.COURSE_CREATE, createCourse);
  yield takeLatest(SagaAction.COURSE_DELETE, deleteСourse);
  yield takeLatest(SagaAction.COURSES_TOPICS_GET, getTopics);
  yield takeLatest(SagaAction.COURSES_TOPIC_GET, getTopic);
  yield takeLatest(SagaAction.COURSES_TOPICS_CREATE, createTopic);
  yield takeLatest(SagaAction.COURSES_TOPIC_DELETE, deleteTopic);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITIES_GET, getActivities);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITY_CREATE, createActivity);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITY_DELETE, deleteActivity);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_GET, getParticipants);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_CREATE, createParticipant);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_DELETE, deleteParticipant);
  yield takeLatest(SagaAction.COURSES_RESET, resetCourses);
}

const coursesSagas = [fork(watchRequests)];

export default coursesSagas;
