import { ICustomer } from "./customer";
import { IOfferedService } from "./offeredService";

export enum FINISHED_PROJECT_STATUS {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface IFinishedProject {
  id: string;
  offeredService: IOfferedService;
  customer: ICustomer;
  status: FINISHED_PROJECT_STATUS;
}
