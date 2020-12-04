import gql from "graphql-tag";

export const REGISTER_CUSTOMER = gql`
  mutation REGISTER_CUSTOMER($newCustomerInput: NewCustomerInput!) {
    customer: registerCustomer(newCustomerInput: $newCustomerInput) {
      id
      fullName
      email
    }
  }
`;
