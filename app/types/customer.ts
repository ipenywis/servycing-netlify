export interface ICustomer {
  id: string;
  fullName: string;
  email: string;
  password: string;
  access_token?: string;
}

export interface IRegisterCustomerDTO {
  email: string;
  fullName: string;
  password: string;
}

export interface IUpdateCustomerDTO {
  id: string;
  email?: string;
  fullName?: string;
  password?: string;
}

export interface ILoginCustomerDTO {
  email: string;
  password: string;
}
