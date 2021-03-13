import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { default as ControlReducer } from './control.slice'
import { default as AuthenticationReducer } from './authentication.slice';
import { default as UsersReducer } from './users.slice';

export const reducers = combineReducers({
    authentication: AuthenticationReducer,
    users: UsersReducer,
    control: ControlReducer,
    routing: routerReducer
})
