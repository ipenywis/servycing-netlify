import { IOfferedService, IServicesFilter } from "types/offeredService";

export interface IDiscoverPageState {
  offeredServices: IOfferedService[];
  filters: IServicesFilter | null;
}
