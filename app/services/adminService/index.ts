import { IAdmin, ILoginAdminDTO } from "types/admin";
import { apolloClient } from "apolloGraphql";
import { LOGIN_ADMIN } from "./queries";
import { parseGraphqlError } from "utils/error";
import messages from "./messages";

class AdminService {
  public async login(loginData: ILoginAdminDTO): Promise<IAdmin> {
    const loginResponse = await apolloClient
      .query({ query: LOGIN_ADMIN, variables: { loginAdminInput: loginData } })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (loginResponse && loginResponse.data && loginResponse.data.admin)
      return loginResponse.data.admin;
    else throw new Error(messages.errorLoginAdmin);
  }
}

export default new AdminService();
