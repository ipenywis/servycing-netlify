import { ILoadRangeOptions } from "types/pagination";

export enum ActionTypes {
  SET_SPECIALIST = "app/containers/SpecialistPage/SET_SPECIALIST",
  SET_FINISHED_SERVICES = "app/containers/SpecialistPage/SET_FINISHED_SERVICES",
  SET_SERVICES_REVIEWS = "app/containers/SpecialistPage/SET_SERVICES_REVIEWS",
}

export const DEFAULT_SERVICES_LOAD_RANGE: ILoadRangeOptions = {
  start: 0,
  range: 6,
};

export const DEFAULT_REVIEWS_LOAD_RANGE: ILoadRangeOptions = {
  start: 0,
  range: 4,
};
