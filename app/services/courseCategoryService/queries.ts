import gql from 'graphql-tag';

export const GET_COURSE_CATEGORIES = gql`
  query getCourseCategories {
    categories {
      id
      name
      logoUrl
    }
  }
`;
