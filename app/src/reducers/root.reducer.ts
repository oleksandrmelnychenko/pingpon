import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { default as ControlReducer } from './control.slice'
import { default as AuthenticationReducer } from './authentication.slice';
import { default as UserManagementReducer } from './user.management.slice';
import { default as GameManagementReducer } from './game.slice';

export const reducers = combineReducers({
    authentication: AuthenticationReducer,
    userManagement: UserManagementReducer,
    gameManagement: GameManagementReducer,
    control: ControlReducer,
    routing: routerReducer
})
