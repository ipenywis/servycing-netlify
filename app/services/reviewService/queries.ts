import gql from "graphql-tag";

export const GET_ALL_REVIEWS = gql`
  query GET_ALL_REVIEWS {
    serviceReviews {
      id
      review
      rating
      customer {
        id
        fullName
      }
    }
  }
`;

export const GET_SPECIALIST_SERVICES_REVIEWS = gql`
  query GET_SPECIALIST_SERVICES_REVIEWS(
    $specialistId: String!
    $range: LoadRangeOptions
  ) {
    servicesReviewsWithCount: specialistServicesReviews(
      specialistId: $specialistId
      range: $range
    ) {
      count
      servicesReviews {
        id
        rating
        review
        customer {
          id
          fullName
        }
      }
    }
  }
`;
