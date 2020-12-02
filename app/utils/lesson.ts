import ROUTES from 'containers/ROUTES';
import { History } from 'history';
import { ISlug } from 'types/slug';
import { prepareRouteWithParams } from './route';

export function playCourseLesson(
  lessonSlugs: ISlug[] | undefined,
  history: History,
) {
  if (lessonSlugs && lessonSlugs.length > 0) {
    const defaultSlug = lessonSlugs[0].slug;
    const watchRoute = prepareRouteWithParams(ROUTES.watchPage, defaultSlug);
    history.push(watchRoute);
  }
}
