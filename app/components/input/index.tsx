import React from "react";
import styled, { theme, css } from "styles/styled-components";
import { generateInputThemesStyle, InputTheme } from "./themes";
import { FieldProps, useField } from "react-final-form";
import { FieldValidator } from "final-form";
import { ErrorText } from "components/text";
import {
  FontAwesomeIconProps,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

type INPUT = React.HTMLAttributes<HTMLInputElement> & FieldProps<any, any>;

export interface IInputProps extends Omit<INPUT, "name"> {
  id?: string;
  width?: string;
  height?: string;
  maxHeight?: string;
  value?: string;
  type?: string;
  name?: string;
  size?: string | number;
  initialValue?: string;
  /**Only works when using final-form for now! */
  limit?: number;
  hideLimitIndicator?: boolean;
  hidden?: boolean;
  hideError?: boolean;
  hideErrorIndicator?: boolean;
  doNotRenderError?: boolean;
  icon?: FontAwesomeIconProps["icon"];
  iconColor?: string;
  iconSize?: string;

  useAsTextarea?: boolean;
  useAsNumeric?: boolean;

  inputTheme?: InputTheme;

  clearPlaceholderOnFocus?: boolean;

  //inputRef?: (inputRef: HTMLInputElement | null) => void;
  inputRef?: React.RefObject<HTMLInputElement>;

  validate?: FieldValidator<string>;
}

const InputContainer = styled.div<any>`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  flex-direction: column;
  width: ${({ width }) => (width ? width : "100%")};
  padding: 0 !important;
  position: relative;
`;

interface IErrorProps {
  error?: boolean;
}

const InputWrapper = styled.input<IInputProps & IErrorProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : "33px")};
  outline: none;
  background-color: ${theme.default.componentBackground};
  color: ${theme.default.tertiaryText};
  font-size: ${({ size }) =>
    size ? (typeof size === "string" ? size : `${size}px`) : "15px"};
  font-weight: 400;
  /*border: 1px solid rgba(31, 32, 65, 0.25);*/
  border: none;
  box-shadow: 0 5px 30px -15px rgba(0, 0, 0, 0.2);
  transition: all 250ms ease-in-out;
  padding: ${({ icon }) => (icon ? "0 20px" : "0 13px")};
  border-radius: 3px;

  &:disabled {
    opacity: 0.4;
  }

  ${({ limit }) =>
    limit &&
    css`
      padding-right: 3.9em;
    `};

  &::placeholder {
    opacity: 0.4;
    font-size: 13px;
    font-weight: 300;
    transition: all 250ms ease-in-out;
  }

  &:focus {
    outline: none;

    &::placeholder {
      opacity: ${({ clearPlaceholderOnFocus }) =>
        clearPlaceholderOnFocus ? 0 : 0.5};
    }
  }

  ${({ error }) =>
    error &&
    css`
      color: ${theme.default.dangerLight};
      border: 1px solid ${theme.default.dangerLight};
      &::placeholder {
        color: ${theme.default.dangerLight};
        opacity: 1;
      }
    `};

  /*Generate Input Theme IT MUST BE LAST TO OVERRIDE DEFAULT STYLES*/
  ${({ inputTheme }) => generateInputThemesStyle(inputTheme)}
