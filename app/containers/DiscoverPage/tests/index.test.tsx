import React from "react";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import DiscoverPage from "..";

describe("<Discover />", () => {
  it("should render a heading text", async () => {
    const { container } = render(<DiscoverPage />);

    expect(await screen.findByText("Discover More")).toBeDefined();
  });
});
