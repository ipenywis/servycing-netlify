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
