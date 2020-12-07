import { Button } from "components/button";
import { ButtonTheme } from "components/button/themes";
import { Card } from "components/card";
import { HorizontalWrapper } from "components/horizontalWrapper";
import { Marginer } from "components/marginer";
import { BlackText, GreyText, SuccessText } from "components/text";
import React from "react";
import styled from "styles/styled-components";

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

export function OrderService(props: IOderServiceProps) {
  return (
    <OrderServiceContainer>
      <OrderCard
        title="Order service from Kane Morker"
        titleBlack
        seperateTitle
      >
        <Marginer direction="vertical" margin={12} />
        <BlackText size={18} black>
          More Details
        </BlackText>
        <BlackText size={14} marginTop={5} bold verticalCenter>
          Service Type:
          <GreyText size={14} marginLeft={6}>
            Landscaping
          </GreyText>
        </BlackText>
        <BlackText size={14} marginTop={3} bold verticalCenter>
          Working Hours:
          <GreyText size={14} marginLeft={6}>
            2pm to 10pm
          </GreyText>
        </BlackText>
        <BlackText size={14} marginTop={3} bold verticalCenter>
          Hourly Rate:
          <SuccessText size={14} black marginLeft={6}>
            $200/hr
          </SuccessText>
        </BlackText>
        <Marginer direction="vertical" margin="2em" />
        <HorizontalWrapper centered>
          <Button
            text="Order Now $200/hr"
            buttonTheme={ButtonTheme.PRIMARY_SOLID}
          />
        </HorizontalWrapper>
      </OrderCard>
    </OrderServiceContainer>
  );
}
