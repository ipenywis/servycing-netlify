import React from 'react';
import styled from 'styles/styled-components';
import { BlackText, DarkText } from 'components/text';
import { VerticalWrapper } from 'components/verticalWrapper';

export interface IPaneProps {
  title?: string;
  leftMargin?: string;
  titleLeftMargin?: string;
  titleBottomMargin?: string;
  bottomMargin?: string;
  titleSize?: string;
  centerTitle?: boolean;
  alignCenter?: boolean;
  marginTop?: string;
  height?: string;
  maxHeight?: string;
  children: any | any[];
}

const PaneContainer = styled.div<IPaneProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  width: auto;
  /*margin-left: ${({ leftMargin }) => leftMargin || '1em'};
  margin-bottom: ${({ bottomMargin }) => bottomMargin || '1em'};
  padding: 1em 3em;*/

  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '10px')};
`;

const InnerContainer = styled(VerticalWrapper)<IPaneProps>`
  align-items: ${({ alignCenter }) => alignCenter && 'center'};
  flex-wrap: wrap;
  height: ${({ height }) => height || 'auto'};
  max-height: ${({ maxHeight }) => maxHeight || 'auto'};
`;

const Title = styled(DarkText)<IPaneProps>`
  width: 100%;
  justify-content: ${({ centerTitle }) =>
    centerTitle ? 'center' : 'flex-start'};
  display: flex;
  font-size: ${({ titleSize }) => titleSize || '24px'};
  font-weight: 400;
  margin-left: ${({ titleLeftMargin }) => titleLeftMargin || 0};
  margin-bottom: ${({ titleBottomMargin }) => titleBottomMargin || 0};
`;

export function Pane(props: IPaneProps) {
  const { title, children, marginTop, ...titleProps } = props;

  return (
    <PaneContainer {...props} marginTop={marginTop}>
      <Title {...titleProps}>{title}</Title>
      <InnerContainer {...props}>{children}</InnerContainer>
    </PaneContainer>
  );
}
