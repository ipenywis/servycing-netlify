import { IFinishedProject } from "types/finishedProject";
import { IOfferedService } from "types/offeredService";
import { IServiceReview } from "types/serviceReview";
import { ISpecialist } from "types/specialist";
import { action } from "typesafe-actions";
import { ActionTypes } from "./constants";

export const setSpecialist = (specialist: ISpecialist | null) =>
  action(ActionTypes.SET_SPECIALIST, specialist);

export const setFinishedServices = (finishedServices: IFinishedProject[]) =>
  action(ActionTypes.SET_FINISHED_SERVICES, finishedServices);

export const setServicesReviews = (reviews: IServiceReview[]) =>
  action(ActionTypes.SET_SERVICES_REVIEWS, reviews);

export const setOfferedServices = (services: IOfferedService[]) =>
  action(ActionTypes.SET_OFFERED_SERVICES, services);
