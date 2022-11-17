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
  setCourseTopicActivitiesAssignment,
  setCourseTopicActivitiesLecture,
  createCoursesParticipant,
  setCoursesParticipants,
  deleteCourseParticipant,
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

function* getLectureActivities(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.get,
    `courses/topics/${action.payload}/activities?type=LECTURE`,
  );
  if (response.error) return;
  yield put(setCourseTopicActivitiesLecture(response.data.data.result));
}

function* getAssignmentActivities(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.get,
    `courses/topics/${action.payload}/activities?type=ASSIGNMENT`,
  );
  if (response.error) return;
  yield put(setCourseTopicActivitiesAssignment(response.data.data.result));
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

function* watchRequests() {
  yield takeLatest(SagaAction.COURSES_GET, getCourses);
  yield takeLatest(SagaAction.COURSE_GET, getCourse);
  yield takeLatest(SagaAction.COURSES_CREATE, createCourse);
  yield takeLatest(SagaAction.COURSES_TOPICS_GET, getTopics);
  yield takeLatest(SagaAction.COURSES_TOPIC_GET, getTopic);
  yield takeLatest(SagaAction.COURSES_TOPICS_CREATE, createTopic);
  yield takeLatest(SagaAction.COURSES_TOPICS_LECTURE_ACTIVITIES_GET, getLectureActivities);
  yield takeLatest(SagaAction.COURSES_TOPICS_LECTURE_ASSIGNMENT_GET, getAssignmentActivities);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITY_CREATE, createActivity);
  yield takeLatest(SagaAction.COURSES_GET_PARTICIPANTS, getParticipants);
  yield takeLatest(SagaAction.COURSES_CREATE_PARTICIPANTS, createParticipant);
  yield takeLatest(SagaAction.COURSES_DELETE_PARTICIPANTS, deleteParticipant);
}

const coursesSagas = [fork(watchRequests)];

export default coursesSagas;
