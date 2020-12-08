import { createSelector } from "reselect";
import { ApplicationRootState } from "types";

const selectSpecialistDashboardPage = (state: ApplicationRootState) =>
  state.adminDashboardPage;

export const makeSelectOfferedServices = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.offeredServices
);

export const makeSelectActiveTab = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.activeTab
);

export const makeSelectToUpdateOfferedService = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.toUpdateOfferedService
);

export const makeSelectOfferedServicesCount = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.offeredServicesCount
);