`;

const TextareaWrapper = styled.textarea<IInputProps & IErrorProps>`
  width: ${({ width }) => (width ? width : "100%")};
  min-height: ${({ height }) => (height ? height : "50px")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "")};
  outline: none;
  background-color: ${theme.default.componentBackground};
  color: ${theme.default.tertiaryText};
  font-size: 15px;
  font-weight: 400;
  /*border: 1px solid rgba(31, 32, 65, 0.25);*/
  border: none;
  box-shadow: 0 5px 30px -15px rgba(0, 0, 0, 0.2);
  transition: color, background-color, border, box-shadow 250ms ease-in-out;
  padding: 10px 13px;
  border-radius: 3px;
  font-family: inherit;

  &:disabled {
    opacity: 0.4;
  }

  ${({ limit }) =>
    limit &&
    css`
      padding-right: 3.9em;
    `};

  &::placeholder {
    opacity: 0.4;
    font-size: 13px;
    font-weight: 300;
    transition: all 250ms ease-in-out;
  }

  &:focus {
    outline: none;

    &::placeholder {
      opacity: ${({ clearPlaceholderOnFocus }) =>
        clearPlaceholderOnFocus ? 0 : 0.5};
    }
  }

  ${({ error }) =>
    error &&
    css`
      color: ${theme.default.dangerLight};
      border: 1px solid ${theme.default.dangerLight};
      &::placeholder {
        color: ${theme.default.dangerLight};
        opacity: 1;
      }
    `};

  /*Generate Input Theme IT MUST BE LAST TO OVERRIDE DEFAULT STYLES*/
  ${({ inputTheme }) => generateInputThemesStyle(inputTheme)}
`;

const IconContainer = styled.div<any>`
  display: flex;
  position: absolute;
  font-size: ${({ size }) => size || "13px"};
  top: 30%;
  left: 8px;
  transform: translateY(-50%);
`;

const MinimalIconContainer = styled.div<any>`
  display: flex;
  position: absolute;
  font-size: ${({ size }) => size || "13px"};
  top: 50%;
  left: 9px;
  transform: translateY(-50%);
`;

const LimitNumberContainer = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  font-size: 13px;
  color: ${theme.default.greyText};
`;

const Error = styled(ErrorText)`
  height: 20px;
  font-size: 12px;
  margin-top: 2px;
`;

function Input(props: IInputProps) {
  const {
    name,
    initialValue,
    validate,
    limit,
    useAsTextarea,
    icon,
    iconColor,
    iconSize,
    hidden,
    width,
    hideError,
    hideErrorIndicator,
    hideLimitIndicator,
    doNotRenderError,
    useAsNumeric,
  } = props;

  if (name) {
    const {
      input,
      meta: { error, touched, submitError },
    } = useField(name, { initialValue, validate });

    const extraProps = {
      maxLength: limit,
    };

    const blurHandler = (e) => {
      props.onBlur && props.onBlur(e);
      input.onBlur(e);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (useAsNumeric) {
        const value = e.target.value;
        const numberValue = new Number(value);
        if (value !== "" && (isNaN(numberValue as any) || value.includes(".")))
          return;
      }

      input.onChange(e);
    };

    return (
      <InputContainer hidden={hidden} width={width}>
        {!useAsTextarea && (
          <>
            {icon && (
              <IconContainer size={iconSize}>
                <FontAwesomeIcon icon={icon} color={iconColor} />
              </IconContainer>
            )}
            <InputWrapper
              {...props}
              {...input}
              onBlur={blurHandler}
              onChange={inputChangeHandler}
              {...extraProps}
              ref={props.inputRef}
              error={!hideErrorIndicator && touched && error}
            />
          </>
        )}
        {useAsTextarea && (
          <TextareaWrapper
            {...props}
            {...input}
            onBlur={blurHandler}
            {...extraProps}
            ref={props.inputRef}
            error={!hideErrorIndicator && touched && error}
          />
        )}
        {limit && !hideLimitIndicator && (
          <LimitNumberContainer>
            {input.value.length}/{limit}
          </LimitNumberContainer>
        )}
        {!doNotRenderError && (
          <Error>
            {!hideError && touched && (error || submitError) ? error : ""}
          </Error>
        )}
      </InputContainer>
    );
  } else
    return (
      <InputContainer {...props}>
        {icon && (
          <MinimalIconContainer size={iconSize}>
            <FontAwesomeIcon icon={icon} color={iconColor} />
          </MinimalIconContainer>
        )}
        <InputWrapper {...props} ref={props.inputRef} />
      </InputContainer>
    );
}

Input.defaultProps = {
  theme: InputTheme.MINIMAL_SHADOW,
  iconColor: theme.default.lightGreyText,
};

export { Input };
