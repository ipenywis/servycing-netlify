import { IOfferedService } from "types/offeredService";
import { action } from "typesafe-actions";
import { ActionTypes } from "./constants";

export const setService = (service: IOfferedService) =>
  action(ActionTypes.SET_SERVICE, service);
