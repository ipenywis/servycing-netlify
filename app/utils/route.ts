import { after } from 'lodash';

export function prepareRouteWithParams(
  route: string,
  ...params: string[]
): string {
  let preparedRoute: string = route;
  if (preparedRoute) {
    for (const param of params) {
      const paramSignIdx = preparedRoute.indexOf(':');
      let afterSlashIdx = preparedRoute.indexOf('/', paramSignIdx);
      if (afterSlashIdx === -1) afterSlashIdx = preparedRoute.length;
      const paramToReplace = preparedRoute.substring(
        paramSignIdx,
        afterSlashIdx,
      );
      preparedRoute = preparedRoute.replace(paramToReplace, param);
    }

    return preparedRoute;
  }

  return '';
}

export function prepareRouteWithQuery(
  route: string,
  query: Record<string, string>,
): string {
  let preparedRoute: string = route;
  if (preparedRoute) {
    const searchParams = new URLSearchParams(query);

    let afterSlashIdx = preparedRoute.indexOf('/', preparedRoute.length - 2);
    console.log('Index: ', afterSlashIdx);
    if (afterSlashIdx !== -1)
      preparedRoute = preparedRoute.slice(0, afterSlashIdx);

    preparedRoute = `${preparedRoute}?${searchParams.toString()}`;

    return preparedRoute;
  }

  return '';
}
