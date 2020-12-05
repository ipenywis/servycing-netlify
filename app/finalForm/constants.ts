import { FormState } from "final-form";

export enum FORMS {
  SIGNUP_FORM = "signupForm",
  LOGIN_FORM = "loginForm",

  SPECIALIST_ADD_NEW_SERVICE_FORM = "specialistAddNewService",
}

export interface IFinalFormState {
  [key: string]: FormState<any>;
}
