import { AuthenticationState } from "./authentication.slice";
import { ControlState } from "./control.slice";
import { UserManagementState } from "./user.management.slice";
import { GameManagementState } from "./game.slice";

export interface IServiceApplicationState {
    value: IApplicationState
}

export interface IApplicationState {
    authentication: AuthenticationState,
    control: ControlState,
    userManagement: UserManagementState,
    gameManagement: GameManagementState
}