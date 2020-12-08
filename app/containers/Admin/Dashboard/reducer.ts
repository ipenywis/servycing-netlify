import { IAction } from "types";
import { ActionTypes, DASHBOARD_SECTION_TAB } from "./constants";
import { IAdminDashboardPageState } from "./types";

const defaultState: IAdminDashboardPageState = {
  offeredServices: [],
  activeTab: DASHBOARD_SECTION_TAB.OFFERED_SERVICES,
  toUpdateOfferedService: null,
  offeredServicesCount: 0,
  specialists: [],
  toUpdateSpecialist: null,
  customers: [],
  toUpdateCustomer: null,
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
    case ActionTypes.SET_SPECIALISTS:
      return { ...state, specialists: action.payload };
    case ActionTypes.SET_TO_UPDATE_SPECIALIST:
      return { ...state, toUpdateSpecialist: action.payload };
    case ActionTypes.SET_CUSTOMERS:
      return { ...state, customers: action.payload };
    case ActionTypes.SET_TO_UPDATE_CUSTOMER:
      return { ...state, toUpdateCustomer: action.payload };
    default:
      return state;
  }
}
