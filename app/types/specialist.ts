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

export interface IRegisterSpecialistDTO {
  fullName: string;
  email: string;
  shortBio: string;
  password: string;
}
