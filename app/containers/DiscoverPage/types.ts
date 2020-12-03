import { IOfferedService, IServicesFilter } from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";

export interface IDiscoverPageState {
  offeredServices: IOfferedService[];
  filters: IServicesFilter | null;
  loadRange: ILoadRangeOptions;
}
