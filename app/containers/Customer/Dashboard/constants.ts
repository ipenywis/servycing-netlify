import { ILoadRangeOptions } from "types/pagination";

export enum ActionTypes {
  SET_OFFERED_SERVICES = "app/containers/Customer/Dashboard/SET_OFFERED_SERVICES",
  SET_ACTIVE_TAB_IDX = "app/containers/Customer/Dashboard/SET_ACTIVE_TAB_IDX",
  SET_PENDING_SERVICE_REQUESTS = "app/containers/Customer/Dashboard/SET_PENDING_SERVICE_REQUESTS",
  SET_TO_UPDATE_OFFERED_SERVICE = "app/containers/Customer/Dashboard/SET_TO_UPDATE_OFFERED_SERVICE",
  SET_REJECTED_SERVICE_REQUESTS = "app/containers/Customer/Dashboard/SET_REJECTED_SERVICE_REQUESTS",
  SET_FINISHED_PROJECTS = "app/containers/Customer/Dashboard/SET_FINISHED_PROJECTS",
  SET_TO_REVIEW_SERVICE = "app/containers/Customer/Dashboard/SET_TO_REVIEW_SERVICE",
}

export const DEFAULT_OFFERED_SERVICES_LOAD_RANGE: ILoadRangeOptions = {
  start: 0,
  range: 1000,
};

export enum DASHBOARD_SECTION_TAB {
  FINISHED_PROJECTS = "Finished Projects",
  LEAVE_NEW_REVIEW = "Leave a Review",
}
