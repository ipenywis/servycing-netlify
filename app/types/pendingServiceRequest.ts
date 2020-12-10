import { ICustomer } from "./customer";
import { IOfferedService, OFFERED_SERVICE_STATUS } from "./offeredService";

export interface IPendingServiceRequest {
  id: string;
  offeredService: IOfferedService;
  customer: ICustomer;
  status: OFFERED_SERVICE_STATUS;
}

export interface IPendingServicesRequestsWithCount {
  count: number;
  pendingServicesRequests: IPendingServiceRequest[];
}
