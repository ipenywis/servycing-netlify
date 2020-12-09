import { apolloClient } from "apolloGraphql";
import {
  INewReviewDTO,
  IServiceReview,
  IUpdateReviewDTO,
} from "types/serviceReview";
import { parseGraphqlError } from "utils/error";
import { DELETE_REVIEW, NEW_REVIEW, UPDATE_REVIEW } from "./mutations";
import { GET_ALL_REVIEWS } from "./queries";
import reviewMessages from "./reviewMessages";

class ReviewService {
  public async getAllReviews(): Promise<IServiceReview[]> {
    const response = await apolloClient
      .query({ query: GET_ALL_REVIEWS, fetchPolicy: "network-only" })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.serviceReviews)
      return response.data.serviceReviews;
    else throw new Error(reviewMessages.cannotFetchAllReviews);
  }

  public async submitReview(
    newServiceReviewInput: INewReviewDTO
  ): Promise<IServiceReview> {
    const response = await apolloClient
      .mutate({ mutation: NEW_REVIEW, variables: { newServiceReviewInput } })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.serviceReview)
      return response.data.serviceReview;
    else throw new Error(reviewMessages.cannotSubmitReview);
  }

  public async delete(reviewId: string): Promise<boolean> {
    const response = await apolloClient
      .mutate({ mutation: DELETE_REVIEW, variables: { reviewId } })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.delete) return true;
    else throw new Error(reviewMessages.cannotDeleteServiceReview);
  }

  public async update(updateReviewInput: IUpdateReviewDTO): Promise<boolean> {
    const response = await apolloClient
      .mutate({ mutation: UPDATE_REVIEW, variables: { updateReviewInput } })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.updated) return true;
    else throw new Error(reviewMessages.cannotUpdateServiceReview);
  }
}

export default new ReviewService();
