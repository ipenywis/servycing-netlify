import { IFinishedProject } from "types/finishedProject";
import { IOfferedService } from "types/offeredService";
import { IPendingServiceRequest } from "types/pendingServiceRequest";
import { action } from "typesafe-actions";
import { ActionTypes, DASHBOARD_SECTION_TAB } from "./constants";

export const setActiveTab = (tab: DASHBOARD_SECTION_TAB) =>
  action(ActionTypes.SET_ACTIVE_TAB_IDX, tab);

export const setPendingServiceRequests = (requests: IPendingServiceRequest[]) =>
  action(ActionTypes.SET_PENDING_SERVICE_REQUESTS, requests);

export const setFinishedProjects = (projects: IFinishedProject[]) =>
  action(ActionTypes.SET_FINISHED_PROJECTS, projects);

export const setToReviewService = (service: IFinishedProject) =>
  action(ActionTypes.SET_TO_REVIEW_SERVICE, service);
