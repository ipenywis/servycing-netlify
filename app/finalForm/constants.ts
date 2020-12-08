import { FormState } from "final-form";

export enum FORMS {
  SIGNUP_FORM = "signupForm",
  LOGIN_FORM = "loginForm",

  SPECIALIST_ADD_NEW_SERVICE_FORM = "specialistAddNewServiceForm",

  ADMIN_ADD_NEW_SPECIALIST_FORM = "adminAddNewSpecialistForm",
  ADMIN_ADD_NEW_SERVICE_FORM = "adminAddNewServiceForm",
}

export interface IFinalFormState {
  [key: string]: FormState<any>;
}
