import authSaga from 'containers/Authentication/saga';
import { call } from 'redux-saga/effects';

export default function* rootSaga() {
  yield call(authSaga);
}
