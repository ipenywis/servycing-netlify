import { apolloClient } from "apolloGraphql";
import { IRegisterSpecialistDTO, ISpecialist } from "types/specialist";
import { parseGraphqlError } from "utils/error";
import { REGISTER_SPECIALIST } from "./mutations";
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
}

export default new SpecialistService();
