import { apolloClient } from "apolloGraphql";
import {
  INewOfferedServiceDTO,
  IOfferedService,
  IOfferedServicesWithCount,
  IServicesFilter,
  OFFERED_SERVICE_TYPE,
} from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";
import { parseGraphqlError } from "utils/error";
import offeredServicesMessages from "./offeredServicesMessages";
import {
  GET_OFFERED_SERVICES,
  GET_SPECIALIST_MY_OFFERED_SERVICES,
} from "./queries";
import { ADD_NEW_SERVICE } from "./mutations";

class OfferedServicesService {
  private resolverServicesType(services: IOfferedService[]): IOfferedService[] {
    return services.map((service) => ({
      ...service,
      type: OFFERED_SERVICE_TYPE[service.type],
    }));
  }

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
      const offeredServices = this.resolverServicesType(
        response.data.offeredServicesWithCount.offeredServices
      );

      return { count, offeredServices };
    } else throw new Error(offeredServicesMessages.cannotFetchOfferedServices);
  }

  public async addNewOfferedService(
    newServiceData: INewOfferedServiceDTO
  ): Promise<IOfferedService> {
    const response = await apolloClient
      .mutate({
        mutation: ADD_NEW_SERVICE,
        variables: { newServiceInput: newServiceData },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.offeredService)
      return response.data.offeredService;
    else throw new Error(offeredServicesMessages.cannotCreateNewService);
  }

  public async getSpecialistMyOfferedServices(): Promise<IOfferedService[]> {
    const response = await apolloClient
      .query({
        fetchPolicy: "network-only",
        query: GET_SPECIALIST_MY_OFFERED_SERVICES,
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.offeredServices) {
      //get the right service type
      const offeredServices = this.resolverServicesType(
        response.data.offeredServices
      );

      return offeredServices;
    } else throw new Error(offeredServicesMessages.cannotFetchOfferedServices);
  }
}

export default new OfferedServicesService();
