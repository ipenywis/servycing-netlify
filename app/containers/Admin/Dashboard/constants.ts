import { ILoadRangeOptions } from "types/pagination";

export enum ActionTypes {
  SET_OFFERED_SERVICES = "app/containers/Specialist/Admin/Dashboard/SET_OFFERED_SERVICES",
  SET_ACTIVE_TAB_IDX = "app/containers/Specialist/Admin/Dashboard/SET_ACTIVE_TAB_IDX",
  SET_TO_UPDATE_OFFERED_SERVICE = "app/containers/Admin/Dashboard/SET_TO_UPDATE_OFFERED_SERVICE",
  SET_OFFERED_SERVICES_COUNT = "app/containers/Admin/Dashboard/SET_OFFERED_SERVICES_COUNT",
  SET_SPECIALISTS = "app/containers/Admin/Dashboard/SET_SPECIALISTS",
  SET_TO_UPDATE_SPECIALIST = "app/containers/Admin/Dashboard/SET_TO_UPDATE_SPECIALIST",
  SET_CUSTOMERS = "app/containers/Admin/Dashboard/SET_CUSTOMERS",
  SET_TO_UPDATE_CUSTOMER = "app/containers/Admin/Dashboard/SET_TO_UPDATE_CUSTOMER",
  SET_REVIEWS = "app/containers/Admin/Dashboard/SET_REVIEWS",
  SET_TO_UPDATE_REVIEW = "app/containers/Admin/Dashboard/SET_TO_UPDATE_REVIEW",
}

export const DEFAULT_OFFERED_SERVICES_LOAD_RANGE: ILoadRangeOptions = {
  start: 0,
  range: 3,
};

export enum DASHBOARD_SECTION_TAB {
  //ADD_NEW_SERVICE = "Add New Service",
  OFFERED_SERVICES = "Offered Services",
  UPDATE_SERVICE = "Update Service",
  SPECIALISTS = "Specialists",
  ADD_NEW_SPECIALIST = "Add New Specialist",
  UPDATE_SPECIALIST = "Update Specialist",
  CUSTOMERS = "Customers",
  ADD_NEW_CUSTOMER = "Add New Customer",
  UPDATE_CUSTOMER = "Update Customer",
  ADD_NEW_REVIEW = "Add New Service Review",
  SERVICES_REVIEWS = "Services Reviews",
  UPDATE_REVIEW = "Update Service Review",
}
