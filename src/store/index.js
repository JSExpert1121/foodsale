import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
  sagaMiddleware.run(rootSaga);
  return store
}

