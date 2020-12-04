import { ILoadRangeOptions } from "types/pagination";

export enum ActionTypes {
  SET_OFFERED_SERVICES = "app/containers/DiscoverPage/SET_OFFERED_SERVICES",
  SET_FILTERS = "app/containers/DiscoverPage/SET_FILTERS",
  SET_LOAD_RANGE = "app/containers/DiscoverPage/SET_LOAD_RANGE",
  SET_OFFERED_SERVICES_COUNT = "app/containers/DiscoverPage/SET_OFFERED_SERVICES_COUNT",
}

export const DEFAULT_LOAD_RANGE: ILoadRangeOptions = {
  start: 0,
  range: 5,
};
