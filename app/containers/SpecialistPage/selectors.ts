import { createSelector } from "reselect";
import { ApplicationRootState } from "types";

const selectSpecialistPage = (state: ApplicationRootState) =>
  state.specialistPage;

export const makeSelectSpecialist = createSelector(
  selectSpecialistPage,
  (page) => page.specialist
);

export const makeSelectFinishedServices = createSelector(
  selectSpecialistPage,
  (page) => page.finishedServices
);
