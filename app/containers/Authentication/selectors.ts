import { ApplicationRootState } from "types";
import { createSelector } from "reselect";

const selectAuthentication = (state: ApplicationRootState) =>
  state.authentication;

export const makeSelectIsCustomerAuthenticated = createSelector(
  selectAuthentication,
  (auth) => auth.isCustomerAuthenticated
);

export const makeSelectIsSpecialistAuthenticated = createSelector(
  selectAuthentication,
  (auth) => auth.isSpecialistAuthenticated
);

export const makeSelectIsAdminAuthenticated = createSelector(
  selectAuthentication,
  (auth) => auth.isAdminAuthenticated
);

export const makeSelectAuthenticatedUser = createSelector(
  selectAuthentication,
  (auth) => auth.authenticatedUser
);
