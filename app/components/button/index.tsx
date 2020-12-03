import React from "react";
import { ButtonTheme, generateThemesStyle } from "./themes";
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import styled from "styles/styled-components";
import { useHistory } from "react-router-dom";
import { MinimalSpinner } from "components/loadingSpinner/minimal";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: FontAwesomeIconProps["icon"] | React.ReactElement;
  iconSize?: FontAwesomeIconProps["size"];
  iconPosition?: "right" | "left";
  children?: any | any[];
  className?: string;
  to?: string;
  iconMargin?: number;

  isLoading?: boolean;

  width?: string;
  height?: string;

  size?: number;
  boldText?: boolean;

  buttonTheme?: ButtonTheme;
}

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: IButtonProps) => props.width || "fit-content"};
  /*min-width: 6em;*/
  min-height: ${(props: IButtonProps) => props.height || "28px"};
  //box-shadow: 0px 0px 8px 1px rgba(15, 15, 15, 0.2);
  outline: none;
  border-radius: 4px;
  font-size: ${({ size }) => (size ? `${size}px` : "14px")};
  font-weight: ${({ boldText }) => (boldText ? "700" : "500")};
  padding: 4.6px 11px;
  line-height: 1.5;
  cursor: pointer;
  transition-property: all;
  transition-duration: 400ms;
  transition-timing-function: ease-in-out;
  &:disabled {
    /*cursor: not-allowed;*/
    filter: opacity(0.7);
  }
  svg {
    transition-property: fill;
    transition-duration: 400ms;
    transition-timing-function: ease-in-out;
  }
  ${(props: IButtonProps) => generateThemesStyle(props.buttonTheme)}
  margin-right: 7px;
  &:last-of-type {
    margin-right: 0;
  }
`;

const IconContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

function Button(props: IButtonProps) {
  const { to, disabled } = props;

  const history = useHistory();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      if (to) {
        history.push(to);
      } else {
        props.onClick && props.onClick(e);
      }
    }
  };

  if (props.children) {
    return (
      <ButtonWrapper {...props} onClick={onClickHandler}>
        {props.children}
      </ButtonWrapper>
    );
  } else if (props.isLoading) {
    return (
      <ButtonWrapper {...props} disabled={true}>
        {props.text}
        <IconContainer>
          <MinimalSpinner size="sm" />
        </IconContainer>
      </ButtonWrapper>
    );
  } else if (React.isValidElement(props.icon)) {
    return (
      <ButtonWrapper {...props} onClick={onClickHandler}>
        <IconContainer>{props.icon}</IconContainer>
        {props.text}
      </ButtonWrapper>
    );
  } else if (props.icon && props.iconPosition === "left") {
    return (
      <ButtonWrapper {...props} onClick={onClickHandler}>
        <IconContainer style={{ marginRight: props.iconMargin || "8px" }}>
          <FontAwesomeIcon
            icon={props.icon as FontAwesomeIconProps["icon"]}
            size={props.iconSize}
          />
        </IconContainer>
        {props.text}
      </ButtonWrapper>
    );
  } else if (props.icon && props.iconPosition === "right") {
    return (
      <ButtonWrapper {...props} onClick={onClickHandler}>
        {props.text}
        <IconContainer style={{ marginLeft: props.iconMargin || "8px" }}>
          <FontAwesomeIcon
            icon={props.icon as FontAwesomeIconProps["icon"]}
            size={props.iconSize}
          />
        </IconContainer>
      </ButtonWrapper>
    );
  } else {
    return (
      <ButtonWrapper {...props} onClick={onClickHandler}>
        {props.text}
      </ButtonWrapper>
    );
  }
}

Button.defaultProps = {
  theme: ButtonTheme.PRIMARY,
  boldText: true,
  iconPosition: "left",
};

export { Button };
