import {
  IStudent,
  IStudentRegisterDTO,
  IStudentLoginDTO,
  IUpdateStudentDTO,
  IUpdateStudentPasswordDTO,
} from 'types/student';
import { apolloClient } from 'apolloGraphql';
import messages from './messages';
import { REGISTER_STUDENT, UPDATE_STUDENT } from './mutations';
import { parseGraphqlError } from 'utils/error';
import { LOGIN_STUDENT } from './queries';

class StudentService {
  async register(studentRegisterData: IStudentRegisterDTO): Promise<IStudent> {
    const mutationResult = await apolloClient
      .mutate({
        mutation: REGISTER_STUDENT,
        variables: { newStudentData: studentRegisterData },
      })
      .catch(err => {
        const error = parseGraphqlError(err, messages.errorRegistering);
        throw error;
      });

    if (!mutationResult) throw new Error(messages.errorRegistering);
    return mutationResult.data.student;
  }

  async login(loginStudentData: IStudentLoginDTO): Promise<IStudent> {
    const queryResult = await apolloClient
      .query({ query: LOGIN_STUDENT, variables: { loginStudentData } })
      .catch(() => {
        throw new Error(messages.errorLogin);
      });

    if (!queryResult) throw new Error(messages.errorLogin);
    return queryResult.data.student;
  }

  public async updateStudent(
    updateStudentData: IUpdateStudentDTO | IUpdateStudentPasswordDTO,
  ): Promise<IStudent> {
    const response = await apolloClient
      .mutate({ mutation: UPDATE_STUDENT, variables: { updateStudentData } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.student)
      return response.data.student;
    else throw new Error(messages.cannotUpdateStudent);
  }
}

export default new StudentService();
