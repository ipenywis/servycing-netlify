import { createSelector } from "reselect";
import { ApplicationRootState } from "types";

const selectSpecialistDashboardPage = (state: ApplicationRootState) =>
  state.specialistDashboardPage;

export const makeSelectOfferedServices = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.offeredServices
);

export const makeSelectActiveTab = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.activeTab
);

export const makeSelectPendingServiceRequests = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.pendingServiceRequests
);

export const makeSelectToUpdateOfferedService = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.toUpdateOfferedService
);

export const makeSelectRejectedServiceRequests = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.rejectedServiceRequests
);

export const makeSelectFinishedProjects = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.finishedProjects
);
