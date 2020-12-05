import { IAdmin } from "types/admin";
import { IInstructor } from "types/instructor";
import { IStudent } from "types/student";
import { IUser } from "types/user";

export interface IAuthenticationState {
  isCustomerAuthenticated: boolean;
  isSpecialistAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  authenticatedUser: IUser | null;
}
