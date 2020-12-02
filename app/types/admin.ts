export interface IAdmin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  access_token?: string;
}

export interface IAdminLoginDTO {
  email: string;
  password: string;
}
