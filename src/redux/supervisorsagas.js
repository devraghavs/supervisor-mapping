import * as types from "./actions/actionTypes";
import { takeEvery, put, all, fork, call } from "@redux-saga/core/effects";
import {
  loadSupervisorsSuccess,
  loadSupervisorsError,
} from "./actions/actions";
import { loadSupervisorsApi } from "../utils/api";
export function* onLoadSupervisorStartAsync() {
  try {
    const res = yield call(loadSupervisorsApi);
    if (res.status === 200) {
      const users = [...res.data]
        .sort((a, b) => (a.supervisor < b.supervisor ? 1 : -1))
        .sort((c, d) => (c.supervisee.length < d.supervisee.length ? 1 : -1));

      let newData = users.map((item) => {
        item.checked = false;
        return item;
      });
      yield put(loadSupervisorsSuccess(newData));
    }
  } catch (error) {
    yield put(loadSupervisorsError(error.res.data));
  }
}

export function* onLoadSupervisor() {
  yield takeEvery(types.LOAD_SUPERVISORS_START, onLoadSupervisorStartAsync);
}

const supervisorSagas = [fork(onLoadSupervisor)];
export default function* rootSaga() {
  yield all([...supervisorSagas]);
}
