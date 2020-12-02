import * as React from 'react';
import styled from 'styled-components';
import {
  Form as FinalForm,
  FormProps,
  FormRenderProps,
} from 'react-final-form';
import { FormApi } from 'final-form';
import { promisify } from 'util';

const FormContainer = styled.form`
  padding: 5px;
`;

const FinalFormContainer = styled.div``;

export interface IFormProps extends Omit<FormProps, ''> {
  id?: string;
  className?: string;
  formRef?: React.LegacyRef<HTMLFormElement>;
  customForm?: FormApi;
  resetOnSuccessfulSubmit?: boolean;
  fieldsToClear?: string[];

  children: (...args: any) => JSX.Element | any;
}

/**
 * Use children render props to render Final Form
 * @param props
 */
function Form(props: IFormProps) {
  const { resetOnSuccessfulSubmit, customForm, fieldsToClear } = props;

  const resetFormState = (values: any, form: FormApi<any>) => {
    //We have to go through each field and clear it's state then reset the form state
    Object.keys(values).forEach(fieldName => form.resetFieldState(fieldName));
    form.reset();
  };

  const clearSpecifiedFields = (values: any, form: FormApi<any>) => {
    if (fieldsToClear && fieldsToClear?.length > 0) {
      for (const field of fieldsToClear) {
        form.resetFieldState(field);
      }
    }
  };

  const handleSubmit = async (
    handler: ((e: any) => void) | undefined,
    event: any,
    values: any,
    form: FormApi<any>,
  ) => {
    if (handler) {
      if (resetOnSuccessfulSubmit) {
        return Promise.resolve(handler(event))
          .then(() => resetFormState(values, form))
          .catch(() => {});
      } else {
        return Promise.resolve(handler(event))
          .then(() => clearSpecifiedFields(values, form))
          .catch(() => {});
      }
    }
    return undefined;
  };

  return (
    <FinalFormContainer className={props.className}>
      <FinalForm
        form={customForm}
        {...props}
        render={(renderProps: FormRenderProps) => (
          <FormContainer
            id={props.id}
            onSubmit={event =>
              handleSubmit(
                renderProps.handleSubmit,
                event,
                renderProps.values,
                renderProps.form,
              )
            }
            ref={props.formRef as any}
          >
            {props.children(renderProps)}
          </FormContainer>
        )}
      />
    </FinalFormContainer>
  );
}

Form.defaultProps = {
  resetOnSuccessfulSubmit: false,
};

export { Form };
