import { IAuthenticationState } from "./types";
import { IAction } from "types";
import { ActionTypes } from "./constants";

const defaulSate: IAuthenticationState = {
  isCustomerAuthenticated: false,
  isSpecialistAuthenticated: false,
  isAdminAuthenticated: false,
  authenticatedUser: null,
};

export default function authenticationReducer(
  state: IAuthenticationState = defaulSate,
  action: IAction
) {
  switch (action.type) {
    case ActionTypes.CUSTOMER_AUTHENTICATED:
      return { ...state, isCustomerAuthenticated: true };
    case ActionTypes.CUSTOMER_UNAUTHENTICATED:
      return { ...state, isCustomerAuthenticated: false };
    case ActionTypes.SPECIALIST_AUTHENTICATED:
      return { ...state, isSpecialistAuthenticated: true };
    case ActionTypes.SPECIALIST_UNAUTHENTICATED:
      return { ...state, isSpecialistAuthenticated: false };
    case ActionTypes.ADMIN_AUTHENTICATED:
      return { ...state, isAdminAuthenticated: true };
    case ActionTypes.ADMIN_UNAUTHENTICATED:
      return { ...state, isAdminAuthenticated: false };
    case ActionTypes.SET_AUTHENTICATED_USER:
      return { ...state, authenticatedUser: action.payload };
    default:
      return state;
  }
}
