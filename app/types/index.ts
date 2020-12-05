import { Reducer, Store } from "redux";
import { RouterState } from "connected-react-router";
import { Saga } from "redux-saga";
import { SagaInjectionModes } from "redux-injectors";

import { IAuthenticationState } from "containers/Authentication/types";
import { FormState } from "final-form";
import { IFinalFormState } from "finalForm/constants";
import { IDiscoverPageState } from "containers/DiscoverPage/types";
import { ISpecialistDashboardPageState } from "containers/Specialist/Dashboard/types";

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: Saga<any[]> | undefined, args: any | undefined): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: Saga;
  mode?: SagaInjectionModes;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly app: any;
  readonly router: RouterState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  readonly authentication: IAuthenticationState;
  readonly finalForm: IFinalFormState;

  readonly discoverPage: IDiscoverPageState;

  readonly specialistDashboardPage: ISpecialistDashboardPageState;
}

export interface IAction {
  type: string;
  payload?: any;
}
