import { apolloClient } from "apolloGraphql";
import {
  INewOfferedServiceDTO,
  IOfferedService,
  IOfferedServicesWithCount,
  IServicesFilter,
  IUpdateOfferedServiceDTO,
  OFFERED_SERVICE_TYPE,
} from "types/offeredService";
import { ILoadRangeOptions } from "types/pagination";
import { parseGraphqlError } from "utils/error";
import offeredServicesMessages from "./offeredServicesMessages";
import {
  GET_OFFERED_SERVICE,
  GET_OFFERED_SERVICES,
  GET_SPECIALIST_ALL_FINISHED_PROJECTS,
  GET_SPECIALIST_MY_OFFERED_SERVICES,
  GET_SPECIALIST_PENDING_SERVICE_REQUESTS,
  GET_SPECIALIST_REJECTED_SERVICE_REQUESTS,
  GET_CUSTOMER_ALL_FINISHED_SERVICES,
  GET_CUSTOMER_ALL_PENDING_SERVICES_REQUESTS,
  GET_SPECIALIST_FINISHED_SERVICES_BY_ID,
  GET_SPECIALIST_OFFERED_SERVICES,
} from "./queries";
import {
  ADD_NEW_SERVICE,
  CUSTOMER_ACCEPT_FINISHED_SERVICE,
  CUSTOMER_REJECT_FINISHED_SERVICE,
  DELETE_OFFERED_SERVICE,
  REQUEST_SERVICE,
  SPECIALIST_ACCEPT_PENDING_SERVICE_REQUEST,
  SPECIALIST_REJECT_PENDING_SERVICE_REQUEST,
  UPDATE_OFFERED_SERVICE,
} from "./mutations";
import {
  IPendingServiceRequest,
  IPendingServicesRequestsWithCount,
} from "types/pendingServiceRequest";
import {
  IFinishedProject,
  IFinishedProjectsWithCount,
} from "types/finishedProject";

class OfferedServicesService {
  private resolverServicesType(services: IOfferedService[]): IOfferedService[] {
    return services.map((service) => ({
      ...service,
      type: OFFERED_SERVICE_TYPE[service.type],
    }));
  }

