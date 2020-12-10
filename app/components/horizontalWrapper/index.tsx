import React from "react";
import styled, { css } from "styles/styled-components";

interface IHorizontalWrapperProps {
  width?: string;
  height?: string;
  spaceBetween?: boolean;
  spaceEvenly?: boolean;
  noMargin?: boolean;
  centered?: boolean;
  centerVertically?: boolean;
  shrink?: number;
  spacing?: string;
  children?: any;
}

const HorizontalContainer = styled.div<any>`
  display: flex;
  flex-direction: row;
  width: ${({ width }: IHorizontalWrapperProps) => (width ? width : "auto")};
  height: ${({ height }: IHorizontalWrapperProps) =>
    height ? height : "auto"};
  justify-content: ${(props) =>
    (props.spaceBetween && "space-between") ||
    (props.spaceEvenly && "space-evenly")};
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "no-wrap")};
  ${({ centered }: IHorizontalWrapperProps) =>
    centered &&
    css`
      width: ${({ width }: IHorizontalWrapperProps) =>
        width ? width : "100%"};
      justify-content: center;
    `};

  ${({ centerVertically }: IHorizontalWrapperProps) =>
    centerVertically &&
    css`
      height: ${({ height }: IHorizontalWrapperProps) =>
        height ? height : "100%"};
      align-items: center;
    `};

  &:not(:last-of-type) {
    margin-right: ${({ spacing }) => (spacing ? spacing : "7px")};
  }
  margin-top: ${({ noMargin }) => !noMargin && "1em"};

  flex-shrink: ${({ shrink }) => (shrink ? shrink : 1)};
`;

function HorizontalWrapper(props: IHorizontalWrapperProps) {
  return <HorizontalContainer {...props}>{props.children}</HorizontalContainer>;
}

HorizontalWrapper.defaultProps = {
  noMargin: true,
};

export { HorizontalWrapper };
