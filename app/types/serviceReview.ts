import { ICustomer } from "./customer";

export interface IServiceReview {
  id: string;
  review: string;
  rating: number;
  customer: ICustomer;
}

export interface IServicesReviewsWithCount {
  count: number;
  servicesReviews: IServiceReview[];
}

export interface INewReviewDTO {
  finishedServiceId: string;
  review: string;
  rating: number;
}

export interface IUpdateReviewDTO {
  id: string;
  review?: string;
  rating?: string;
}
