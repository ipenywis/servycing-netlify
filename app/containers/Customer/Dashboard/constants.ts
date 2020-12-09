import { ILoadRangeOptions } from "types/pagination";

export enum ActionTypes {
  SET_ACTIVE_TAB_IDX = "app/containers/Customer/Dashboard/SET_ACTIVE_TAB_IDX",
  SET_FINISHED_PROJECTS = "app/containers/Customer/Dashboard/SET_FINISHED_PROJECTS",
  SET_TO_REVIEW_SERVICE = "app/containers/Customer/Dashboard/SET_TO_REVIEW_SERVICE",
  SET_PENDING_SERVICE_REQUESTS = "app/containers/Customer/Dashboard/SET_PENDING_SERVICE_REQUESTS",
}

export const DEFAULT_OFFERED_SERVICES_LOAD_RANGE: ILoadRangeOptions = {
  start: 0,
  range: 1000,
};

export enum DASHBOARD_SECTION_TAB {
  FINISHED_PROJECTS = "Finished Projects",
  LEAVE_NEW_REVIEW = "Leave a Review",
  PENDING_SERVICE_REQUESTS = "My Requests",
}
