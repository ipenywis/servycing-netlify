import { IAction } from "types";
import { ActionTypes } from "./constants";
import { ISpecialistDashboardPageState } from "./types";

const defaultState: ISpecialistDashboardPageState = {
  offeredServices: [],
};

export const REDUCER_KEY = "specialistDashboardPage";

export default function specialistDashboardReducer(
  state = defaultState,
  action: IAction
) {
  switch (action.type) {
    case ActionTypes.SET_OFFERED_SERVICES:
      return { ...state, offeredServices: action.payload };
    default:
      return state;
  }
}
