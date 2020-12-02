import gql from 'graphql-tag';

export const ADD_NEW_COURSE = gql`
  mutation addNewCourse($newCourseData: NewCourseInput!) {
    course: addNewCourse(newCourseData: $newCourseData) {
      id
      published
      name
      description
      price
      free
      slugs {
        id
        slug
      }
      content {
        id
      }
    }
  }
`;

export const BULK_UPDATE_COURSE = gql`
  mutation bulkUpdateCourse($updateCourseData: BulkUpdateCourseInput!) {
    course: bulkUpdateCourse(updateCourseData: $updateCourseData) {
      id
      published
      name
      description
      numEnrolled
      thumbnailUrl: thumbnail
      price
      free
      categories {
        id
        name
      }
      benefits {
        id
        benefit
      }
      prerequisites {
        id
        prerequisite
      }
      content {
        id
        lessons {
          id
          title
          order
          video {
            id
            name
            duration
          }
          slugs {
            id
            slug
          }
        }
      }
      instructor {
        id
        lastName
        firstName
        shortBio
      }
    }
  }
`;

export const PUBLISH_COURSE = gql`
  mutation publishCourse($id: String!) {
    course: publishCourse(id: $id) {
      id
      published
      name
      description
      numEnrolled
      thumbnailUrl: thumbnail
      benefits {
        id
        benefit
      }
      prerequisites {
        id
        prerequisite
      }
      content {
        id
        lessons {
          id
          title
          order
          video {
            id
            name
            duration
          }
          slugs {
            id
            slug
          }
        }
      }
      instructor {
        id
        lastName
        firstName
        shortBio
      }
    }
  }
`;
