import { IFinishedProject } from "types/finishedProject";
import { IOfferedService } from "types/offeredService";
import { IPendingServiceRequest } from "types/pendingServiceRequest";
import { ISpecialist } from "types/specialist";
import { DASHBOARD_SECTION_TAB } from "./constants";

export interface IAdminDashboardPageState {
  offeredServices: IOfferedService[];
  offeredServicesCount: number;
  activeTab: DASHBOARD_SECTION_TAB;
  toUpdateOfferedService: IOfferedService | null;
  specialists: ISpecialist[];
  toUpdateSpecialist: ISpecialist | null;
}
