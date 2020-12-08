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

export const DELETE_SPECIALIST = gql`
  mutation DELETE_SPECIALIST($specialistId: String!) {
    deleted: deleteSpecialist(specialistId: $specialistId)
  }
`;

export const UPDATE_SPECIALIST = gql`
  mutation UPDATE_SPECIALIST($updateSpecialistInput: UpdateSpecialistInput!) {
    updated: updateSpecialist(updateSpecialistInput: $updateSpecialistInput)
  }
`;
