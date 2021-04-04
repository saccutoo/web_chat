import rootReducers from '../reducers/index';
import { createLogger } from 'redux-logger';
import { createStore,applyMiddleware } from 'redux';

export default function configureStore(sagaMiddleware: any) {
  if (__DEV__) {
    return createStore(rootReducers, applyMiddleware(sagaMiddleware, createLogger()));
  }
  return createStore(rootReducers, applyMiddleware(sagaMiddleware));
}
