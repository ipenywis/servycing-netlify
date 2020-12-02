import {
  ICourse,
  CourseSort,
  ICoursesWithCount,
  INewCourseDTO,
  IBulkUpdateCourseDTO,
  ICourseThumbnailUploadDTO,
} from 'types/course';
import { apolloClient } from 'apolloGraphql';
import {
  GetRecentPublishedCourses,
  GetPopularPublishedCourses,
  SEARCH_COURSES,
  GET_COURSE_BY_SLUG,
  GET_COURSE_BY_ID,
  GET_INSTRUCTOR_PUBLISHED_COURSES,
  GET_INSTRUCTOR_DRAFT_COURSES,
  GET_STUDENT_COURSES,
} from './queries';
import {
  ADD_NEW_COURSE,
  BULK_UPDATE_COURSE,
  PUBLISH_COURSE,
} from './mutations';
import messages from './messages';
import { IPaginationOptions } from 'types/pagination';
import { ISearchQuery } from 'types/search';
import { parseGraphqlError } from 'utils/error';
import Axios from 'axios';
import endpoints from 'endpoints';

class CourseService {
  async getCourseById(id: string): Promise<ICourse> {
    const queryResponse = await apolloClient
      .query({ query: GET_COURSE_BY_ID, variables: { id } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!queryResponse || !queryResponse?.data || !queryResponse.data?.course)
      throw new Error(messages.cannoFindCourse);
    else return queryResponse.data.course;
  }

  async getRecentPublishedCourses(
    pagination?: IPaginationOptions,
  ): Promise<ICoursesWithCount> {
    const queryResult = await apolloClient
      .query({
        query: GetRecentPublishedCourses,
        variables: { paginate: pagination },
      })
      .catch(err => {
        throw err;
      });
    if (!queryResult) throw new Error(messages.cannotLoadCourses);
    const coursesWithCount = queryResult.data.coursesWithCount;
    return {
      courses: coursesWithCount.courses,
      count: coursesWithCount.count,
    };
  }

  async getPopularPublishedCourses(
    pagination?: IPaginationOptions,
  ): Promise<ICoursesWithCount> {
    const queryResult = await apolloClient
      .query({
        query: GetPopularPublishedCourses,
        variables: { paginate: pagination },
      })
      .catch(err => {
        throw err;
      });
    if (!queryResult) throw new Error(messages.cannotLoadCourses);
    const coursesWithCount = queryResult.data.coursesWithCount;
    return {
      courses: coursesWithCount.courses,
      count: coursesWithCount.count,
    };
  }

  async searchCourses(
    searchQuery: ISearchQuery,
    sort?: CourseSort,
    paginate?: IPaginationOptions,
  ): Promise<ICoursesWithCount> {
    const courseSort = { sort: { type: sort?.toLowerCase() } };
    const queryResult = await apolloClient
      .query({
        query: SEARCH_COURSES,
        variables: { searchQuery, paginate, ...courseSort },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!queryResult) throw new Error(messages.cannotDoSearch);
    const coursesWithCount = queryResult.data.coursesWithCount;
    return {
      courses: coursesWithCount.courses,
      count: coursesWithCount.count,
    };
  }

  public async searchStudentCourses(
    searchQuery: ISearchQuery,
    paginate?: IPaginationOptions,
  ): Promise<ICoursesWithCount> {
    const queryResult = await apolloClient
      .query({
        query: SEARCH_COURSES,
        variables: { searchQuery, paginate },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!queryResult) throw new Error(messages.cannotDoSearch);
    const coursesWithCount = queryResult.data.coursesWithCount;
    return {
      courses: coursesWithCount.courses,
      count: coursesWithCount.count,
    };
  }

  public async getCourseBySlug(slug: string): Promise<ICourse> {
    const courseBySlug = await apolloClient
      .query({ query: GET_COURSE_BY_SLUG, variables: { slug } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!courseBySlug) throw new Error(messages.cannoFindCourse);
    else return courseBySlug.data.course as ICourse;
  }

  public async addNewCourse(newCourseData: INewCourseDTO): Promise<ICourse> {
    const courseResponse = await apolloClient
      .mutate({
        mutation: ADD_NEW_COURSE,
        variables: { newCourseData: newCourseData },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!courseResponse) throw new Error(messages.cannotCreateCourse);
    else return courseResponse.data.course;
  }

  public async bulkUpdateCourse(
    bulkUpdateCourseData: IBulkUpdateCourseDTO,
  ): Promise<ICourse> {
    const updateResponse = await apolloClient
      .mutate({
        mutation: BULK_UPDATE_COURSE,
        variables: { updateCourseData: bulkUpdateCourseData },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!updateResponse) throw new Error(messages.cannotUpdateCourse);
    else return updateResponse.data.course;
  }

  public async uploadCourseThumbnail(
    thumbnailDto: ICourseThumbnailUploadDTO,
  ): Promise<string> {
    const formData = new FormData();
    formData.append('image', thumbnailDto.image);
    formData.append('courseId', thumbnailDto.courseId);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const response = await Axios.post(
      endpoints.UPLOAD_COURSE_THUMBNAIL,
      formData,
      config,
    ).catch(err => {
      throw err;
    });

    if (!response || !response.data || !response.data?.data.url)
      throw new Error(messages.cannotUploadThumbnail);
    else return response.data.data.url;
  }

  public async publishCourse(id: string): Promise<ICourse> {
    const response = await apolloClient
      .mutate({ mutation: PUBLISH_COURSE, variables: { id } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!response || !response.data || !response.data.course)
      throw new Error(messages.cannotPublishCourse);
    else return response.data.course;
  }

  public async getInstructorPublishedCourses(): Promise<ICourse[]> {
    const response = await apolloClient
      .query({ query: GET_INSTRUCTOR_PUBLISHED_COURSES })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.courses)
      return response.data.courses;
    else throw new Error(messages.cannotFetchInstructorPublishedCourses);
  }

  public async getInstructorDraftCourses(): Promise<ICourse[]> {
    const response = await apolloClient
      .query({ query: GET_INSTRUCTOR_DRAFT_COURSES })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.courses)
      return response.data.courses;
    else throw new Error(messages.cannotFetchInstructorDraftCourses);
  }

  public async getStudentCourses(
    paginate?: IPaginationOptions,
  ): Promise<ICoursesWithCount> {
    const response = await apolloClient
      .query({ query: GET_STUDENT_COURSES, variables: { paginate } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.coursesWithCount)
      return response.data.coursesWithCount;
    else throw new Error(messages.cannotFetchStudentCourses);
  }
}

export default new CourseService();
