import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { APIResponse } from '../../common/api';
import Api from '../../common/api/services/api';

import { loadData } from '../../common/helpers';
import { ReduxAction, SagaAction } from '../../common/types';
import { setCourses, setCourse, setCourseTopic, setCourseTopicActivities } from '../../store/courses.slice';

function* getCourses() {
  yield put(loadData('courses', setCourses));
}

function* getCourse(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/${action.payload}`);
  if (response.error) return;
  yield put(setCourse(response.data.data));
}

function* getTopics(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/${action.payload}/topics`);
  if (response.error) return;
  yield put(setCourseTopic(response.data.data.result));
}

function* getActivities(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/topics/${action.payload}/activities`);
  if (response.error) return;
  yield put(setCourseTopicActivities(response.data.data.result));
}

function* watchRequests() {
  yield takeLatest(SagaAction.COURSES_GET, getCourses);
  yield takeLatest(SagaAction.COURSE_GET, getCourse);
  yield takeLatest(SagaAction.COURSES_TOPICS_GET, getTopics);
  yield takeLatest(SagaAction.COURSES_TOPICS_ACTIVITIES_GET, getActivities);
}

const coursesSagas = [fork(watchRequests)];

export default coursesSagas;
