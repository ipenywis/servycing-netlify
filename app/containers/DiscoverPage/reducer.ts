import { IAction } from "types";
import { ActionTypes, DEFAULT_LOAD_RANGE } from "./constants";
import { IDiscoverPageState } from "./types";

export const REDUCER_KEY = "discoverPage";

const defaultState: IDiscoverPageState = {
  offeredServices: [],
  offeredServicesCount: null,
  filters: null,
  loadRange: DEFAULT_LOAD_RANGE,
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
    case ActionTypes.SET_LOAD_RANGE:
      return { ...state, loadRange: action.payload };
    case ActionTypes.SET_OFFERED_SERVICES_COUNT:
      return { ...state, offeredServicesCount: action.payload };
    default:
      return state;
  }
}
