import { IOfferedService } from "types/offeredService";
import { action } from "typesafe-actions";
import { ActionTypes, DASHBOARD_SECTION_TAB } from "./constants";

export const setOfferedServices = (services: IOfferedService[]) =>
  action(ActionTypes.SET_OFFERED_SERVICES, services);

export const setActiveTab = (tab: DASHBOARD_SECTION_TAB) =>
  action(ActionTypes.SET_ACTIVE_TAB_IDX, tab);
