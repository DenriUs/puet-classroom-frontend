import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { APIResponse } from '../../common/api';
import Api from '../../common/api/services/api';

import { loadData, showSuccessMessage } from '../../common/helpers';
import {
  CourseActivityEntity,
  CourseEntity,
  CourseParticipantEntity,
  CoursePassedAssignmentEntity,
  CourseTopicEntity,
  ReduxAction,
  SagaAction,
} from '../../common/types';
import { MaterialSchemaType } from '../../components/modals/material';
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
  setCourseTopicActivity,
  updateCourses,
  createPassedAssignments,
  deletePassedAssignments,
  setPassedAssignments,
  setPassedAssignment,
  updateCourseTopic,
  updatePassed,
  updateCoursesTopicActivity,
} from '../../store/courses.slice';

interface ActivityCreate {
  id: string;
  data: CourseActivityEntity;
  file: File;
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
  yield showSuccessMessage('Курс успішно додано!');
}

function* updateCourse(action: ReduxAction<CourseEntity>) {
  if (!action.payload) return;
  const { id, name, description } = action.payload;
  const response: APIResponse = yield call(Api.patch, `courses/${id}`, { name, description });
  if (response.error) return;
  yield put(updateCourses(response.data.data));
  yield showSuccessMessage('Курс успішно оновлено!');
}

function* deleteСourse(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `courses/${action.payload}`);
  if (response.error) return;
  yield put(deleteCourses(action.payload));
  yield showSuccessMessage('Курс успішно видалено!');
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

function* createTopic(action: ReduxAction<CourseTopicEntity>) {
  if (!action.payload) return;
  const { id, title } = action.payload;
  const response: APIResponse = yield call(Api.post, `courses/${id}/topics`, { title });
  if (response.error) return;
  yield put(createCoursesTopic(response.data.data));
  yield showSuccessMessage('Тему успішно додано!');
}

function* updateTopic(action: ReduxAction<CourseTopicEntity>) {
  if (!action.payload) return;
  const { id, title } = action.payload;
  const response: APIResponse = yield call(Api.patch, `courses/topics/${id}`, { title });
  if (response.error) return;
  yield put(updateCourseTopic(response.data.data));
  yield showSuccessMessage('Тему успішно оновлено!');
}

function* deleteTopic(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `courses/topics/${action.payload}`);
  if (response.error) return;
  yield put(deleteCourseTopic(action.payload));
  yield showSuccessMessage('Тему видалено з курсу!');
}

function* getActivities(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/topics/${action.payload}/activities`);
  if (response.error) return;
  yield put(setCourseTopicActivities(response.data.data.result));
}

function* getActivity(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/topics/activities/${action.payload}`);
  if (response.error) return;
  yield put(setCourseTopicActivity(response.data.data));
}

function* createActivity(action: ReduxAction<ActivityCreate>) {
  if (!action.payload) return;
  const { id, data, file } = action.payload;
  const responseActivity: APIResponse = yield call(Api.post, `courses/topics/${id}/activities`, {
    title: data.title,
    type: data.type,
  });
  if (responseActivity.error) return;
  yield put(createCoursesTopicActivity(responseActivity.data.data));
  const responseFile: APIResponse = yield call(Api.uploadFile, responseActivity.data.data.file.id, file);
  if (responseFile.error) return;
  yield showSuccessMessage('Матеріал успішно додано!');
}

function* updateActivity(action: ReduxAction<CourseActivityEntity>) {
  if (!action.payload) return;
  const { id, title } = action.payload;
  const response: APIResponse = yield call(Api.patch, `courses/topics/activities/${id}`, {
    title,
  });
  if (response.error) return;
  yield put(updateCoursesTopicActivity(response.data.data));
  yield showSuccessMessage('Матеріал успішно оновлено!');
}

function* deleteActivity(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.delete,
    `courses/topics/activities/${action.payload}`,
  );
  if (response.error) return;
  const id = action.payload;
  yield put(deleteCourseActivity({ id, ...response.data.data }));
  yield showSuccessMessage('Матеріал видалено з курсу!');
}

