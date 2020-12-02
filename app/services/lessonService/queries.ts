import gql from 'graphql-tag';

export const GET_COURSE_BY_LESSON_SLUG = gql`
  query getCourseByLessonSlug($slug: String!) {
    course: courseByLessonSlug(slug: $slug) {
      id
      name
      description
      numEnrolled
      thumbnailUrl: thumbnail
      content {
        lessons {
          id
          title
          order
          slugs {
            id
            slug
          }
          video {
            id
            name
            duration
          }
          tutorial {
            id
            title
            content
          }
        }
      }
      instructor {
        id
        lastName
        firstName
        picture
        shortBio
      }
    }
  }
`;
