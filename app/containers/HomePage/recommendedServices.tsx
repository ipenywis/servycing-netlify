import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { Marginer } from "components/marginer";
import { screenSizes } from "components/responsive";
import { ServiceCard } from "components/serviceCard";
import { BlackText } from "components/text";
import React from "react";
import styled from "styles/styled-components";

export interface IRecommendedServicesProps {}

const RecommendedServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const InnerContainer = styled.div`
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
      <BlackText size={27} black>
        Most used services &#38; More
      </BlackText>
      <Marginer direction="vertical" margin="2em" />
      <InnerContainer>
        <ServicesContainer>
          {Array(8)
            .fill("")
            .map((service, idx) => (
              <ServiceCard
                key={idx}
                title="I will landscape your garden"
                specialist={{ fullName: "Islem Maboud" } as any}
                rate={70}
                {...(service as any)}
              />
            ))}
        </ServicesContainer>
        <Marginer direction="vertical" margin="2em" />
        <Button text="View More" buttonTheme={ButtonTheme.GREY_SOLID} />
      </InnerContainer>
    </RecommendedServicesContainer>
  );
}
