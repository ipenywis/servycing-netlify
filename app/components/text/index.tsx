import React from "react";
import styled, { theme, css, keyframes } from "styles/styled-components";

export interface ITextProps {
  noEffects?: boolean;
  horizontalCenter?: boolean;
  verticalCenter?: boolean;
  size?: string | number;
  bold?: boolean;
  black?: boolean;
  marginRight?: string | number;
  marginLeft?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
  flashingAnimation?: boolean;
  clickable?: boolean;
  lineHeight?: number;
}

const FlashingAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }


  100% {
    opacity: 0;
  }
`;

export const Text = styled.div<ITextProps>`
  font-size: ${({ size }) =>
    size ? (typeof size === "string" ? size : `${size}px`) : "17px"};
  display: flex;
  font-weight: ${({ bold, black }) =>
    bold ? "500" : black ? "bolder" : "400"};
  line-height: ${({ lineHeight }) => lineHeight && lineHeight};

  cursor: ${({ clickable }) => clickable && "pointer"};

  ${({ flashingAnimation }) =>
    flashingAnimation &&
    css`
      animation: ${FlashingAnimation} 3s infinite;
    `};

  ${({ horizontalCenter }) =>
    horizontalCenter &&
    css`
      width: 100%;
      justify-content: center;
      text-align: center;
    `};

  ${({ verticalCenter }) =>
    verticalCenter &&
    css`
      align-items: center;
    `};

  ${({ noEffects }) =>
    !noEffects &&
    css`
      transition: color, 250ms ease-in-out;
      cursor: pointer;

      svg {
        transition: color, 250ms ease-in-out;
      }

      &:hover {
        filter: contrast(0.8);
      }
    `}

  margin-right: ${({ marginRight }) =>
    marginRight
      ? typeof marginRight === "string"
        ? marginRight
        : `${marginRight}px`
      : "0"};

  margin-left: ${({ marginLeft }) =>
    marginLeft
      ? typeof marginLeft === "string"
        ? marginLeft
        : `${marginLeft}px`
      : "0"};

  margin-top: ${({ marginTop }) =>
    marginTop
      ? typeof marginTop === "string"
        ? marginTop
        : `${marginTop}px`
      : "0"};

  margin-bottom: ${({ marginBottom }) =>
    marginBottom
      ? typeof marginBottom === "string"
        ? marginBottom
        : `${marginBottom}px`
      : "0"};
`;

Text.defaultProps = {
  noEffects: true,
};

export const WhiteText = styled(Text)`
  color: ${theme.default.primaryText};

  svg {
    ${theme.default.tertiaryText};
  }
`;

export const MutedText = styled(Text)`
  color: ${theme.default.mutedText};

  svg {
    color: ${theme.default.mutedText};
  }
`;

export const BlackText = styled(Text)`
  color: ${theme.default.secondaryText};

  svg {
    color: ${theme.default.secondaryText};
  }
`;

export const DarkText = styled(Text)`
  color: ${theme.default.tertiaryText};

  svg {
    color: ${theme.default.tertiaryText};
  }
`;

export const GreyText = styled(Text)`
  color: ${theme.default.greyText};

  svg {
    color: ${theme.default.greyText};
  }
`;

export const LightGreyText = styled(Text)`
  color: ${theme.default.lightGreyText};

  svg {
    color: ${theme.default.lightGreyText};
  }
`;

export const InfoText = styled(Text)`
  color: ${theme.default.shinyBlue};

  svg {
    color: ${theme.default.shinyBlue};
  }
`;

export const WarningText = styled(Text).attrs({ noEffects: true })`
  font-size: 17px;
  opacity: 0.7;
  color: ${theme.default.secondaryText};
`;

export const ErrorText = styled(Text).attrs({ noEffects: true })`
  color: ${theme.default.dangerLight};
`;

export const SuccessText = styled(Text).attrs({ noEffects: true })`
  color: ${theme.default.primaryDark};
`;
