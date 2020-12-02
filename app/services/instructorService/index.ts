import {
  IInstructorLoginDTO,
  IInstructor,
  INewInstructorDTO,
  IUpdateInstructorDTO,
} from 'types/instructor';
import { apolloClient } from 'apolloGraphql';
import { LOGIN_INSTRUCTOR, GET_INSTRUCTORS } from './queries';
import { parseGraphqlError } from 'utils/error';
import messages from './messages';
import {
  REGISTER_INSTRUCTOR,
  UPDATE_INSTRUCTOR,
  DELETE_INSTRUCTOR,
} from './mutations';

class InstructorService {
  public async login(loginData: IInstructorLoginDTO): Promise<IInstructor> {
    const queryResult = await apolloClient
      .query({ query: LOGIN_INSTRUCTOR, variables: { loginData } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (
      queryResult &&
      queryResult.data &&
      queryResult.data.instructor &&
      queryResult.data.instructor.access_token
    )
      return queryResult.data.instructor;
    else throw new Error(messages.errorLogin);
  }

  public async register(
    newInstructorData: INewInstructorDTO,
  ): Promise<IInstructor> {
    const response = await apolloClient
      .mutate({
        mutation: REGISTER_INSTRUCTOR,
        variables: { newInstructorData },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.instructor)
      return response.data.instructor;
    else throw new Error(messages.cannotRegister);
  }

  public async getInstructors(): Promise<IInstructor[]> {
    const response = await apolloClient
      .query({ query: GET_INSTRUCTORS })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.instructors)
      return response.data.instructors;
    else throw new Error(messages.cannotFetchInstructors);
  }

  public async update(
    updateInstructorData: IUpdateInstructorDTO,
  ): Promise<IInstructor> {
    const response = await apolloClient
      .mutate({
        mutation: UPDATE_INSTRUCTOR,
        variables: { updateInstructorData },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.instructor)
      return response.data.instructor;
    else throw new Error(messages.cannoUpdate);
  }

  public async delete(id: string): Promise<boolean> {
    const response = await apolloClient
      .mutate({ mutation: DELETE_INSTRUCTOR, variables: { id } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.deleted) return true;
    else throw new Error(messages.cannotDelete);
  }
}

export default new InstructorService();
