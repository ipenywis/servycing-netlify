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

export const DELETE_CUSTOMER = gql`
  mutation DELETE_CUSTOMER($customerId: String!) {
    deleted: deleteCustomer(customerId: $customerId)
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UPDATE_CUSTOMER($updateCustomerInput: UpdateCustomerInput!) {
    updated: updateCustomer(updateCustomerInput: $updateCustomerInput)
  }
`;