function* getPassedAssignments(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.get,
    `courses/topics/activities/${action.payload}/passed-assignments`,
  );
  if (response.error) return;
  yield put(setPassedAssignments(response.data.data.result));
}

function* getPassedAssignment(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.get,
    `courses/topics/activities/passed-assignments/${action.payload}`,
  );
  if (response.error) return;
  yield put(setPassedAssignment(response.data.data));
}

function* createPassedAssignment(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.post,
    `courses/topics/activities/${action.payload}/passed-assignments`,
  );
  if (response.error) return;
  yield put(createPassedAssignments(response.data.data));
}

function* deletePassedAssignment(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.delete,
    `courses/topics/activities/passed-assignments/${action.payload}`,
  );
  if (response.error) return;
  yield put(deletePassedAssignments(response.data.data));
}

function* updatePassedAssignment(action: ReduxAction<CoursePassedAssignmentEntity>) {
  if (!action.payload) return;
  const { id, mark } = action.payload;
  const response: APIResponse = yield call(
    Api.patch,
    `courses/topics/activities/passed-assignments/${id}`,
    { mark },
  );
  if (response.error) return;
  yield put(updatePassed(response.data.data));
  yield showSuccessMessage('Оцінку успішно оновлено!');
}

function* getParticipants(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/${action.payload}/participants`);
  if (response.error) return;
  yield put(setCoursesParticipants(response.data.data.result));
}

function* createParticipant(action: ReduxAction<CourseParticipantEntity>) {
  if (!action.payload) return;
  const { course, id } = action.payload;
  const response: APIResponse = yield call(Api.post, `courses/${course}/participants`, { id });
  if (response.error) return;
  yield put(createCoursesParticipant(response.data.data));
  yield showSuccessMessage('Студента на курс успішно додано!');
}

function* deleteParticipant(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `courses/participants/${action.payload}`);
  if (response.error) return;
  yield put(deleteCourseParticipant(action.payload));
  yield showSuccessMessage('Студента видалено з курсу!');
}

function* resetCourses() {
  yield put(resetCourse());
}

function* watchRequests() {
  yield takeLatest(SagaAction.COURSES_GET, getCourses);
  yield takeLatest(SagaAction.COURSE_GET, getCourse);
  yield takeLatest(SagaAction.COURSE_CREATE, createCourse);
  yield takeLatest(SagaAction.COURSE_UPDATE, updateCourse);
  yield takeLatest(SagaAction.COURSE_DELETE, deleteСourse);
  yield takeLatest(SagaAction.COURSES_TOPICS_GET, getTopics);
  yield takeLatest(SagaAction.COURSES_TOPIC_GET, getTopic);
  yield takeLatest(SagaAction.COURSES_TOPICS_CREATE, createTopic);
  yield takeLatest(SagaAction.COURSES_TOPIC_UPDATE, updateTopic);
  yield takeLatest(SagaAction.COURSES_TOPIC_DELETE, deleteTopic);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITIES_GET, getActivities);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITY_GET, getActivity);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITY_CREATE, createActivity);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITY_UPDATE, updateActivity);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITY_DELETE, deleteActivity);
  yield takeLatest(SagaAction.COURSES_PASSED_ASSIGNMENTS_GET, getPassedAssignments);
  yield takeLatest(SagaAction.COURSES_PASSED_ASSIGNMENT_GET, getPassedAssignment);
  yield takeLatest(SagaAction.COURSES_PASSED_ASSIGNMENT_CREATE, createPassedAssignment);
  yield takeLatest(SagaAction.COURSES_PASSED_ASSIGNMENT_DELETE, deletePassedAssignment);
  yield takeLatest(SagaAction.COURSES_PASSED_ASSIGNMENT_UPDATE, updatePassedAssignment);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_GET, getParticipants);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_CREATE, createParticipant);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_DELETE, deleteParticipant);
  yield takeLatest(SagaAction.COURSES_RESET, resetCourses);
}

const coursesSagas = [fork(watchRequests)];

export default coursesSagas;
