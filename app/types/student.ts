import { UserRole } from './user';

export interface IStudent {
  id: string;
  username: string;
  email: string;
  fullName: string;
  picture?: string;
  role: UserRole;
  access_token?: string;
}

export interface IStudentRegisterDTO {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export interface IStudentLoginDTO {
  username: string;
  password: string;
}

export interface IUpdateStudentDTO {
  id: string;
  fullName?: string;
  email?: string;
  picture?: string;
}

export interface IUpdateStudentPasswordDTO {
  id: string;
  currentPassword: string;
  newPassword: string;
}
