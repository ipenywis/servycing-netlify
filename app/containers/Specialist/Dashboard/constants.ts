import { ILoadRangeOptions } from "types/pagination";

export enum ActionTypes {
  SET_OFFERED_SERVICES = "app/containers/Specialist/Dashboard/SET_OFFERED_SERVICES",
  SET_ACTIVE_TAB_IDX = "app/containers/Specialist/Dashboard/SET_ACTIVE_TAB_IDX",
}

export const DEFAULT_OFFERED_SERVICES_LOAD_RANGE: ILoadRangeOptions = {
  start: 0,
  range: 1000,
};

export enum DASHBOARD_SECTION_TAB {
  OVERVIEW = "Overview",
  OFFERED_SERVICES = "Offered Services",
  PENDING_REQUESTS = "Pending Requests",
}
