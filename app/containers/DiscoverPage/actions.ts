import { IOfferedService, IServicesFilter } from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";
import { action } from "typesafe-actions";
import { ActionTypes } from "./constants";

export const setOfferedServices = (services: IOfferedService[]) =>
  action(ActionTypes.SET_OFFERED_SERVICES, services);

export const setFilters = (filters: IServicesFilter) =>
  action(ActionTypes.SET_FILTERS, filters);

export const setLoadRange = (range: ILoadRangeOptions) =>
  action(ActionTypes.SET_LOAD_RANGE, range);

export const setOfferedServicesCount = (count: number) =>
  action(ActionTypes.SET_OFFERED_SERVICES_COUNT, count);

export const setServicesLoading = (loading: boolean) =>
  action(ActionTypes.SET_SERVICES_LOADING, loading);
