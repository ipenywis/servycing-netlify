import { IAction } from "types";
import { ActionTypes } from "./constants";
import { IServicePageState } from "./types";

const defaultState: IServicePageState = {
  service: null,
};

export const REDUCER_KEY = "servicePage";

export default function servicePageReducer(
  state = defaultState,
  action: IAction
) {
  switch (action.type) {
    case ActionTypes.SET_SERVICE:
      return { ...state, service: action.payload };
    default:
      return state;
  }
}
