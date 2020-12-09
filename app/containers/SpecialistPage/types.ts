import { IFinishedProject } from "types/finishedProject";
import { IServiceReview } from "types/serviceReview";
import { ISpecialist } from "types/specialist";

export interface ISpecialistPageState {
  specialist: ISpecialist | null;
  finishedServices: IFinishedProject[];
  servicesReviews: IServiceReview[];
}
