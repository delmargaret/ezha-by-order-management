import { Action } from '@ngrx/store';
import { LoginState } from 'src/app/models/loginState';

export const ActionTypes = {
  SET_LOGIN_STATE: 'SET_LOGIN_STATE',
};

export interface PayloadAction extends Action {
  payload?: any;
}

export class SetLoginState implements PayloadAction {
  readonly type = ActionTypes.SET_LOGIN_STATE;
  constructor(public payload: LoginState) {}
}
