import { ILoadRangeOptions } from "types/pagination";

export enum ActionTypes {
  SET_OFFERED_SERVICES = "app/containers/Specialist/Specialist/Dashboard/SET_OFFERED_SERVICES",
  SET_ACTIVE_TAB_IDX = "app/containers/Specialist/Specialist/Dashboard/SET_ACTIVE_TAB_IDX",
  SET_PENDING_SERVICE_REQUESTS = "app/containers/Specialist/Dashboard/SET_PENDING_SERVICE_REQUESTS",
  SET_TO_UPDATE_OFFERED_SERVICE = "app/containers/Specialist/Dashboard/SET_TO_UPDATE_OFFERED_SERVICE",
  SET_REJECTED_SERVICE_REQUESTS = "app/containers/Specialist/Dashboard/SET_REJECTED_SERVICE_REQUESTS",
  SET_FINISHED_PROJECTS = "app/containers/Specialist/Dashboard/SET_FINISHED_PROJECTS",
}

export const DEFAULT_OFFERED_SERVICES_LOAD_RANGE: ILoadRangeOptions = {
  start: 0,
  range: 4,
};

export enum DASHBOARD_SECTION_TAB {
  ADD_NEW_SERVICE = "Add New Service",
  OFFERED_SERVICES = "Offered Services",
  PENDING_REQUESTS = "Pending Requests",
  REJECTED_SERVICES = "Rejected Requests",
  FINISHED_PROJECTS = "Finished Projects",
  UPDATE_SERVICE = "Update Service",
}
