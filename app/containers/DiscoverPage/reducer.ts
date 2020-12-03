import { IAction } from "types";
import { ActionTypes } from "./constants";
import { IDiscoverPageState } from "./types";

export const REDUCER_KEY = "discoverPage";

const defaultState: IDiscoverPageState = {
  offeredServices: [],
  filters: null,
};

export default function discoverPageReducer(
  state = defaultState,
  action: IAction
) {
  switch (action.type) {
    case ActionTypes.SET_OFFERED_SERVICES:
      return { ...state, offeredServices: action.payload };
    case ActionTypes.SET_FILTERS:
      return { ...state, filters: action.payload };
    default:
      return state;
  }
}
