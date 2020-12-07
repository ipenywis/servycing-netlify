import { IFinishedProject } from "types/finishedProject";
import { IOfferedService } from "types/offeredService";
import { IPendingServiceRequest } from "types/pendingServiceRequest";
import { DASHBOARD_SECTION_TAB } from "./constants";

export interface ISpecialistDashboardPageState {
  offeredServices: IOfferedService[];
  activeTab: DASHBOARD_SECTION_TAB;
  pendingServiceRequests: IPendingServiceRequest[];
  rejectedServiceRequests: IPendingServiceRequest[];
  finishedProjects: IFinishedProject[];
  toUpdateOfferedService: IOfferedService | null;
}
