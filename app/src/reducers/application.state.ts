import { AuthenticationState } from "./authentication.slice";
import { ControlState } from "./control.slice";
import { UsersState } from "./users.slice";

export interface IServiceApplicationState {
    value: IApplicationState
}

export interface IApplicationState {
    authentication: AuthenticationState,
    control: ControlState,
    users: UsersState
}