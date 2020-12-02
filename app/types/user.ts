import { IAdmin } from './admin';
import { IInstructor } from './instructor';
import { IStudent } from './student';

export enum UserRole {
  ADMIN = 0,
  STUDENT = 1,
  INSTRUCTOR = 2,
}

export type IUser = IAdmin & IInstructor & IStudent;
