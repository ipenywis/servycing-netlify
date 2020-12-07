import { IOfferedService } from "types/offeredService";
import { IPendingServiceRequest } from "types/pendingServiceRequest";
import { action } from "typesafe-actions";
import { ActionTypes, DASHBOARD_SECTION_TAB } from "./constants";

export const setOfferedServices = (services: IOfferedService[]) =>
  action(ActionTypes.SET_OFFERED_SERVICES, services);

export const setActiveTab = (tab: DASHBOARD_SECTION_TAB) =>
  action(ActionTypes.SET_ACTIVE_TAB_IDX, tab);

export const setPendingServiceRequests = (requests: IPendingServiceRequest[]) =>
  action(ActionTypes.SET_PENDING_SERVICE_REQUESTS, requests);

export const setToUpdateOfferedService = (service: IOfferedService | null) =>
  action(ActionTypes.SET_TO_UPDATE_OFFERED_SERVICE, service);

export const setRejectedServiceRequests = (
  requests: IPendingServiceRequest[]
) => action(ActionTypes.SET_REJECTED_SERVICE_REQUESTS, requests);
