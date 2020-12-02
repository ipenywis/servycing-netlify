import React from 'react';
import styled from 'styled-components';
import { theme, css } from 'styles/styled-components';
import { GreyText } from 'components/text';
import { Marginer } from 'components/marginer';

/**
 * NOTE: This Component is Not being used. Please Consider using InputGroup Instead
 */

export interface IFormGroupProps {
  label?: string;
  inline?: boolean;
  color?: string;
  bold?: boolean;
  note?: string;
  footerNote?: string;

  children: any | any[];
}

const FormGroupContainer = styled.div<IFormGroupProps>`
  display: flex;
  flex-direction: column;

  ${({ inline }) =>
    inline &&
    css`
      flex-direction: row;
      align-items: start;
    `};

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label<IFormGroupProps>`
  font-size: 14px;
  color: ${({ color }) => (color ? color : theme.default.tertiaryText)};
  font-weight: ${({ bold }) => (bold ? 500 : 400)};

  ${({ inline }) =>
    inline &&
    css`
      margin-right: 5px;
      margin-top: 3px;
      margin-bottom: 0;
    `};
`;

function FormGroup(props: IFormGroupProps) {
  const { label, note, footerNote } = props;

  return (
    <FormGroupContainer {...props}>
      <Label {...props}>{label}</Label>
      {note && <GreyText size={13}>{note}</GreyText>}
      <Marginer direction="vertical" margin={6} />
      {props.children}
      {footerNote && <GreyText size={13}>{footerNote}</GreyText>}
    </FormGroupContainer>
  );
}

FormGroup.defaultProps = {
  bold: false,
};

export { FormGroup };
