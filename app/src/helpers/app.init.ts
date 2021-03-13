import { Store } from 'redux'
import { getCookie } from './cookies.helper';
import { TokenHelper } from './token.helper';
import * as routes from "../constants/routes.constants";
import { push } from 'react-router-redux';
import { authenticationActions } from '../reducers/authentication.slice';

export function AppInit(store: Store<any>) {
    const token: string = getCookie('token');
    const refresh: string = getCookie('refresh');

    if (token && refresh) {
        const parsedToken = TokenHelper.parseJwt(token);

        if (document.URL.indexOf(routes.APP_URI) === -1) {
            store.dispatch(push(routes.APP_URI));
        }

        store.dispatch(
            authenticationActions.requestTokenSuccess({
                name: parsedToken.UserName,
                email: parsedToken.Email,
                netUid: parsedToken.ID,
                role: parsedToken.role,
                token: token,
                refreshToken: refresh,
                expires: parsedToken.exp * 1000,
            })
        )
    } else {
        if (document.URL.indexOf(routes.APP_URI) !== -1) {
            store.dispatch(authenticationActions.logoutSuccess)
        }
    }
}