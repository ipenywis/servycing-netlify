import { apolloClient } from "apolloGraphql";
import {
  ICustomer,
  ILoginCustomerDTO,
  IRegisterCustomerDTO,
} from "types/customer";
import { parseGraphqlError } from "utils/error";
import customerMessages from "./customerMessages";
import { REGISTER_CUSTOMER } from "./mutations";
import { LOGIN_CUSTOMER } from "./queries";

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
}

export default new CustomerService();
