import gql from "graphql-tag";

export const REGISTER_SPECIALIST = gql`
  mutation REGISTER_SPECIALIST($newSpecialistInput: NewSpecialistInput!) {
    specialist: registerSpecialist(newSpecialistInput: $newSpecialistInput) {
      id
      fullName
      email
      shortBio
      rating
    }
  }
`;
