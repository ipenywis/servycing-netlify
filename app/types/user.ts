import { IAdmin } from "./admin";
import { ICustomer } from "./customer";
import { ISpecialist } from "./specialist";

export enum UserRole {
  ADMIN = 0,
  CUSTOMER = 1,
  SPECIALIST = 2,
}

export type IUser = IAdmin & ISpecialist & ICustomer;
