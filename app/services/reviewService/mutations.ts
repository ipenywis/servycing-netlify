import gql from "graphql-tag";

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($reviewId: String!) {
    deleted: deleteReview(reviewId: $reviewId)
  }
`;
