import { IFinishedProject } from "types/finishedProject";
import { IOfferedService } from "types/offeredService";
import { IPendingServiceRequest } from "types/pendingServiceRequest";
import { DASHBOARD_SECTION_TAB } from "./constants";

export interface ICustomerDashboardPageState {
  activeTab: DASHBOARD_SECTION_TAB;
  finishedProjects: IFinishedProject[];
  toReviewService: IFinishedProject | null;
}
