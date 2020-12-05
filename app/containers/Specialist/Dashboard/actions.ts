import { IOfferedService } from "types/offeredService";
import { action } from "typesafe-actions";
import { ActionTypes } from "./constants";

export const setOfferedServices = (services: IOfferedService[]) =>
  action(ActionTypes.SET_OFFERED_SERVICES, services);
