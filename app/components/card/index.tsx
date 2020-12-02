import React from 'react';
import styled, { theme } from 'styles/styled-components';
import { DarkText } from 'components/text';

export interface ICardProps {
  title?: string;
  className?: string;
  titleSize?: number;
  centerTitle?: boolean;
  children: any | any[];
}

const CardContainer = styled.div`
  background-color: ${theme.default.componentBackground};
  border-radius: 4px;
  box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.2);
  padding: 12px 1.3em;
  display: flex;
  flex-direction: column;
`;

const Title = styled(DarkText)<ICardProps>`
  font-size: ${({ titleSize }) => (titleSize ? `${titleSize}px` : '22px')};
  font-weight: 500;
`;

const TopContainer = styled.div<ICardProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ centerTitle }) => (centerTitle ? 'center' : 'flex-start')};
`;

function Card(props: ICardProps) {
  const { className, title, titleSize, centerTitle } = props;

  return (
    <CardContainer className={className}>
      {title && (
        <TopContainer centerTitle={centerTitle}>
          <Title titleSize={titleSize}>{title}</Title>
        </TopContainer>
      )}
      {props.children}
    </CardContainer>
  );
}

Card.defaultProps = {
  centerTitle: false,
};

export { Card };
