import { IAction } from "types";
import { ActionTypes, DASHBOARD_SECTION_TAB } from "./constants";
import { IAdminDashboardPageState } from "./types";

const defaultState: IAdminDashboardPageState = {
  offeredServices: [],
  activeTab: DASHBOARD_SECTION_TAB.OFFERED_SERVICES,
  toUpdateOfferedService: null,
  offeredServicesCount: 0,
};

export const REDUCER_KEY = "adminDashboardPage";

export default function adminDashboardReducer(
  state = defaultState,
  action: IAction
) {
  switch (action.type) {
    case ActionTypes.SET_OFFERED_SERVICES:
      return { ...state, offeredServices: action.payload };
    case ActionTypes.SET_ACTIVE_TAB_IDX:
      return { ...state, activeTab: action.payload };
    case ActionTypes.SET_TO_UPDATE_OFFERED_SERVICE:
      return { ...state, toUpdateOfferedService: action.payload };
    case ActionTypes.SET_OFFERED_SERVICES_COUNT:
      return { ...state, offeredServicesCount: action.payload };
    default:
      return state;
  }
}
