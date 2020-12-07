import { IAction } from "types";
import { ActionTypes, DASHBOARD_SECTION_TAB } from "./constants";
import { ICustomerDashboardPageState } from "./types";

const defaultState: ICustomerDashboardPageState = {
  activeTab: DASHBOARD_SECTION_TAB.FINISHED_PROJECTS,
  finishedProjects: [],
};

export const REDUCER_KEY = "customerDashboardPage";

export default function customerDashboardReducer(
  state = defaultState,
  action: IAction
) {
  switch (action.type) {
    case ActionTypes.SET_OFFERED_SERVICES:
      return { ...state, offeredServices: action.payload };
    case ActionTypes.SET_ACTIVE_TAB_IDX:
      return { ...state, activeTab: action.payload };
    case ActionTypes.SET_PENDING_SERVICE_REQUESTS:
      return { ...state, pendingServiceRequests: action.payload };
    case ActionTypes.SET_TO_UPDATE_OFFERED_SERVICE:
      return { ...state, toUpdateOfferedService: action.payload };
    case ActionTypes.SET_REJECTED_SERVICE_REQUESTS:
      return { ...state, rejectedServiceRequests: action.payload };
    case ActionTypes.SET_FINISHED_PROJECTS:
      return { ...state, finishedProjects: action.payload };
    default:
      return state;
  }
}
