import React from 'react';
import styled from 'styles/styled-components';

export interface IMarginerProps {
  margin: number | string;
  direction?: 'horizontal' | 'vertical';
}

const HorizontalMargin = styled.span<IMarginerProps>`
  display: flex;
  width: ${({ margin }) =>
    typeof margin === 'string' ? margin : `${margin}px`};
`;

const VerticalMargin = styled.span<IMarginerProps>`
  display: flex;
  height: ${({ margin }) =>
    typeof margin === 'string' ? margin : `${margin}px`};
`;

function Marginer(props: IMarginerProps) {
  const { direction } = props;

  if (direction === 'horizontal') return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

Marginer.defaultProps = {
  direction: 'horizontal',
};

export { Marginer };
