/**
 * This is the main DUCK for final-form binding with Redux wich provides Actions, Reducer and selectors for storing
 * **final Form** state in redux store and fetching it.
 */

// Action Types
export interface IFormAction {
  type: string;
  payload: any;
  [form: string]: string | any;
}

// Actions
export const UPDATE_FORM_STATE = 'final-form-redux/finalForm/UPDATE_FORM_STATE';

// Reducer
export default function finalFormReducer(state = {}, action: Partial<IFormAction> = {}) {
  switch (action.type) {
    case UPDATE_FORM_STATE:
      return {
        ...state,
        [action.form]: action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const updateFormState = (form: string, state: any): IFormAction => ({
  type: UPDATE_FORM_STATE,
  form,
  payload: state,
});

// Selectors
export const getFormState = (state, form) =>
  (state && state.finalForm && state.finalForm[form]) || {};
