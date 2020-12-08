import { apolloClient } from "apolloGraphql";
import {
  ILoginSpecialistDTO,
  IRegisterSpecialistDTO,
  ISpecialist,
  IUpdateSpecialistDTO,
} from "types/specialist";
import { parseGraphqlError } from "utils/error";
import {
  DELETE_SPECIALIST,
  REGISTER_SPECIALIST,
  UPDATE_SPECIALIST,
} from "./mutations";
import { GET_SPECIALISTS, LOGIN_SPECIALIST } from "./queries";
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

  public async getSpecialists(): Promise<ISpecialist[]> {
    const response = await apolloClient
      .query({ query: GET_SPECIALISTS, fetchPolicy: "network-only" })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.specialists)
      return response.data.specialists;
    else throw new Error(specialistMessages.cannotFetchSpecialists);
  }

  public async delete(specialistId: string): Promise<boolean> {
    const response = await apolloClient
      .mutate({ mutation: DELETE_SPECIALIST, variables: { specialistId } })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.deleted) return true;
    else throw new Error(specialistMessages.cannotFetchSpecialists);
  }

  public async update(updatedData: IUpdateSpecialistDTO): Promise<boolean> {
    const response = await apolloClient
      .mutate({
        mutation: UPDATE_SPECIALIST,
        variables: { updateSpecialistInput: updatedData },
      })
      .catch((err) => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.updated) return true;
    else throw new Error(specialistMessages.cannotUpdateSpecialist);
  }
}

export default new SpecialistService();
