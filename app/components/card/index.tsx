import React from "react";
import styled, { theme } from "styles/styled-components";
import { DarkText, ErrorText, SuccessText } from "components/text";

export interface ICardProps {
  title?: string;
  className?: string;
  titleSize?: number;
  titleBlack?: boolean;
  centerTitle?: boolean;
  seperateTitle?: boolean;
  error?: string;
  success?: string;
  children: any | any[];
}

const CardContainer = styled.div`
  background-color: ${theme.default.componentBackground};
  border-radius: 4px;
  box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  padding-bottom: 0.8em;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.3em;
`;

const Title = styled(DarkText)<ICardProps>`
  font-size: ${({ titleSize }) => (titleSize ? `${titleSize}px` : "22px")};
  font-weight: ${({ titleBlack }) => (titleBlack ? "700" : "500")};
`;

const TopContainer = styled.div<ICardProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ centerTitle }) => (centerTitle ? "center" : "flex-start")};
  border-bottom: ${({ seperateTitle }) =>
    seperateTitle && `1px solid ${theme.default.lightMutedBorderColor}`};
  padding: 12px 1.3em;
`;

function Card(props: ICardProps) {
  const {
    className,
    title,
    titleSize,
    centerTitle,
    titleBlack,
    seperateTitle,
    error,
    success,
  } = props;

  return (
    <CardContainer className={className}>
      {title && (
        <TopContainer centerTitle={centerTitle} seperateTitle={seperateTitle}>
          <Title titleSize={titleSize} titleBlack={titleBlack}>
            {title}
          </Title>
          {error && (
            <ErrorText size={14} marginTop={6}>
              {error}
            </ErrorText>
          )}
          {!error && success && <SuccessText size={14}>{success}</SuccessText>}
        </TopContainer>
      )}
      <InnerContainer>{props.children}</InnerContainer>
    </CardContainer>
  );
}

Card.defaultProps = {
  centerTitle: false,
};

export { Card };
