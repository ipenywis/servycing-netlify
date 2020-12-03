import gql from "graphql-tag";

export const GET_OFFERED_SERVICES = gql`
  query OFFERED_SERVICES(
    $range: LoadRangeOptions
    $filter: ServicesFilterInput
  ) {
    offeredServices(range: $range, filter: $filter) {
      id
      title
      description
      type
      rate
      preferredHours
      specialist {
        id
        fullName
        rating
      }
      reviews {
        id
      }
    }
  }
`;
