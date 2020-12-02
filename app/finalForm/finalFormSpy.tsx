import * as React from 'react';
import { FormSpy as FFormSpy } from 'react-final-form';
import { connect } from 'react-redux';
import { updateFormState } from './finalFormDuck';

export interface IFromSpyProps {
  form: string;
  updateFormState: (form: string, state: any) => void;
}

function FormSpy({ form, updateFormState }: IFromSpyProps) {
  return (
    <FFormSpy
      onChange={state => updateFormState && updateFormState(form, state)}
    />
  );
}

export default connect(undefined, { updateFormState })(FormSpy);
