import React from "react";
import styled from "styles/styled-components";
import { Avatar as EAvatar } from "evergreen-ui";

export const Avatar = styled(EAvatar)`
  cursor: pointer;
  span {
    font-weight: 700 !important;
    //font-size: calc(10px + 1.5vw) !important;
  }
`;
