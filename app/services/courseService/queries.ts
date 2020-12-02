import { gql } from 'apollo-boost';

export const GetRecentPublishedCourses = gql`
  query GetLatestCourses($paginate: PaginationOptions) {
    coursesWithCount: latestCourses(paginate: $paginate) {
      count
      courses {
        id
        name
        slugs {
          slug
        }
        thumbnailUrl: thumbnail
        instructor {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const GetPopularPublishedCourses = gql`
  query GetPopularCourses($paginate: PaginationOptions) {
    coursesWithCount: popularCourses(paginate: $paginate) {
      count
      courses {
        id
        name
        thumbnailUrl: thumbnail
        slugs {
          slug
        }
        instructor {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const SEARCH_COURSES = gql`
  query SEARCH_COURSES(
    $paginate: PaginationOptions
    $searchQuery: CourseSearchInput!
    $sort: CourseSortInput
  ) {
    coursesWithCount: searchCourses(
      paginate: $paginate
      courseSearchQuery: $searchQuery
      sort: $sort
    ) {
      count
      courses {
        id
        name
        thumbnailUrl: thumbnail
        slugs {
          slug
        }
        instructor {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const SEARCH_STUDENT_COURSES = gql`
  query SEARCH_STUDENT_COURSES(
    $paginate: PaginationOptions
    $searchQuery: CourseSearchInput!
    $sort: CourseSortInput
  ) {
    coursesWithCount: searchStudentCourses(
      paginate: $paginate
      courseSearchQuery: $searchQuery
    ) {
      count
      courses {
        id
        name
        thumbnailUrl: thumbnail
        slugs {
          slug
        }
        instructor {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG = gql`
  query GET_COURSE($slug: String!) {
    course: courseBySlug(slug: $slug) {
      id
      name
      description
      numEnrolled
      thumbnailUrl: thumbnail
      price
      free
      categories {
        id
        name
        logoUrl
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
        picture
        shortBio
      }
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  query getCourseById($id: String!) {
    course(id: $id) {
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
          tutorial {
            id
          }
        }
        lessonTutorials {
          id
          title
          content
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

export const GET_INSTRUCTOR_PUBLISHED_COURSES = gql`
  query getInstructorPublishedCourses {
    courses: publishedCourses {
      id
      published
      name
      thumbnailUrl: thumbnail
    }
  }
`;

export const GET_INSTRUCTOR_DRAFT_COURSES = gql`
  query getInstructorDraftCourses {
    courses: draftCourses {
      id
      published
      name
      thumbnailUrl: thumbnail
    }
  }
`;

export const GET_STUDENT_COURSES = gql`
  query getStudentCourses($paginate: PaginationOptions) {
    coursesWithCount: studentCourses(paginate: $paginate) {
      count
      courses {
        id
        name
        slugs {
          slug
        }
        thumbnailUrl: thumbnail
        instructor {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
