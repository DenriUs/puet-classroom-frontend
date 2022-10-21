import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import reducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const preloadedState = {};

const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer,
  preloadedState,
  devTools: import.meta.env.VITE_NODE_ENV === 'development',
  enhancers: [applyMiddleware(...middlewares)],
});

sagaMiddleware.run(rootSaga);

export default store;
