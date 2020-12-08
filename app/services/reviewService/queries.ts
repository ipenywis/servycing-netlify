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
