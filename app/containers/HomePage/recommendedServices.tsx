import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { MinimalSpinner } from "components/loadingSpinner/minimal";
import { Marginer } from "components/marginer";
import { screenSizes } from "components/responsive";
import { ServiceCard } from "components/serviceCard";
import { BlackText, WarningText } from "components/text";
import ROUTES from "containers/ROUTES";
import React, { useEffect, useState } from "react";
import offeredServicesService from "services/offeredServicesService";
import styled from "styles/styled-components";
import { IOfferedService } from "types/offeredService";

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
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ServicesInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export function RecommendedServices(props: IRecommendedServicesProps) {
  const [recommendedServices, setRecommendedServices] = useState<
    IOfferedService[]
  >([]);
  const [isLoading, setLoading] = useState(false);

  const isEmptyServices =
    !recommendedServices ||
    (recommendedServices && recommendedServices.length === 0);

  const fetchRecommendedServices = async () => {
    setLoading(true);
    const servicesWithCount = await offeredServicesService
      .getAndFilterOfferedServices(undefined, { range: 6 })
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (servicesWithCount)
      setRecommendedServices(servicesWithCount.offeredServices);

    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendedServices();
  }, []);

  return (
    <RecommendedServicesContainer>
      <InnerContainer>
        <ServicesContainer>
          <BlackText size={27} black>
            Most used services &#38; More
          </BlackText>
          <Marginer direction="vertical" margin="2em" />
          {isLoading && (
            <HorizontalWrapper centered>
              <MinimalSpinner size="md" />
            </HorizontalWrapper>
          )}
          <ServicesInnerContainer>
            {!isLoading && isEmptyServices && (
              <WarningText horizontalCenter>
                No Services are avaialable yet!
              </WarningText>
            )}
            {!isEmptyServices &&
              !isLoading &&
              recommendedServices.map((service, idx) => (
                <ServiceCard key={idx} {...service} />
              ))}
          </ServicesInnerContainer>
        </ServicesContainer>
        <Marginer direction="vertical" margin="2em" />
        {!isLoading && !isEmptyServices && (
          <Button
            text="View More"
            buttonTheme={ButtonTheme.GREY_SOLID}
            to={ROUTES.discoverPage}
          />
        )}
      </InnerContainer>
    </RecommendedServicesContainer>
  );
}
