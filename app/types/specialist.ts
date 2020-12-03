import { IOfferedService } from "./offeredService";

export interface ISpecialist {
  id?: string;
  fullName: string;
  email: string;
  rating: number;
  shortBio: string;
  offeredServices?: IOfferedService[];
  access_token?: string;
}
