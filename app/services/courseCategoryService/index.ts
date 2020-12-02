import { ICourseCategory, INewCourseCategoryDTO } from 'types/courseCategory';
import { apolloClient } from 'apolloGraphql';
import { GET_COURSE_CATEGORIES } from './queries';
import { parseGraphqlError } from 'utils/error';
import messages from './messages';
import { DELETE_COURSE_CATEGORY, ADD_NEW_COURSE_CATEGORY } from './mutation';

class CourseCategoryService {
  public async getCategories(): Promise<ICourseCategory[]> {
    const response = await apolloClient
      .query({ query: GET_COURSE_CATEGORIES })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.categories)
      return response.data.categories;
    else throw new Error(messages.cannotFetchCategories);
  }

  public async addCategory(
    newCategoryData: INewCourseCategoryDTO,
  ): Promise<ICourseCategory> {
    const response = await apolloClient
      .mutate({
        mutation: ADD_NEW_COURSE_CATEGORY,
        variables: { newCategoryData },
      })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.courseCategory)
      return response.data.courseCategory;
    else throw new Error(messages.cannotAddCategory);
  }

  public async deleteCategory(id: string): Promise<boolean> {
    const response = await apolloClient
      .mutate({ mutation: DELETE_COURSE_CATEGORY, variables: { id } })
      .catch(err => {
        throw parseGraphqlError(err);
      });

    if (response && response.data && response.data.deleted) return true;
    else throw new Error(messages.cannotDeleteCategory);
  }
}

export default new CourseCategoryService();
