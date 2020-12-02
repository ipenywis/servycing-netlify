import React from 'react';
import styled, { theme, css } from 'styles/styled-components';

export interface ISeperatorProps {
  direction?: 'horizontal' | 'vertical';
  spacing?: string;
  size?: string;
}

const SeperatorContainer = styled.div<ISeperatorProps>`
  height: fit-content;
  display: flex;
  margin: ${({ direction, spacing }) =>
    direction === 'vertical' ? (spacing ? `0 ${spacing}` : '0 6px') : 0};
  margin-top: ${({ direction }) => (direction === 'horizontal' ? '6px' : '0')};
  position: relative;
  background-color: #dedede;

  ${({ direction, size }) =>
    direction === 'horizontal' &&
    css`
      width: ${size || '100%'};
      height: 1px;
    `};

  ${({ direction, size }) =>
    direction === 'vertical' &&
    css`
      width: 1px;
      height: ${size || '100%'};
    `};
`;

function Seperator(props: ISeperatorProps) {
  return <SeperatorContainer {...props} />;
}

Seperator.defaultProps = {
  direction: 'horizontal',
};

export { Seperator };
