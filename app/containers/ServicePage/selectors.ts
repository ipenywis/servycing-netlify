import { createSelector } from "reselect";
import { ApplicationRootState } from "types";

const selectServicePage = (state: ApplicationRootState) => state.servicePage;

export const makeSelectService = createSelector(
  selectServicePage,
  (page) => page.service
);
