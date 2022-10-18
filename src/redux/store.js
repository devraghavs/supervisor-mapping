import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";

import rootreducer from "./reducers/main";
import rootSaga from "./supervisorsagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const store = createStore(rootreducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export default store;

