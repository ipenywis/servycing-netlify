import { ApplicationRootState } from 'types';
import { createSelector } from 'reselect';

const selectAuthentication = (state: ApplicationRootState) =>
  state.authentication;

export const makeSelectIsStudentAuthenticated = createSelector(
  selectAuthentication,
  auth => auth.isStudentAuthenticated,
);

export const makeSelectIsInstructorAuthenticated = createSelector(
  selectAuthentication,
  auth => auth.isInstructorAuthenticated,
);

export const makeSelectIsAdminAuthenticated = createSelector(
  selectAuthentication,
  auth => auth.isAdminAuthenticated,
);

export const makeSelectAuthenticatedUser = createSelector(
  selectAuthentication,
  auth => auth.authenticatedUser,
);
