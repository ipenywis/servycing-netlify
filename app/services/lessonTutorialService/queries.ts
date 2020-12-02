import gql from 'graphql-tag';

export const GET_LESSONS_TUTORIALS_BY_COURSE = gql`
  query getCourseLessonsTutorials($courseId: String!) {
    lessonsTutorials: courseLessonsTutorials(courseId: $courseId) {
      id
      title
      content
    }
  }
`;
