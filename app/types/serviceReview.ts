import { ICustomer } from "./customer";

export interface IServiceReview {
  id: string;
  review: string;
  rating: number;
  customer: ICustomer;
}

export interface IUpdateReviewDTO {
  id: string;
  review?: string;
  rating?: string;
}
