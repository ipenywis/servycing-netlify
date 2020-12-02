import gql from 'graphql-tag';

export const DELETE_COURSE_CATEGORY = gql`
  mutation deleteCourseCategory($id: String!) {
    deleted: deleteCourseCategory(id: $id)
  }
`;

export const ADD_NEW_COURSE_CATEGORY = gql`
  mutation addNewCourseCategory($newCategoryData: NewCourseCategoryInput!) {
    courseCategory: addNewCourseCategory(newCategoryData: $newCategoryData) {
      id
      name
      logoUrl
    }
  }
`;
