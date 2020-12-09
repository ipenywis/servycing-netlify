import { ICustomer } from "types/customer";
import { IOfferedService } from "types/offeredService";
import { IServiceReview } from "types/serviceReview";
import { ISpecialist } from "types/specialist";
import { action } from "typesafe-actions";

import { ActionTypes, DASHBOARD_SECTION_TAB } from "./constants";

export const setOfferedServices = (services: IOfferedService[]) =>
  action(ActionTypes.SET_OFFERED_SERVICES, services);

export const setActiveTab = (tab: DASHBOARD_SECTION_TAB) =>
  action(ActionTypes.SET_ACTIVE_TAB_IDX, tab);

export const setToUpdateOfferedService = (service: IOfferedService | null) =>
  action(ActionTypes.SET_TO_UPDATE_OFFERED_SERVICE, service);

export const setOfferedServicesCount = (count: number) =>
  action(ActionTypes.SET_OFFERED_SERVICES_COUNT, count);

export const setSpecialists = (specialists: ISpecialist[]) =>
  action(ActionTypes.SET_SPECIALISTS, specialists);

export const setToUpdateSpecialist = (specialist: ISpecialist | null) =>
  action(ActionTypes.SET_TO_UPDATE_SPECIALIST, specialist);

export const setCustomers = (customers: ICustomer[]) =>
  action(ActionTypes.SET_CUSTOMERS, customers);

export const setToUpdateCustomer = (customer: ICustomer | null) =>
  action(ActionTypes.SET_TO_UPDATE_CUSTOMER, customer);

export const setReviews = (reviews: IServiceReview[]) =>
  action(ActionTypes.SET_REVIEWS, reviews);

export const setToUpdateReview = (review: IServiceReview | null) =>
  action(ActionTypes.SET_TO_UPDATE_REVIEW, review);
