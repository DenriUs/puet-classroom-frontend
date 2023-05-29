import { put, takeLatest, fork, call } from 'redux-saga/effects';

import {
  Api,
  APIResponse,
  loadData,
  showSuccessMessage,
  CourseActivityEntity,
  CourseEntity,
  CourseParticipantEntity,
  CoursePassedAssignmentEntity,
  CourseTopicEntity,
  ReduxAction,
  SagaAction,
  CourseTimetableEntity,
} from '../../common';
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
  setGradeBooks,
  resetCourseGradeBook,
  setCourseMeeting,
  deleteCourseMeeting,
  setTimeTable,
  setTimeTables,
  deleteTimeTables,
  createCoursesTimeTable,
} from '../../store/courses.slice';

interface IActivity {
  id: string;
  data: CourseActivityEntity;
  file: File;
  fileId?: string;
}

interface IPassed {
  id: string;
  file: File;
}

interface IGradeBook {
  courseId: string;
  participantId?: string;
}

function* getCourses() {
  yield put(loadData('courses', setCourses));
}

function* getCourse(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/${action.payload}`);
  if (response.error) return;
  yield put(setCourse(response.data.data));
}

function* getCourseMeeting() {
  yield put(setCourseMeeting());
}

function* deleteCoursesMeeting() {
  yield put(deleteCourseMeeting());
}

function* createCourse(action: ReduxAction<CourseEntity>) {
  const response: APIResponse = yield call(Api.post, `courses`, action.payload);
  if (response.error) return;
  yield put(createCourses(response.data.data));
  yield showSuccessMessage('Курс успішно додано!');
}

function* updateCourse(action: ReduxAction<CourseEntity>) {
  if (!action.payload) return;
  const { id, name, description, meetingUrl } = action.payload;
  const response: APIResponse = yield call(Api.patch, `courses/${id}`, {
    name,
    description,
    meetingUrl,
  });
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

function* createActivity(action: ReduxAction<IActivity>) {
  if (!action.payload) return;
  const { id, data, file } = action.payload;
  const responseActivity: APIResponse = yield call(Api.post, `courses/topics/${id}/activities`, {
    title: data.title,
    type: data.type,
  });
  if (responseActivity.error) return;
  yield put(createCoursesTopicActivity(responseActivity.data.data));
  const responseFile: APIResponse = yield call(
    Api.uploadFile,
    responseActivity.data.data.file.id,
    file,
  );
  if (responseFile.error) return;
  yield showSuccessMessage('Матеріал успішно додано!');
}

function* updateActivity(action: ReduxAction<IActivity>) {
  if (!action.payload) return;
  const { id, data, file, fileId } = action.payload;
  const responseActivity: APIResponse = yield call(Api.patch, `courses/topics/activities/${id}`, {
    title: data.title,
  });
  if (responseActivity.error) return;
  yield put(updateCoursesTopicActivity(responseActivity.data.data));
  if (action.payload.file && fileId) {
    const responseFile: APIResponse = yield call(Api.uploadFile, fileId, file);
    if (responseFile.error) return;
  }
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

function* getPassedAssignmentForStudent(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.get,
    `courses/topics/activities/${action.payload}/passed-assignment`,
  );
  if (response.error) return;
  yield put(setPassedAssignment(response.data.data));
}

function* getGrateBookForTeacher(action: ReduxAction<IGradeBook>) {
  if (!action.payload) return;
  const { courseId, participantId } = action.payload;
  const response: APIResponse = yield call(
    Api.get,
    `courses/${courseId}/topics/activities/passed-assignments?participantId=${participantId}`,
  );
  if (response.error) return;
  yield put(setGradeBooks(response.data.data.result));
}

function* getGrateBookForStudent(action: ReduxAction<IGradeBook>) {
  if (!action.payload) return;
  const { courseId } = action.payload;
  const response: APIResponse = yield call(
    Api.get,
    `courses/${courseId}/topics/activities/passed-assignments`,
  );
  if (response.error) return;
  yield put(setGradeBooks(response.data.data.result));
}

function* createPassedAssignment(action: ReduxAction<IPassed>) {
  if (!action.payload?.file) return;
  const { id, file } = action.payload;
  const passed: APIResponse = yield call(
    Api.post,
    `courses/topics/activities/${id}/passed-assignments`,
  );
  if (passed.error) return;
  yield put(createPassedAssignments(passed.data.data));
  const responseFile: APIResponse = yield call(Api.uploadFile, passed.data.data.file.id, file);
  if (responseFile.error) return;
  yield showSuccessMessage('Роботу відправлено на перевірку!');
}

function* deletePassedAssignment(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.delete,
    `courses/topics/activities/passed-assignments/${action.payload}`,
  );
  if (response.error) return;
  yield put(deletePassedAssignments());
  yield showSuccessMessage('Роботу успішно видалено!');
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

function* getTimeTable(action: ReduxAction<string>) {
  const response: APIResponse = yield call(
    Api.get,
    `courses/timetables?startDate=${action.payload}&endDate=${action.payload}`,
  );
  if (response.error) return;
  console.log(response.data.data);
  yield put(setTimeTable(response.data.data));
}

function* getCourseTimeTables(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.get, `courses/${action.payload}/timetables`);
  if (response.error) return;
  yield put(setTimeTables(response.data.data.result));
}

function* createCourseTimeTables(action: ReduxAction<CourseTimetableEntity>) {
  if (!action.payload) return;
  const { id, date, startTime, endTime } = action.payload;
  const response: APIResponse = yield call(Api.post, `courses/${id}/timetables`, {
    date,
    startTime,
    endTime,
  });
  if (response.error) return;
  yield put(createCoursesTimeTable(response.data.data));
  yield showSuccessMessage('Дату успішно додано!');
}

function* deleteTimeTable(action: ReduxAction<string>) {
  const response: APIResponse = yield call(Api.delete, `courses/timetables/${action.payload}`);
  if (response.error) return;
  yield put(deleteTimeTables(action.payload));
  yield showSuccessMessage('День успішно видалено!');
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

function* resetCourseGrade() {
  yield put(resetCourseGradeBook());
}

function* resetCourses() {
  yield put(resetCourse());
}

function* watchRequests() {
  yield takeLatest(SagaAction.COURSES_GET, getCourses);
  yield takeLatest(SagaAction.COURSE_GET, getCourse);
  yield takeLatest(SagaAction.COURSE_CREATE, createCourse);
  yield takeLatest(SagaAction.COURSE_UPDATE, updateCourse);
  yield takeLatest(SagaAction.COURSE_MEETING_GET, getCourseMeeting);
  yield takeLatest(SagaAction.COURSE_MEETING_DELETE, deleteCoursesMeeting);
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
  yield takeLatest(
    SagaAction.COURSES_PASSED_ASSIGNMENT_GET_FOR_STUDENT,
    getPassedAssignmentForStudent,
  );
  yield takeLatest(SagaAction.COURSES_PASSED_ASSIGNMENT_CREATE, createPassedAssignment);
  yield takeLatest(SagaAction.COURSES_GRADE_BOOK_GET_FOR_TEACHER, getGrateBookForTeacher);
  yield takeLatest(SagaAction.COURSES_GRADE_BOOK_GET_FOR_STUDENT, getGrateBookForStudent);
  yield takeLatest(SagaAction.COURSES_PASSED_ASSIGNMENT_DELETE, deletePassedAssignment);
  yield takeLatest(SagaAction.COURSES_PASSED_ASSIGNMENT_UPDATE, updatePassedAssignment);
  yield takeLatest(SagaAction.COURSES_TIMETABLE_GET, getTimeTable);
  yield takeLatest(SagaAction.COURSES_TIMETABLES_GET, getCourseTimeTables);
  yield takeLatest(SagaAction.COURSES_TIMETABLE_DELETE, deleteTimeTable);
  yield takeLatest(SagaAction.COURSES_TIMETABLE_CREATE, createCourseTimeTables);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_GET, getParticipants);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_CREATE, createParticipant);
  yield takeLatest(SagaAction.COURSES_PARTICIPANTS_DELETE, deleteParticipant);
  yield takeLatest(SagaAction.COURSES_GRADE_BOOK_RESET, resetCourseGrade);
  yield takeLatest(SagaAction.COURSES_RESET, resetCourses);
}

const coursesSagas = [fork(watchRequests)];

export default coursesSagas;
