import { ISpecialist } from "types/specialist";
import { action } from "typesafe-actions";
import { ActionTypes } from "./constants";

export const setSpecialist = (specialist: ISpecialist | null) =>
  action(ActionTypes.SET_SPECIALIST, specialist);
