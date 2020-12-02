import gql from 'graphql-tag';

export const LOGIN_INSTRUCTOR = gql`
  query loginInstructor($loginData: LoginInstructorInput!) {
    instructor: loginInstructor(loginInstructorData: $loginData) {
      id
      username
      firstName
      lastName
      email
      role
      access_token
    }
  }
`;

export const GET_INSTRUCTORS = gql`
  query getInstructors {
    instructors {
      id
      username
      email
      firstName
      lastName
      picture
      bio
      shortBio
      role
    }
  }
`;
