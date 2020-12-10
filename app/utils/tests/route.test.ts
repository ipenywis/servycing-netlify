import {
  prepareRouteWithParams,
  prepareRouteWithParamsWithSlug,
} from "utils/route";

describe("Utils Route", () => {
  test("Long Path route", () => {
    const path = prepareRouteWithParams(
      "/app/connected/user/dashboard/:section",
      "profile"
    );

    expect(path).toBe("/app/connected/user/dashboard/profile");
  });

  test("Short Path route", () => {
    const path = prepareRouteWithParams("/user/:section", "profile");

    expect(path).toBe("/user/profile");
  });

  test("Short Path route slugified", () => {
    const path = prepareRouteWithParamsWithSlug(
      "/post/:title",
      "How to become a better developer"
    );

    expect(path).toBe("/post/How-to-become-a-better-developer");
  });
});
