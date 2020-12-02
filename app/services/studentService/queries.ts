import gql from 'graphql-tag';

export const LOGIN_STUDENT = gql`
  query LOGIN_STUDENT($loginStudentData: LoginStudentInput!) {
    student: loginStudent(loginUserData: $loginStudentData) {
      id
      email
      username
      fullName
      role
      access_token
    }
  }
`;
