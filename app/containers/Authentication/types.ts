import { IUser } from "types/user";

export interface IAuthenticationState {
  isCustomerAuthenticated: boolean;
  isSpecialistAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  authenticatedUser: IUser | null;
}
