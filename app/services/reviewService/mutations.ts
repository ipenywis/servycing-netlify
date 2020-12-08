import gql from "graphql-tag";

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($reviewId: String!) {
    deleted: deleteReview(reviewId: $reviewId)
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UPDATE_REVIEW($updateReviewInput: UpdateReviewInput!) {
    updated: updateReview(updateReviewInput: $updateReviewInput)
  }
`;
