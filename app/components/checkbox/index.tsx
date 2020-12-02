import React, { useState } from 'react';
import styled from 'styles/styled-components';

export interface ICheckboxProps {
  label: string;
  checked?: boolean;
  initialChecked?: boolean;

  onClick?: (checked: boolean) => void;
  onChange?: (checked: boolean) => void;
}

const CheckboxContainer = styled.div`
  display: flex;
  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
`;

const CheckboxInput = styled.input`
  padding: 0;
  width: initial;
  height: initial;
  display: none;
  cursor: pointer;

  &:checked + label:after {
    content: '';
    display: block;
    position: absolute;
    top: 5px;
    left: 5px;
    width: 4px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(46deg);
  }

  &:checked + label:before {
    background-color: rgba(52, 152, 219, 1);
    border: 1.8px solid rgba(52, 152, 219, 0.5);
  }
`;

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: inherit;
  font-size: 15px;

  &:before {
    width: 5px;
    height: 5px;
    padding: 5px;
    content: '';
    -webkit-appearance: none;
    background-color: transparent;
    //border: 1.8px solid rgba(52, 152, 219, 0.5);
    border: 1.8px solid rgba(216, 216, 216, 0.95);
    /* box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05); */
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 2px;
    transition: all 200ms ease-in-out;
  }

  &:after {
    transition: all 250ms ease-in-out;
  }
`;

export function Checkbox(props: ICheckboxProps) {
  const { label, checked, initialChecked } = props;

  const [isChecked, setChecked] = useState(initialChecked || false);

  const onCickControlled = (e: React.MouseEvent<HTMLInputElement>) => {
    if (props.onClick) props.onClick(isChecked);
    if (props.onChange) props.onChange(e.currentTarget.checked);
  };

  const onClickUncontrolled = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (props.onClick) props.onClick(isChecked);
    if (props.onChange) props.onChange(!isChecked);
    setChecked(!isChecked);
  };

  if (checked)
    return (
      <CheckboxContainer>
        <CheckboxInput
          type="checkbox"
          checked={checked}
          onClick={onCickControlled}
          onChange={e => props.onChange && props.onChange(e.target.checked)}
        />
        <Label>{label}</Label>
      </CheckboxContainer>
    );
  else
    return (
      <CheckboxContainer>
        <CheckboxInput type="checkbox" checked={isChecked} />
        <Label onClick={onClickUncontrolled}>{label}</Label>
      </CheckboxContainer>
    );
}
