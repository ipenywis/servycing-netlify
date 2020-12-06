import React from "react";
import styled, { css } from "styles/styled-components";
import { Link as RLink } from "react-router-dom";

export interface ILinkProps {
  noEffects?: boolean;
}

export const Link = styled(({ noEffects, ...rest }) => <RLink {...rest} />)`
  text-decoration: none;
  color: inherit;

  ${({ noEffects }) =>
    !noEffects &&
    css`
      transition: all 200ms ease-in-out;
      &:hover {
        filter: contrast(0.94);
      }
    `};
`;
