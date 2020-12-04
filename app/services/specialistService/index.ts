import { apolloClient } from "apolloGraphql";
import {
  ILoginSpecialistDTO,
  IRegisterSpecialistDTO,
  ISpecialist,
} from "types/specialist";
import { parseGraphqlError } from "utils/error";
import { REGISTER_SPECIALIST } from "./mutations";
import { LOGIN_SPECIALIST } from "./queries";
import specialistMessages from "./specialistMessages";

class SpecialistService {
  public async register(
    registerData: IRegisterSpecialistDTO
  ): Promise<ISpecialist> {
    const registerResponse = await apolloClient
      .mutate({
        mutation: REGISTER_SPECIALIST,
        variables: { newSpecialistInput: registerData },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (
      registerResponse &&
      registerResponse.data &&
      registerResponse.data.specialist
    )
      return registerResponse.data.specialist;
    else throw new Error(specialistMessages.errorRegisteringSpecialist);
  }

  public async login(loginData: ILoginSpecialistDTO): Promise<ISpecialist> {
    const loginResponse = await apolloClient
      .query({
        query: LOGIN_SPECIALIST,
        variables: { loginSpecialistInput: loginData },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (
      loginResponse &&
      loginResponse.data &&
      loginResponse.data.specialist &&
      loginResponse.data.specialist.access_token
    )
      return loginResponse.data.specialist;
    else throw new Error(specialistMessages.errorLoginSpecialist);
  }
}

export default new SpecialistService();
