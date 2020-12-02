import { action } from 'typesafe-actions';
import { ActionTypes } from './constants';
import { IAdmin } from 'types/admin';
import { IUser } from 'types/user';

export const studentAuthenticated = (token: string) =>
  action(ActionTypes.STUDENT_AUTHENTICATED, token);

export const studentunauthenticated = () =>
  action(ActionTypes.STUDENT_UNAUTHENTICATED);

export const instructorAuthenticated = (token: string) =>
  action(ActionTypes.INSTRUCTOR_AUTHENTICATED, token);

export const instructorUnauthenticated = () =>
  action(ActionTypes.INSTRUCTOR_UNAUTHENTICATED);

export const adminAuthenticated = (token: string) =>
  action(ActionTypes.ADMIN_AUTHENTICATED, token);

export const adminUnauthenticated = () =>
  action(ActionTypes.ADMIN_UNAUTHENTICATED);

export const setAuthenticatedUser = (user: IUser | null) =>
  action(ActionTypes.SET_AUTHENTICATED_USER, user);
