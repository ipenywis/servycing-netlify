import gql from 'graphql-tag';

export const REGISTER_STUDENT = gql`
  mutation REGISTER_STUDENT($newStudentData: NewStudentInput!) {
    student: registerStudent(newStudentData: $newStudentData) {
      id
      email
      username
      fullName
      role
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UPDATE_STUDENT($updateStudentData: UpdateStudentInput!) {
    student: updateStudent(updateStudentData: $updateStudentData) {
      id
      fullName
      email
      username
      picture
      role
    }
  }
`;
