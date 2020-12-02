import {
  INewLessonTutorialDTO,
  ILessonTutorial,
  IUpdateLessonTutorialDTO,
} from 'types/lessonTutorial';
import { apolloClient } from 'apolloGraphql';
import {
  ADD_NEW_LESSON_TUTORIAL,
  UPDATE_LESSON_TUTORIAL,
  DELETE_LESSON_TUTORIAL,
} from './mutations';
import { parseGraphqlError } from 'utils/error';
import messages from './messages';
import { GET_LESSONS_TUTORIALS_BY_COURSE } from './queries';

class LessonTutorialService {
  public async addNewLessonTutorial(
    newLessonTutorialData: INewLessonTutorialDTO,
  ): Promise<ILessonTutorial> {
    const response = await apolloClient
      .mutate({
        mutation: ADD_NEW_LESSON_TUTORIAL,
        variables: { newLessonTutorialData },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!response || !response.data || !response.data.lessonTutorial)
      throw new Error(messages.cannotAddNewLessonTutorial);
    else return response.data.lessonTutorial;
  }

  public async getCourseLessonsTutorials(
    courseId: string,
  ): Promise<ILessonTutorial[]> {
    const response = await apolloClient
      .query({
        query: GET_LESSONS_TUTORIALS_BY_COURSE,
        variables: { courseId },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!response || !response.data || !response.data.lessonsTutorials)
      throw new Error(messages.cannotGetCourseLessonsTutorials);
    else return response.data.lessonsTutorials;
  }

  public async updateLessonTutorial(
    lessonTutorialData: IUpdateLessonTutorialDTO,
  ): Promise<boolean> {
    const response = await apolloClient
      .mutate({
        mutation: UPDATE_LESSON_TUTORIAL,
        variables: { lessonTutorialData },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!response || !response.data || !response.data.updated)
      throw new Error(messages.cannotUpdateTutorial);
    else return response.data.updated;
  }

  public async deleteLessonTutorial(id: string): Promise<boolean> {
    const response = await apolloClient
      .mutate({ mutation: DELETE_LESSON_TUTORIAL, variables: { id } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (!response || !response.data || !response.data.deleted)
      throw new Error(messages.cannotDeleteTutorial);
    else return response.data.deleted;
  }
}

export default new LessonTutorialService();
