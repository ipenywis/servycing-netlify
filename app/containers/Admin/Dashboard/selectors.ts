import { createSelector } from "reselect";
import { ApplicationRootState } from "types";

const selectAdminDashboardPage = (state: ApplicationRootState) =>
  state.adminDashboardPage;

export const makeSelectOfferedServices = createSelector(
  selectAdminDashboardPage,
  (page) => page.offeredServices
);

export const makeSelectActiveTab = createSelector(
  selectAdminDashboardPage,
  (page) => page.activeTab
);

export const makeSelectToUpdateOfferedService = createSelector(
  selectAdminDashboardPage,
  (page) => page.toUpdateOfferedService
);

export const makeSelectOfferedServicesCount = createSelector(
  selectAdminDashboardPage,
  (page) => page.offeredServicesCount
);

export const makeSelectSpecialists = createSelector(
  selectAdminDashboardPage,
  (page) => page.specialists
);

export const makeSelectToUpdateSpecialist = createSelector(
  selectAdminDashboardPage,
  (page) => page.toUpdateSpecialist
);
