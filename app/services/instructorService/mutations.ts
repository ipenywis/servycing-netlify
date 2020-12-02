import gql from 'graphql-tag';

export const REGISTER_INSTRUCTOR = gql`
  mutation registerInstructor($newInstructorData: NewInstructorInput!) {
    instructor: registerInstructor(newInstructorData: $newInstructorData) {
      id
      username
      firstName
      lastName
      picture
      email
      bio
      shortBio
      role
    }
  }
`;

export const UPDATE_INSTRUCTOR = gql`
  mutation updateInstructor($updateInstructorData: UpdateInstructorInput!) {
    instructor: updateInstructor(updateInstructorData: $updateInstructorData) {
      id
      username
      firstName
      lastName
      picture
      email
      bio
      shortBio
      role
    }
  }
`;

export const DELETE_INSTRUCTOR = gql`
  mutation deleteInstructor($id: String!) {
    deleted: deleteInstructor(id: $id)
  }
`;
