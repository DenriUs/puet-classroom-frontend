import { combineReducers } from 'redux';

import { ReduxAction, SagaAction } from './common/types';

const mainReducer = combineReducers({});

const rootReducer = (state: any, action: ReduxAction) => {
  if (action.type === SagaAction.LOG_OUT) {
    return mainReducer(undefined, action);
  }
  return mainReducer(state, action);
};

export default rootReducer;
