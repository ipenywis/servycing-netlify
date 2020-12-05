import { IOfferedService } from "types/offeredService";
import { DASHBOARD_SECTION_TAB } from "./constants";

export interface ISpecialistDashboardPageState {
  offeredServices: IOfferedService[];
  activeTab: DASHBOARD_SECTION_TAB;
}
