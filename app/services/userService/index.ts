import { IStudent } from 'types/student';
import { IAdmin } from 'types/admin';
import { IInstructor } from 'types/instructor';
import messages from './messages';
import endpoints from 'endpoints';
import Axios from 'axios';

class UserService {
  public async getAuthenticatedUser(): Promise<
    IStudent | IAdmin | IInstructor
  > {
    const response = await Axios.get(endpoints.GET_AUTHENTICATED_USER).catch(
      err => {
        throw err;
      },
    );

    if (response && response.data && response.data.data)
      return response.data.data;
    else throw new Error(messages.cannotFetchUser);
  }
}

export default new UserService();
