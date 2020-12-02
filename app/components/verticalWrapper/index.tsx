import React from 'react';
import styled, { css } from 'styles/styled-components';

interface IVerticalWrapperProps {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  centerVertically?: boolean;
  centerHorizontally?: boolean;
  spaceBetween?: boolean;
  children?: any | any[];
}

const VerticalContainer = styled.div<IVerticalWrapperProps>`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ centerVertically }) =>
    centerVertically &&
    css`
      height: 100%;
      justify-content: center;
    `};

  ${({ centerHorizontally }) =>
    centerHorizontally &&
    css`
      width: 100%;
      align-items: center;
    `};

  ${({ spaceBetween }) =>
    spaceBetween &&
    css`
      height: 100%;
      justify-content: space-evenly;
    `};
`;

export function VerticalWrapper(props: IVerticalWrapperProps) {
  return <VerticalContainer {...props}>{props.children}</VerticalContainer>;
}