  public async getAndFilterOfferedServices(
    servicesFilter?: IServicesFilter,
    loadRangeOptions?: ILoadRangeOptions,
    noCache?: boolean
  ): Promise<IOfferedServicesWithCount> {
    const response = await apolloClient
      .query({
        query: GET_OFFERED_SERVICES,
        variables: { range: loadRangeOptions, filter: servicesFilter },
        fetchPolicy: (noCache && "network-only") || undefined,
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

  public async getSpecialistMyOfferedServices(
    range?: ILoadRangeOptions
  ): Promise<IOfferedServicesWithCount> {
    const response = await apolloClient
      .query({
        fetchPolicy: "network-only",
        query: GET_SPECIALIST_MY_OFFERED_SERVICES,
        variables: { range },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.offeredServicesWithCount) {
      //get the right service type
      const offeredServices = this.resolverServicesType(
        response.data.offeredServicesWithCount.offeredServices
      );
      const count = response.data.offeredServicesWithCount.count;

      return { offeredServices, count };
    } else throw new Error(offeredServicesMessages.cannotFetchOfferedServices);
  }

  public async getSpecialistOfferedServices(
    specialistId: string,
    range: ILoadRangeOptions
  ): Promise<IOfferedServicesWithCount> {
    const response = await apolloClient
      .query({
        fetchPolicy: "network-only",
        query: GET_SPECIALIST_OFFERED_SERVICES,
        variables: { specialistId, range },
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

      return { offeredServices, count };
    } else
      throw new Error(
        offeredServicesMessages.cannotFetchSpecialistOfferedServices
      );
  }

  public async getSpecialistPendingServiceRequests(
    range?: ILoadRangeOptions
  ): Promise<IPendingServicesRequestsWithCount> {
    const response = await apolloClient
      .query({
        query: GET_SPECIALIST_PENDING_SERVICE_REQUESTS,
        variables: { range },
        fetchPolicy: "network-only",
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (
      response &&
      response.data &&
      response.data.pendingServicesRequestsWithCount
    )
      return response.data.pendingServicesRequestsWithCount;
    else throw new Error(offeredServicesMessages.cannotFetchPendingRequests);
  }

  public async specialistAcceptPendingRequest(
    requestId: string
  ): Promise<IPendingServiceRequest> {
    const response = await apolloClient
      .mutate({
        mutation: SPECIALIST_ACCEPT_PENDING_SERVICE_REQUEST,
        variables: { requestId },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.pendingServiceRequest)
      return response.data.pendingServiceRequest;
    else throw new Error(offeredServicesMessages.cannoAcceptPendingRequest);
  }

  public async specialistRejectPendingRequest(
    requestId: string
  ): Promise<IPendingServiceRequest> {
    const response = await apolloClient
      .mutate({
        mutation: SPECIALIST_REJECT_PENDING_SERVICE_REQUEST,
        variables: { requestId },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.pendingServiceRequest)
      return response.data.pendingServiceRequest;
    else throw new Error(offeredServicesMessages.cannoAcceptPendingRequest);
  }

  public async updateOfferedService(
    updateData: IUpdateOfferedServiceDTO
  ): Promise<boolean> {
    const response = await apolloClient
      .mutate({
        mutation: UPDATE_OFFERED_SERVICE,
        variables: { updateServiceInput: updateData },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data) return true;
    else throw new Error(offeredServicesMessages.cannotUpdateService);
  }

  public async deleteOfferedService(serviceId: string): Promise<boolean> {
    const response = await apolloClient
      .mutate({ mutation: DELETE_OFFERED_SERVICE, variables: { serviceId } })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.deleted) return true;
    else throw new Error(offeredServicesMessages.cannotDeleteService);
  }

  public async getSpecialistRejectedServiceRequests(
    range?: ILoadRangeOptions
  ): Promise<IPendingServicesRequestsWithCount> {
    const response = await apolloClient
      .query({
        query: GET_SPECIALIST_REJECTED_SERVICE_REQUESTS,
        variables: { range },
        fetchPolicy: "network-only",
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.rejectedRequestsWithCount)
      return response.data.rejectedRequestsWithCount;
    else throw new Error(offeredServicesMessages.cannotFetchRejectedRequests);
  }

  public async getSpecialistAllFinishedProjects(
    range?: ILoadRangeOptions
  ): Promise<IFinishedProjectsWithCount> {
    const response = await apolloClient
      .query({
        query: GET_SPECIALIST_ALL_FINISHED_PROJECTS,
        variables: { range },
        fetchPolicy: "network-only",
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.finishedProjectsWithCount)
      return response.data.finishedProjectsWithCount;
    else throw new Error(offeredServicesMessages.cannotFetchFinishedProjects);
  }

  public async getSpecialistFinishedServicesById(
    specialistId: string,
    range?: ILoadRangeOptions
  ): Promise<IFinishedProjectsWithCount> {
    const response = await apolloClient
      .query({
        query: GET_SPECIALIST_FINISHED_SERVICES_BY_ID,
        variables: { specialistId, range },
        fetchPolicy: "network-only",
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.finishedProjectsWithCount)
      return response.data.finishedProjectsWithCount;
    else
      throw new Error(
        offeredServicesMessages.cannotFetchFinishedProjectsOfSpecialist
      );
  }

  public async getOfferedServiceById(
    serviceId: string
  ): Promise<IOfferedService> {
    const response = await apolloClient
      .query({
        query: GET_OFFERED_SERVICE,
        variables: { serviceId },
        fetchPolicy: "network-only",
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.offeredService) {
      return this.resolverServicesType([response.data.offeredService])[0];
    } else
      throw new Error(offeredServicesMessages.cannotFetchOfferedServiceById);
  }

  public async requestService(
    serviceId: string
  ): Promise<IPendingServiceRequest> {
    const response = await apolloClient
      .mutate({
        mutation: REQUEST_SERVICE,
        variables: { serviceId },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.pendingServiceRequest)
      return response.data.pendingServiceRequest;
    else throw new Error(offeredServicesMessages.cannotRequestService);
  }

  public async getCustomerAllFinishedProjects(
    range?: ILoadRangeOptions
  ): Promise<IFinishedProjectsWithCount> {
    const response = await apolloClient
      .query({
        query: GET_CUSTOMER_ALL_FINISHED_SERVICES,
        variables: { range },
        fetchPolicy: "network-only",
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.finishedProjectsWithCount)
      return response.data.finishedProjectsWithCount;
    else
      throw new Error(
        offeredServicesMessages.cannotFetchCustomerFinishedServices
      );
  }

  public async getCustomerAllPendingServicesRequests(
    range?: ILoadRangeOptions
  ): Promise<IPendingServicesRequestsWithCount> {
    const response = await apolloClient
      .query({
        query: GET_CUSTOMER_ALL_PENDING_SERVICES_REQUESTS,
        variables: { range },
        fetchPolicy: "network-only",
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.pendingRequestsWithCount)
      return response.data.pendingRequestsWithCount;
    else
      throw new Error(
        offeredServicesMessages.cannotFetchCustomerPendingRequests
      );
  }

  public async customerAcceptFinishedService(
    finishedServiceId: string
  ): Promise<IFinishedProject> {
    const response = await apolloClient
      .mutate({
        mutation: CUSTOMER_ACCEPT_FINISHED_SERVICE,
        variables: { finishedServiceId },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.finishedProject)
      return response.data.finishedProject;
    else throw new Error(offeredServicesMessages.cannotAcceptFinishedProject);
  }

  public async customerRejectFinishedService(
    finishedServiceId: string
  ): Promise<IFinishedProject> {
    const response = await apolloClient
      .mutate({
        mutation: CUSTOMER_REJECT_FINISHED_SERVICE,
        variables: { finishedServiceId },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.finishedProject)
      return response.data.finishedProject;
    else throw new Error(offeredServicesMessages.cannotRejectFinishedProject);
  }
}

export default new OfferedServicesService();
