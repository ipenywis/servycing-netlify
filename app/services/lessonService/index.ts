import { ICourse } from 'types/course';
import { apolloClient } from 'apolloGraphql';
import { GET_COURSE_BY_LESSON_SLUG } from './queries';
import { parseGraphqlError } from 'utils/error';
import messages from './messages';

class LessonService {
  public async getCourseByLessonSlug(slug: string): Promise<ICourse> {
    const queryResponse = await apolloClient
      .query({ query: GET_COURSE_BY_LESSON_SLUG, variables: { slug } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!queryResponse) throw new Error(messages.cannotFindLesson);
    return queryResponse.data.course as ICourse;
  }
}

export default new LessonService();
