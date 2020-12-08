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

export const GET_CUSTOMERS = gql`
  query GET_CUSTOMERS {
    customers {
      id
      fullName
      email
    }
  }
`;
