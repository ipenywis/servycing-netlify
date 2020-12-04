export interface IAdmin {
  id: string;
  email: string;
  fullName: string;
  access_token?: string;
}

export interface ILoginAdminDTO {
  email: string;
  password: string;
}
