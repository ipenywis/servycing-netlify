import { IFinishedProject } from "types/finishedProject";
import { ISpecialist } from "types/specialist";
import { action } from "typesafe-actions";
import { ActionTypes } from "./constants";

export const setSpecialist = (specialist: ISpecialist | null) =>
  action(ActionTypes.SET_SPECIALIST, specialist);

export const setFinishedServices = (finishedServices: IFinishedProject[]) =>
  action(ActionTypes.SET_FINISHED_SERVICES, finishedServices);
