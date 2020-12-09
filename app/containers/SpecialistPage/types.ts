import { IFinishedProject } from "types/finishedProject";
import { IOfferedService } from "types/offeredService";
import { IServiceReview } from "types/serviceReview";
import { ISpecialist } from "types/specialist";

export interface ISpecialistPageState {
  specialist: ISpecialist | null;
  finishedServices: IFinishedProject[];
  servicesReviews: IServiceReview[];
  offeredServices: IOfferedService[];
}
