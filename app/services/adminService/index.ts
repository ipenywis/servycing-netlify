import { IAdmin, IAdminLoginDTO } from 'types/admin';
import { apolloClient } from 'apolloGraphql';
import { LOGIN_ADMIN } from './mutations';
import { parseGraphqlError } from 'utils/error';
import messages from './messages';

class AdminService {
  public async login(loginAdminData: IAdminLoginDTO): Promise<IAdmin> {
    const response = await apolloClient
      .mutate({ mutation: LOGIN_ADMIN, variables: { loginAdminData } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.admin)
      return response.data.admin;
    else throw new Error(messages.errorLoginAdmin);
  }
}

export default new AdminService();
