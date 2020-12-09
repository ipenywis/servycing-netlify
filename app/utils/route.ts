import { after } from "lodash";
import slugify from "slugify";

export function prepareRouteWithParams(
  route: string,
  ...params: string[]
): string {
  let preparedRoute: string = route;
  if (preparedRoute) {
    for (const param of params) {
      const paramSignIdx = preparedRoute.indexOf(":");
      let afterSlashIdx = preparedRoute.indexOf("/", paramSignIdx);
      if (afterSlashIdx === -1) afterSlashIdx = preparedRoute.length;
      const paramToReplace = preparedRoute.substring(
        paramSignIdx,
        afterSlashIdx
      );
      preparedRoute = preparedRoute.replace(paramToReplace, param);
    }

    return preparedRoute;
  }

  return "";
}

export function prepareRouteWithParamsWithSlug(
  route: string,
  ...params: string[]
): string {
  let preparedRoute: string = route;
  if (preparedRoute) {
    for (const param of params) {
      const paramSignIdx = preparedRoute.indexOf(":");
      let afterSlashIdx = preparedRoute.indexOf("/", paramSignIdx);
      if (afterSlashIdx === -1) afterSlashIdx = preparedRoute.length;
      const paramToReplace = preparedRoute.substring(
        paramSignIdx,
        afterSlashIdx
      );
      const targetParam = titleToSlug(param);
      preparedRoute = preparedRoute.replace(paramToReplace, targetParam);
    }

    return preparedRoute;
  }

  return "";
}

export function prepareRouteWithQuery(
  route: string,
  query: Record<string, string>
): string {
  let preparedRoute: string = route;
  if (preparedRoute) {
    const searchParams = new URLSearchParams(query);

    let afterSlashIdx = preparedRoute.indexOf("/", preparedRoute.length - 2);
    console.log("Index: ", afterSlashIdx);
    if (afterSlashIdx !== -1)
      preparedRoute = preparedRoute.slice(0, afterSlashIdx);

    preparedRoute = `${preparedRoute}?${searchParams.toString()}`;

    return preparedRoute;
  }

  return "";
}

export function titleToSlug(title: string): string {
  if (!title) return "";

  return title.replace(/\s+/g, "-");
}

export function slugToTitle(slug: string): string {
  if (!slug) return "";

  let words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word.charAt(0) + word.slice(1);
  }

  return words.join(" ");
}
