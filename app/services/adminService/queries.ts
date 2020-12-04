import gql from "graphql-tag";

export const LOGIN_ADMIN = gql`
  query loginAdmin($loginAdminInput: LoginAdminInput!) {
    admin: loginAdmin(loginAdminInput: $loginAdminInput) {
      id
      email
      fullName
      access_token
    }
  }
`;
