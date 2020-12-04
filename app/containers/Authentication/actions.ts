import { action } from "typesafe-actions";
import { ActionTypes } from "./constants";
import { IAdmin } from "types/admin";
import { IUser } from "types/user";

export const customerAuthenticated = (token: string) =>
  action(ActionTypes.CUSTOMER_AUTHENTICATED, token);

export const customerunauthenticated = () =>
  action(ActionTypes.CUSTOMER_UNAUTHENTICATED);

export const specialistAuthenticated = (token: string) =>
  action(ActionTypes.SPECIALIST_AUTHENTICATED, token);

export const specialistUnauthenticated = () =>
  action(ActionTypes.SPECIALIST_UNAUTHENTICATED);

export const adminAuthenticated = (token: string) =>
  action(ActionTypes.ADMIN_AUTHENTICATED, token);

export const adminUnauthenticated = () =>
  action(ActionTypes.ADMIN_UNAUTHENTICATED);

export const setAuthenticatedUser = (user: IUser | null) =>
  action(ActionTypes.SET_AUTHENTICATED_USER, user);
