import { createSelector } from "reselect";
import { ApplicationRootState } from "types";

const selectDiscoverPage = (state: ApplicationRootState) => state.discoverPage;

export const makeSelectOfferedServices = createSelector(
  selectDiscoverPage,
  (page) => page.offeredServices
);

export const makeSelectFilters = createSelector(
  selectDiscoverPage,
  (page) => page.filters
);

export const makeSelectLoadRange = createSelector(
  selectDiscoverPage,
  (page) => page.loadRange
);
