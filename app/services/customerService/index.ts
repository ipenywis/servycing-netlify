import { apolloClient } from "apolloGraphql";
import {
  ICustomer,
  ILoginCustomerDTO,
  IRegisterCustomerDTO,
  IUpdateCustomerDTO,
} from "types/customer";
import { parseGraphqlError } from "utils/error";
import customerMessages from "./customerMessages";
import {
  DELETE_CUSTOMER,
  REGISTER_CUSTOMER,
  UPDATE_CUSTOMER,
} from "./mutations";
import { GET_CUSTOMERS, LOGIN_CUSTOMER } from "./queries";

class CustomerService {
  public async register(
    registerData: IRegisterCustomerDTO
  ): Promise<ICustomer> {
    const registerResponse = await apolloClient
      .mutate({
        mutation: REGISTER_CUSTOMER,
        variables: { newCustomerInput: registerData },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (
      registerResponse &&
      registerResponse.data &&
      registerResponse.data.customer
    )
      return registerResponse.data.customer;
    else throw new Error(customerMessages.cannotRegisterCustomer);
  }

  public async login(loginData: ILoginCustomerDTO): Promise<ICustomer> {
    const loginResponse = await apolloClient
      .query({
        query: LOGIN_CUSTOMER,
        variables: { loginCustomerInput: loginData },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (loginResponse && loginResponse.data && loginResponse.data.customer)
      return loginResponse.data.customer;
    else throw new Error(customerMessages.cannoLoginCustomer);
  }

  public async getCustomers(): Promise<ICustomer[]> {
    const loginResponse = await apolloClient
      .query({
        query: GET_CUSTOMERS,
        fetchPolicy: "network-only",
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (loginResponse && loginResponse.data && loginResponse.data.customers)
      return loginResponse.data.customers;
    else throw new Error(customerMessages.cannotFetchCustomers);
  }

  public async delete(customerId: string): Promise<boolean> {
    const registerResponse = await apolloClient
      .mutate({
        mutation: DELETE_CUSTOMER,
        variables: { customerId },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (
      registerResponse &&
      registerResponse.data &&
      registerResponse.data.deleted
    )
      return true;
    else throw new Error(customerMessages.cannotDeleteCustomer);
  }

  public async update(updatedData: IUpdateCustomerDTO): Promise<boolean> {
    const registerResponse = await apolloClient
      .mutate({
        mutation: UPDATE_CUSTOMER,
        variables: { updateCustomerInput: updatedData },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (
      registerResponse &&
      registerResponse.data &&
      registerResponse.data.updated
    )
      return true;
    else throw new Error(customerMessages.cannotUpdateCustomer);
  }
}

export default new CustomerService();
