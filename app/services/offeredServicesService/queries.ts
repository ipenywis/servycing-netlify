import gql from "graphql-tag";

export const GET_OFFERED_SERVICES = gql`
  query OFFERED_SERVICES(
    $range: LoadRangeOptions
    $filter: ServicesFilterInput
  ) {
    offeredServicesWithCount: offeredServices(range: $range, filter: $filter) {
      count
      offeredServices {
        id
        title
        description
        type
        rate
        preferredHours
        specialist {
          id
          fullName
          email
          rating
          shortBio
        }
        reviews {
          id
        }
      }
    }
  }
`;

export const GET_SPECIALIST_MY_OFFERED_SERVICES = gql`
  query GET_SPECIALIST_OFFERED_SERVICES {
    offeredServices: specialistMyOfferedServices {
      id
      title
      description
      type
      rate
      preferredHours
      thumbnailUrl
      specialist {
        id
        fullName
        email
        rating
        shortBio
      }
      reviews {
        id
      }
    }
  }
`;

export const GET_SPECIALIST_PENDING_SERVICE_REQUESTS = gql`
  query GET_SPECIALIST_PENDING_SERVICE_REQUESTS {
    pendingServiceRequests: specialistPendingServiceRequests {
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

export const GET_SPECIALIST_REJECTED_SERVICE_REQUESTS = gql`
  query GET_SPECIALIST_REJECTED_SERVICE_REQUESTS {
    rejectedRequests: specialistRejectedServiceRequests {
      id
      offeredService {
        id
        title
        rate
      }
      customer {
        id
        fullName
      }
      status
    }
  }
`;

export const GET_SPECIALIST_ALL_FINISHED_PROJECTS = gql`
  query GET_SPECIALIST_FINISHED_PROJECTS {
    finishedProjects: specialistAllFinishedServices {
      id
      offeredService {
        id
        title
        rate
      }
      customer {
        id
        fullName
      }
      status
    }
  }
`;
