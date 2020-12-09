import { IAction } from "types";
import { ActionTypes } from "./constants";
import { ISpecialistPageState } from "./types";

const defaultState: ISpecialistPageState = {
  specialist: null,
  finishedServices: [],
};

export const REDUCER_KEY = "specialistPage";

export default function specialistPageReducer(
  state = defaultState,
  action: IAction
) {
  switch (action.type) {
    case ActionTypes.SET_SPECIALIST:
      return { ...state, specialist: action.payload };
    case ActionTypes.SET_FINISHED_SERVICES:
      return { ...state, finishedServices: action.payload };
    default:
      return state;
  }
}
