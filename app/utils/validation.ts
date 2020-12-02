import { setIn } from 'final-form';

export async function validateForm(schema: any, values: any) {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
}

export const isRequired = (message?: string) => (value: string) =>
  value && String(value).trim().length > 0 ? undefined : message || 'Required!';

export const isNotLessOrZero = (message?: string) => (value: string) =>
  value && !isNaN(parseFloat(value)) && parseFloat(value) > 0
    ? undefined
    : message || 'Enter a valid number';

export const isMaxNumber = (max: number, message?: string) => (value: string) =>
  value && !isNaN(parseFloat(value)) && parseFloat(value) < max
    ? undefined
    : message || `Max number is ${max}`;

export const isMatchRegex = (regex: RegExp, message?: string) => (
  value: string,
) =>
  !value
    ? undefined
    : regex.test(value)
    ? undefined
    : message || 'Invalid value!';

export const composeValidatorsExt = (disable = false) => (
  ...validators
) => value =>
  !disable
    ? validators.reduce(
        (error, validator) => error || (validator && validator(value)),
        undefined,
      )
    : undefined;

export const composeValidators = (...validators) => value =>
  validators.reduce(
    (error, validator) => error || (validator && validator(value)),
    undefined,
  );
