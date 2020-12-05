import { createSelector } from "reselect";
import { ApplicationRootState } from "types";

const selectSpecialistDashboardPage = (state: ApplicationRootState) =>
  state.specialistDashboardPage;

export const makeSelectOfferedServices = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.offeredServices
);
