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
