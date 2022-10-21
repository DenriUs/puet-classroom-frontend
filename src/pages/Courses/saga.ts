import { put, takeLatest, fork } from 'redux-saga/effects';

import { loadData } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { setCourses } from '../../store/courses.slice';

function* getCourses() {
  yield put(loadData('courses', setCourses));
}

function* watchRequests() {
  yield takeLatest(SagaAction.COURSES_GET, getCourses);
}

const coursesSagas = [fork(watchRequests)];

export default coursesSagas;
