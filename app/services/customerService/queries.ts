import gql from "graphql-tag";

export const LOGIN_CUSTOMER = gql`
  query LOGIN_CUSTOMER($loginCustomerInput: LoginCustomerInput!) {
    customer: loginCustomer(loginCustomerInput: $loginCustomerInput) {
      id
      fullName
      email
      access_token
    }
  }
`;
