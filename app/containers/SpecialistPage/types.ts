import { IFinishedProject } from "types/finishedProject";
import { ISpecialist } from "types/specialist";

export interface ISpecialistPageState {
  specialist: ISpecialist | null;
  finishedServices: IFinishedProject[];
}
