import { takeLatest, put, call } from 'redux-saga/effects';
import { ActionTypes } from './constants';
import authService from 'services/authService';
import { IAction } from 'types';
import { action } from 'typesafe-actions';
import {
  instructorAuthenticated,
  instructorUnauthenticated,
  adminAuthenticated,
  adminUnauthenticated,
  setAuthenticatedUser,
} from './actions';
import Axios from 'axios';
import userService from 'services/userService';
import { UserRole } from 'types/user';

function setAxiosAuthHeaders(token: string) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function* studentIsAuthenticated(action: IAction) {
  const authToken = action.payload;
  authService.storeStudentToken(authToken);
  setAxiosAuthHeaders(authToken);
  yield fetchAuthenticatedUserInfo(authToken);

  //Unauthenticate other users
  adminIsUnauthenticated();
  instructorIsUnauthenticated();
}

function* studentIsUnauthenticated() {
  console.log('Student gone');
  authService.removeStudentToken();
}

function* instructorIsAuthenticated(action: IAction) {
  const authToken = action.payload;
  authService.storeInstructorToken(authToken);
  setAxiosAuthHeaders(authToken);
  yield fetchAuthenticatedUserInfo(authToken);

  //Unauthenticate other users
  studentIsUnauthenticated();
  adminIsUnauthenticated();
}

function* instructorIsUnauthenticated() {
  authService.removeInstructorToken();
}

function* adminIsAuthenticated(action: IAction) {
  const authToken = action.payload;
  authService.storeAdminToken(authToken);
  setAxiosAuthHeaders(authToken);
  yield fetchAuthenticatedUserInfo(authToken);

  //Unauthenticate other users
  instructorIsUnauthenticated();
  studentIsUnauthenticated();
}

function* adminIsUnauthenticated() {
  authService.removeAdminToken();
}

function* fetchAuthenticatedUserInfo(token: string, userRole?: UserRole) {
  const user = yield userService.getAuthenticatedUser().catch(err => {});
  switch (userRole) {
    case UserRole.ADMIN:
      if (user) {
        yield put(action(ActionTypes.ADMIN_AUTHENTICATED));
      } else {
        yield put(action(ActionTypes.ADMIN_UNAUTHENTICATED));
        yield adminIsUnauthenticated();
      }
      break;
    case UserRole.INSTRUCTOR:
      if (user) {
        yield put(action(ActionTypes.INSTRUCTOR_AUTHENTICATED));
      } else {
        yield put(action(ActionTypes.INSTRUCTOR_UNAUTHENTICATED));
        yield instructorIsUnauthenticated();
      }
      break;
    case UserRole.STUDENT:
      if (user) {
        yield put(action(ActionTypes.STUDENT_AUTHENTICATED));
      } else {
        yield put(action(ActionTypes.STUDENT_UNAUTHENTICATED));
        yield studentIsUnauthenticated();
      }
      break;
    default:
      break;
  }
  if (user) {
    yield put(setAuthenticatedUser(user));
  }
}

function* checkIsStudentAuthenticated() {
  const authToken = authService.getStudentToken();
  if (authToken) {
    //TODO: Fix authentication and token validation LOGIC
    setAxiosAuthHeaders(authToken);
    yield fetchAuthenticatedUserInfo(authToken, UserRole.STUDENT);
  } else {
    yield put(action(ActionTypes.STUDENT_UNAUTHENTICATED));
  }
}

function* checkIsInstructorAuthenticated() {
  const authToken = authService.getInstructorToken();
  if (authToken) {
    setAxiosAuthHeaders(authToken);
    yield fetchAuthenticatedUserInfo(authToken, UserRole.INSTRUCTOR);
  } else {
    yield put(action(ActionTypes.INSTRUCTOR_UNAUTHENTICATED));
  }
}

function* checkIsAdminAuthenticated() {
  const authToken = authService.getAdminToken();
  if (authToken) {
    setAxiosAuthHeaders(authToken);
    yield fetchAuthenticatedUserInfo(authToken, UserRole.ADMIN);
  } else {
    yield put(action(ActionTypes.ADMIN_UNAUTHENTICATED));
  }
}

function* unauthenticateAll() {
  console.info('logout');
  //Remove invalid auth token from the browser storage if-any!
  authService.logout();
  //Unauthenticate all user's types
  yield put(action(ActionTypes.ADMIN_UNAUTHENTICATED));
  yield put(action(ActionTypes.STUDENT_UNAUTHENTICATED));
  yield put(action(ActionTypes.INSTRUCTOR_UNAUTHENTICATED));
}

export default function* rootSaga() {
  yield call(checkIsStudentAuthenticated);
  yield call(checkIsInstructorAuthenticated);
  yield call(checkIsAdminAuthenticated);

  yield takeLatest(ActionTypes.STUDENT_AUTHENTICATED, studentIsAuthenticated);
  yield takeLatest(
    ActionTypes.STUDENT_UNAUTHENTICATED,
    studentIsUnauthenticated,
  );
  yield takeLatest(
    ActionTypes.INSTRUCTOR_AUTHENTICATED,
    instructorIsAuthenticated,
  );
  yield takeLatest(
    ActionTypes.INSTRUCTOR_UNAUTHENTICATED,
    instructorIsUnauthenticated,
  );
  yield takeLatest(ActionTypes.ADMIN_AUTHENTICATED, adminIsAuthenticated);
  yield takeLatest(ActionTypes.ADMIN_UNAUTHENTICATED, adminIsUnauthenticated);
}
