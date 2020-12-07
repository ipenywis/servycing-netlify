import gql from "graphql-tag";

export const ADD_NEW_SERVICE = gql`
  mutation ADD_NEW_SERVICE($newServiceInput: NewServiceInput!) {
    offeredService: addService(newServiceInput: $newServiceInput) {
      id
      title
      thumbnailUrl
      description
      preferredHours
      rate
    }
  }
`;

export const SPECIALIST_ACCEPT_PENDING_SERVICE_REQUEST = gql`
  mutation SPECIALIST_ACCEPT_PENDING_SERVICE_REQUEST($requestId: String!) {
    pendingServiceRequest: specialistAcceptPendingRequest(
      pendingServiceRequestId: $requestId
    ) {
      id
      offeredService {
        id
        title
      }
      customer {
        id
        fullName
      }
      status
    }
  }
`;

export const SPECIALIST_REJECT_PENDING_SERVICE_REQUEST = gql`
  mutation SPECIALIST_ACCEPT_PENDING_SERVICE_REQUEST($requestId: String!) {
    pendingServiceRequest: specialistRejectPendingRequest(
      pendingServiceRequestId: $requestId
    ) {
      id
      offeredService {
        id
        title
      }
      customer {
        id
        fullName
      }
      status
    }
  }
`;

export const UPDATE_OFFERED_SERVICE = gql`
  mutation UPDATE_OFFERED_SERVICE(
    $updateServiceInput: UpdateOfferedServiceInput!
  ) {
    updateService(updateServiceInput: $updateServiceInput)
  }
`;

export const DELETE_OFFERED_SERVICE = gql`
  mutation DELETE_OFFERED_SERVICE($serviceId: String!) {
    deleted: deleteService(serviceId: $serviceId)
  }
`;

export const REQUEST_SERVICE = gql`
  mutation REQUEST_SERVICE($serviceId: String!) {
    pendingServiceRequest: requestService(serviceId: $serviceId) {
      id
      offeredService {
        id
      }
    }
  }
`;

export const CUSTOMER_ACCEPT_FINISHED_SERVICE = gql`
  mutation CUSTOMER_ACCEPT_FINISHED_SERVICE($finishedServiceId: String!) {
    finishedProject: customerAcceptFinishedService(
      finishedServiceId: $finishedServiceId
    ) {
      id
      offeredService {
        id
        title
        specialist {
          id
          fullName
        }
      }
      customer {
        id
        fullName
      }
      status
    }
  }
`;

export const CUSTOMER_REJECT_FINISHED_SERVICE = gql`
  mutation CUSTOMER_REJECT_FINISHED_SERVICE($finishedServiceId: String!) {
    finishedProject: customerRejectFinishedService(
      finishedServiceId: $finishedServiceId
    ) {
      id
      offeredService {
        id
        title
        specialist {
          id
          fullName
        }
      }
      customer {
        id
        fullName
      }
      status
    }
  }
`;
