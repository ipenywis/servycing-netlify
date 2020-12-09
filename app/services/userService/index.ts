import { IAdmin } from "types/admin";
import messages from "./messages";
import endpoints from "endpoints";
import Axios from "axios";
import { ICustomer } from "types/customer";
import { ISpecialist } from "types/specialist";

class UserService {
  public async getAuthenticatedUser(): Promise<
    ICustomer | IAdmin | ISpecialist
  > {
    const response = await Axios.get(endpoints.GET_AUTHENTICATED_USER).catch(
      (err) => {
        throw err;
      }
    );

    if (response && response.data && response.data.data)
      return response.data.data;
    else throw new Error(messages.cannotFetchUser);
  }
}

export default new UserService();
