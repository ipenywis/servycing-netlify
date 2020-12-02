import gql from 'graphql-tag';

export const LOGIN_ADMIN = gql`
  mutation loginAdmin($loginAdminData: LoginAdminInput!) {
    admin: loginAdmin(loginAdminData: $loginAdminData) {
      id
      email
      firstName
      lastName
      access_token
    }
  }
`;
