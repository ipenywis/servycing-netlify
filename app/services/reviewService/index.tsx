import { apolloClient } from "apolloGraphql";
import { IServiceReview } from "types/serviceReview";
import { parseGraphqlError } from "utils/error";
import { DELETE_REVIEW } from "./mutations";
import { GET_ALL_REVIEWS } from "./queries";
import reviewMessages from "./reviewMessages";

class ReviewService {
  public async getAllReviews(): Promise<IServiceReview[]> {
    const response = await apolloClient
      .query({ query: GET_ALL_REVIEWS })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.serviceReviews)
      return response.data.serviceReviews;
    else throw new Error(reviewMessages.cannotFetchAllReviews);
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
}

export default new ReviewService();
