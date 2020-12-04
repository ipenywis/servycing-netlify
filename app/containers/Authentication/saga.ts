import { takeLatest, put, call } from "redux-saga/effects";
import { ActionTypes } from "./constants";
import authService from "services/authService";
import { IAction } from "types";
import { action } from "typesafe-actions";
import {
  specialistAuthenticated,
  specialistUnauthenticated,
  adminAuthenticated,
  adminUnauthenticated,
  setAuthenticatedUser,
} from "./actions";
import Axios from "axios";
import userService from "services/userService";
import { UserRole } from "types/user";

function setAxiosAuthHeaders(token: string) {
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function* customerIsAuthenticated(action: IAction) {
  const authToken = action.payload;
  authService.storeCustomerToken(authToken);
  setAxiosAuthHeaders(authToken);
  yield fetchAuthenticatedUserInfo(authToken);

  //Unauthenticate other users
  adminIsUnauthenticated();
  specialistIsUnauthenticated();
}

function* customerIsUnauthenticated() {
  authService.removeCustomerToken();
}

function* specialistIsAuthenticated(action: IAction) {
  const authToken = action.payload;
  authService.storeSpecialistToken(authToken);
  setAxiosAuthHeaders(authToken);
  yield fetchAuthenticatedUserInfo(authToken);

  //Unauthenticate other users
  customerIsUnauthenticated();
  adminIsUnauthenticated();
}

function* specialistIsUnauthenticated() {
  authService.removeSpecialistToken();
}

function* adminIsAuthenticated(action: IAction) {
  const authToken = action.payload;
  authService.storeAdminToken(authToken);
  setAxiosAuthHeaders(authToken);
  yield fetchAuthenticatedUserInfo(authToken);

  //Unauthenticate other users
  specialistIsUnauthenticated();
  customerIsUnauthenticated();
}

function* adminIsUnauthenticated() {
  authService.removeAdminToken();
}

function* fetchAuthenticatedUserInfo(token: string, userRole?: UserRole) {
  const user = yield userService.getAuthenticatedUser().catch((err) => {});
  switch (userRole) {
    case UserRole.ADMIN:
      if (user) {
        yield put(action(ActionTypes.ADMIN_AUTHENTICATED));
      } else {
        yield put(action(ActionTypes.ADMIN_UNAUTHENTICATED));
        yield adminIsUnauthenticated();
      }
      break;
    case UserRole.SPECIALIST:
      if (user) {
        yield put(action(ActionTypes.CUSTOMER_AUTHENTICATED));
      } else {
        yield put(action(ActionTypes.CUSTOMER_UNAUTHENTICATED));
        yield specialistIsUnauthenticated();
      }
      break;
    case UserRole.CUSTOMER:
      if (user) {
        yield put(action(ActionTypes.CUSTOMER_AUTHENTICATED));
      } else {
        yield put(action(ActionTypes.CUSTOMER_UNAUTHENTICATED));
        yield customerIsUnauthenticated();
      }
      break;
    default:
      break;
  }
  if (user) {
    yield put(setAuthenticatedUser(user));
  }
}

function* checkIsCustomerAuthenticated() {
  const authToken = authService.getCustomerToken();
  if (authToken) {
    //TODO: Fix authentication and token validation LOGIC
    setAxiosAuthHeaders(authToken);
    yield fetchAuthenticatedUserInfo(authToken, UserRole.CUSTOMER);
  } else {
    yield put(action(ActionTypes.CUSTOMER_UNAUTHENTICATED));
  }
}

function* checkIsSpecialistAuthenticated() {
  const authToken = authService.getSpecialistToken();
  if (authToken) {
    setAxiosAuthHeaders(authToken);
    yield fetchAuthenticatedUserInfo(authToken, UserRole.SPECIALIST);
  } else {
    yield put(action(ActionTypes.SPECIALIST_UNAUTHENTICATED));
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
  console.info("logout");
  //Remove invalid auth token from the browser storage if-any!
  authService.logout();
  //Unauthenticate all user's types
  yield put(action(ActionTypes.ADMIN_UNAUTHENTICATED));
  yield put(action(ActionTypes.CUSTOMER_UNAUTHENTICATED));
  yield put(action(ActionTypes.SPECIALIST_UNAUTHENTICATED));
}

export default function* rootSaga() {
  yield call(checkIsCustomerAuthenticated);
  yield call(checkIsSpecialistAuthenticated);
  yield call(checkIsAdminAuthenticated);

  yield takeLatest(ActionTypes.CUSTOMER_AUTHENTICATED, customerIsAuthenticated);
  yield takeLatest(
    ActionTypes.CUSTOMER_UNAUTHENTICATED,
    customerIsUnauthenticated
  );
  yield takeLatest(
    ActionTypes.SPECIALIST_AUTHENTICATED,
    specialistIsAuthenticated
  );
  yield takeLatest(
    ActionTypes.SPECIALIST_UNAUTHENTICATED,
    specialistIsUnauthenticated
  );
  yield takeLatest(ActionTypes.ADMIN_AUTHENTICATED, adminIsAuthenticated);
  yield takeLatest(ActionTypes.ADMIN_UNAUTHENTICATED, adminIsUnauthenticated);
}
