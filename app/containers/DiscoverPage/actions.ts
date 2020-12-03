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
