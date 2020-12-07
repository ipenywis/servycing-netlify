import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { Card } from "components/card";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Marginer } from "components/marginer";
import { RatingStars } from "components/ratingStarts";
import { BlackText, GreyText, SuccessText } from "components/text";
import { makeSelectIsCustomerAuthenticated } from "containers/Authentication/selectors";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import offeredServicesService from "services/offeredServicesService";
import styled from "styles/styled-components";
import { makeSelectService } from "./selectors";

interface IOderServiceProps {}

const OrderServiceContainer = styled.div`
  flex: 1 2 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderCard = styled(Card)`
  max-width: 18em;
`;

const stateSelector = createSelector(
  makeSelectService,
  makeSelectIsCustomerAuthenticated,
  (service, isCustomerAuthenticated) => ({
    service,
    isCustomerAuthenticated,
  })
);

export function OrderService(props: IOderServiceProps) {
  const { service, isCustomerAuthenticated } = useSelector(stateSelector);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const orderService = async () => {
    //Clear error
    setError(null);

    setLoading(true);

    if (!service) {
      setError("Unexpected error occured!");
      setLoading(false);
      return;
    }

    if (!isCustomerAuthenticated) {
      setError(
        "Please login or create a customer account before your can place orders!"
      );
      setLoading(false);
      return;
    }

    const pendingServiceRequest = await offeredServicesService
      .requestService(service.id)
      .catch((err) => {
        setError((err && err.message) || "Unexpected error occured!");
      });

    if (pendingServiceRequest)
      setSuccess(
        `Thanks for ordering a service, Please Check your dashboard, ${service.specialist.fullName} will be in touch with you soon!`
      );

    setLoading(false);
  };

  if (!service) return null;

  return (
    <OrderServiceContainer>
      <OrderCard
        title={`Order service from ${service.specialist.fullName}`}
        titleBlack
        seperateTitle
        error={error || undefined}
        success={success || undefined}
      >
        <Marginer direction="vertical" margin={12} />
        <BlackText size={18} black>
          More Details
        </BlackText>
        <BlackText size={14} marginTop={8} bold verticalCenter>
          Service Type:
          <GreyText size={14} marginLeft={6}>
            {service.type.toLowerCase()}
          </GreyText>
        </BlackText>
        <BlackText size={14} marginTop={3} bold verticalCenter>
          Working Hours:
          <GreyText size={14} marginLeft={6}>
            {service.preferredHours}
          </GreyText>
        </BlackText>
        <BlackText size={14} marginTop={3} bold>
          Rating:
          <Marginer direction="horizontal" margin="7px" />
          <RatingStars size={14} rating={5} showRatingNumber={false} />
        </BlackText>
        <BlackText size={14} marginTop={3} bold verticalCenter>
          Hourly Rate:
          <SuccessText size={14} black marginLeft={6}>
            ${service.rate}
            <GreyText size={13} verticalCenter>
              /hr
            </GreyText>
          </SuccessText>
        </BlackText>
        <Marginer direction="vertical" margin="2em" />
        <HorizontalWrapper centered>
          <Button
            text={`Order Now $${service.rate}/hr`}
            buttonTheme={ButtonTheme.PRIMARY_SOLID}
            isLoading={isLoading}
            onClick={orderService}
          />
        </HorizontalWrapper>
      </OrderCard>
    </OrderServiceContainer>
  );
}
