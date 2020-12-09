import gql from "graphql-tag";

export const LOGIN_SPECIALIST = gql`
  query LOGIN_SPECIALIST($loginSpecialistInput: LoginSpecialistInput!) {
    specialist: loginSpecialist(loginSpecialistInput: $loginSpecialistInput) {
      id
      fullName
      shortBio
      access_token
      email
      rating
    }
  }
`;

export const GET_SPECIALISTS = gql`
  query GET_SPECIALISTS {
    specialists {
      id
      fullName
      email
      shortBio
      rating
    }
  }
`;

export const GET_SPECIALIST_BY_NAME = gql`
  query GET_SPECIALIST_BY_NAME($name: String!) {
    specialist: specialistByName(name: $name) {
      id
      fullName
      rating
      shortBio
      offeredServices: services {
        id
        title
        thumbnailUrl
        description
      }
    }
  }
`;
