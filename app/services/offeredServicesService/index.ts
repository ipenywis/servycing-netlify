import { apolloClient } from "apolloGraphql";
import {
  IOfferedService,
  IOfferedServicesWithCount,
  IServicesFilter,
  OFFERED_SERVICE_TYPE,
} from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";
import { parseGraphqlError } from "utils/error";
import offeredServicesMessages from "./offeredServicesMessages";
import { GET_OFFERED_SERVICES } from "./queries";

class OfferedServicesService {
  public async getAndFilterOfferedServices(
    servicesFilter?: IServicesFilter,
    loadRangeOptions?: ILoadRangeOptions
  ): Promise<IOfferedServicesWithCount> {
    const response = await apolloClient
      .query({
        query: GET_OFFERED_SERVICES,
        variables: { range: loadRangeOptions, filter: servicesFilter },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (
      response &&
      response.data &&
      response.data.offeredServicesWithCount &&
      response.data.offeredServicesWithCount.offeredServices
    ) {
      //get the right service type
      const count = response.data.offeredServicesWithCount.count;
      const offeredServices = response.data.offeredServicesWithCount.offeredServices.map(
        (service) => ({
          ...service,
          type: OFFERED_SERVICE_TYPE[service.type],
        })
      );
      return { count, offeredServices };
    } else throw new Error(offeredServicesMessages.cannotFetchOfferedServices);
  }
}

export default new OfferedServicesService();
