import React from "react";
import { render, screen } from "@testing-library/react";
import { IOfferedService, OFFERED_SERVICE_TYPE } from "types/offeredService";
import { ServiceCard } from "..";
import img from "images/services thumbnails/garden.jpg";
import { Router } from "react-router-dom";
import history from "utils/history";

describe("<ServiceCard />", () => {
  test("Should render properly with props", async () => {
    const service: IOfferedService = {
      id: "343tgf-dfg-45df-gd-345-fdgdfgd",
      title: "Project management from a professionalist in the field",
      description:
        "Full project management from a professionalit in the business and management fields",
      type: OFFERED_SERVICE_TYPE.OTHERS,
      rate: 53,
      rating: 3.6,
      preferredHours: "10:00 to 17:00",
      specialist: {
        id: "343tgf-dfg565g-45df-gdh44-345-fdgddgfgd",
        fullName: "Mark Brone",
        shortBio: "Business man",
        email: "mark@me.com",
        rating: 3,
        offeredServices: [],
      },
      reviews: [],
      thumbnailUrl: img,
    };

    const { container } = render(
      <Router history={history}>
        <ServiceCard {...service} />
      </Router>
    );

    const titleContainer = await screen.findByText(
      "Project management from a professionalist in the field"
    );
    expect(titleContainer).toBeDefined();
    expect(titleContainer.nodeName).toBe("DIV");
    expect(screen.findByText("$53")).toBeDefined();
  });
});
