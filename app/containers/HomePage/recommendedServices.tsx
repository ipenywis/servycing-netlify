import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { screenSizes } from "components/responsive";
import { ServiceCard } from "components/serviceCard";
import React from "react";
import styled from "styles/styled-components";

export interface IRecommendedServicesProps {}

const RecommendedServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServicesContainer = styled.div`
  max-width: ${screenSizes.laptop}px;
  display: flex;
  flex-wrap: wrap;
`;

export function RecommendedServices(props: IRecommendedServicesProps) {
  return (
    <RecommendedServicesContainer>
      <ServicesContainer>
        {Array(8)
          .fill("")
          .map((service, idx) => (
            <ServiceCard key={idx} />
          ))}
      </ServicesContainer>
      <Button text="View More" buttonTheme={ButtonTheme.GREY_SOLID} />
    </RecommendedServicesContainer>
  );
}
