import { createSelector } from "reselect";
import { ApplicationRootState } from "types";

const selectSpecialistDashboardPage = (state: ApplicationRootState) =>
  state.customerDashboardPage;

export const makeSelectActiveTab = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.activeTab
);

export const makeSelectPendingServiceRequests = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.pendingServiceRequests
);

export const makeSelectFinishedProjects = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.finishedProjects
);

export const makeSelectToReviewService = createSelector(
  selectSpecialistDashboardPage,
  (page) => page.toReviewService
);
