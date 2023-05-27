import { combineReducers } from 'redux';

import { ReduxAction, SagaAction } from './common/types';
import { paginatedDataReducer } from './store/paginated-data.slice';
import { coursesReducer } from './store/courses.slice';
import { teachersReducer } from './store/teachers.slice';
import { studentsReducer } from './store/students.slice';
import { profileReducer } from './store/profile.slice';
import { filesReducer } from './store/files.slice';
import { groupsReducer } from './store/groups.slice';
import { specialitiesReducer } from './store/specialities.slice';

const mainReducer = combineReducers({
  paginatedDataReducer,
  coursesReducer,
  teachersReducer,
  studentsReducer,
  profileReducer,
  filesReducer,
  groupsReducer,
  specialitiesReducer,
});

const rootReducer = (state: any, action: ReduxAction) => {
  if (action.type === SagaAction.LOG_OUT) {
    return mainReducer(undefined, action);
  }
  return mainReducer(state, action);
};

export default rootReducer;
