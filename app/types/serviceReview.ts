import { ICustomer } from "./customer";

export interface IServiceReview {
  id: string;
  review: string;
  rating: number;
  customer: ICustomer;
}
