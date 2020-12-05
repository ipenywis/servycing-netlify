import React from "react";
import { Combobox as ECombobox } from "evergreen-ui";
import styled from "styles/styled-components";

export const Combobox = styled(ECombobox)`
  input {
    transition: all 300ms ease-in-out;
    height: 33px;
    box-shadow: 0 0 1px 1px rgba(15, 15, 15, 0.15);

    ::placeholder {
      transition: all 300ms ease-in-out;
    }

    :focus {
      box-shadow: 0 0 1px 1px rgba(15, 15, 15, 0.4);
      ::placeholder {
        opacity: 0;
      }
    }
  }

  button {
    height: 33px;
    box-shadow: 0 0 1px 1px rgba(15, 15, 15, 0.15);
    :focus {
      box-shadow: 0 0 1px 1px rgba(15, 15, 15, 0.4);
    }
  }
`;
