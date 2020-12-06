import gql from "graphql-tag";

export const ADD_NEW_SERVICE = gql`
  mutation ADD_NEW_SERVICE($newServiceInput: NewServiceInput!) {
    offeredService: addService(newServiceInput: $newServiceInput) {
      id
      title
      thumbnailUrl
      description
      preferredHours
      rate
    }
  }
`;
