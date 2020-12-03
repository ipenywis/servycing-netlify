import { apolloClient } from "apolloGraphql";
import {
  IOffferedService,
  IServicesFilter,
  OFFERED_SERVICE_TYPE,
} from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";
import { parseGraphqlError } from "utils/error";
import offeredServicesMessages from "./offeredServicesMessages";
import { GET_OFFERED_SERVICES } from "./queries";

class OfferedServicesService {
  public async getAndFilterOfferedServices(
    loadRangeOptions?: ILoadRangeOptions,
    servicesFilter?: IServicesFilter
  ): Promise<IOffferedService[]> {
    const response = await apolloClient
      .query({
        query: GET_OFFERED_SERVICES,
        variables: { range: loadRangeOptions, filter: servicesFilter },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.offeredServices) {
      //get the right service type
      const offeredServices = response.data.offeredServices.map((service) => ({
        ...service,
        type: OFFERED_SERVICE_TYPE[service.type],
      }));
      return offeredServices;
    } else throw new Error(offeredServicesMessages.cannotFetchOfferedServices);
  }
}

export default new OfferedServicesService();
