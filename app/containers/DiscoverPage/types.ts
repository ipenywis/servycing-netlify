import { IOfferedService, IServicesFilter } from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";

export interface IDiscoverPageState {
  offeredServices: IOfferedService[];
  offeredServicesCount: number | null;
  filters: IServicesFilter | null;
  loadRange: ILoadRangeOptions;
  isServicesLoading: boolean;
}
