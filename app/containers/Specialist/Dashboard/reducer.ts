import { IAction } from "types";
import { ActionTypes, DASHBOARD_SECTION_TAB } from "./constants";
import { ISpecialistDashboardPageState } from "./types";

const defaultState: ISpecialistDashboardPageState = {
  offeredServices: [],
  activeTab: DASHBOARD_SECTION_TAB.OVERVIEW,
};

export const REDUCER_KEY = "specialistDashboardPage";

export default function specialistDashboardReducer(
  state = defaultState,
  action: IAction
) {
  switch (action.type) {
    case ActionTypes.SET_OFFERED_SERVICES:
      return { ...state, offeredServices: action.payload };
    case ActionTypes.SET_ACTIVE_TAB_IDX:
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
}
