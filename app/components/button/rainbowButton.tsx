import React from 'react';
import styled, { keyframes, theme } from 'styles/styled-components';

export interface IRainbowButtonProps {
  size?: number;
  text: string;
}

const RainbowAnimation = keyframes`
  to {
    background-position: 18em;
  }
`;

const ButtonWrapper = styled.a`
  width: 17.5em;
  min-height: 37px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: ${({ size }: IRainbowButtonProps) =>
    size ? `${size}px` : '12px'};
  font-weight: bold;
  background-color: ${theme.default.primary};
  color: ${theme.default.primaryText};
  cursor: pointer;

  &::after {
    content: attr(data-text);
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 400ms ease-in;
  }

  &:hover {
    animation: ${RainbowAnimation} 2s linear infinite;
    background-image: linear-gradient(
      90deg,
      #00c0ff 0%,
      #ffcf00 49%,
      #fc4f4f 80%,
      #00c0ff 100%
    );
    &::after {
      width: 17em;
      min-height: 31px;
      background-color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 300ms ease-in;
    }
  }
`;

export function RainbowButton(props: IRainbowButtonProps) {
  const { text } = props;
  return <ButtonWrapper {...props} data-text={text} />;
}
