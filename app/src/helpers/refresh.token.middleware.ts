import moment from "moment";
import { deleteCookie, setCookie } from "./cookies.helper";
import { authenticationActions } from "../reducers/authentication.slice";
import { push } from "react-router-redux";
import API from "../constants/api.constants";
import { TokenHelper } from "./token.helper";
import { notification } from "antd";

export default function refreshTokenMiddleware(store) {
    return dispatch => action => {
        
        let current = moment().toDate();
        let expires = new Date(store.getState().authentication.expires);
        if (action.type)
            
            if (action.type.indexOf('api') !== -1 && store.getState().authentication.refreshToken)
                if (current > expires) {
                    if (!store.getState().authentication.refreshPromise)
                        return refreshToken(store)
                            .then(() => dispatch(action),
                                (err) => {
                                    notification.error({
                                        description: '',
                                        message: "Token [deleteCookie]",
                                        className: 'notification_item',
                                    })
                                    
                                    deleteCookie('token');
                                    deleteCookie('refresh');
                                    // store.dispatch(authenticationActions.requestTokenFailed(err.response.Message));
                                    dispatch(authenticationActions.logoutSuccess());
                                    return dispatch(push('/account-security'));
                                });
                    else
                        return store.getState().authentication.refreshPromise
                            .then(() => dispatch(action),
                                (err) => {
                                    notification.error({
                                        description: '',
                                        message: "Token [deleteCookie]",
                                        className: 'notification_item',
                                    })
                                    
                                    deleteCookie('token');
                                    deleteCookie('refresh');
                                    // store.dispatch(authenticationActions.requestTokenFailed(err.response.Message));
                                    dispatch(authenticationActions.logoutSuccess());
                                    return dispatch(push('/account-security'));
                                });
                }

        return dispatch(action);
    };
}

async function refreshToken(store) {
    
    let promise = fetch(`${API.SERVER_URL}${API.UserIdentityEndPoints.REFRESH_TOKEN}?token=${store.getState().authentication.refreshToken}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"
    }).then((response) =>
        response.json()
    ).then(data => {
          
        const parsedToken = TokenHelper.parseJwt(data.Body.AccessToken);
        setCookie("token", data.Body.AccessToken, parsedToken.exp * 1000);
        setCookie("refresh", data.Body.RefreshToken, Math.round(+new Date() / 1000) + (43200 * 60));

        window.location.reload(); 

        notification.success({
            description: '',
            message: "Token [success]",
            className: 'notification_item',
        })

        store.dispatch(authenticationActions.requestTokenSuccess({
            name: parsedToken.UserName,
            email: parsedToken.Email,
            netUid: parsedToken.NetId,
            role: parsedToken.role,
            token: data.Body.AccessToken,
            refreshToken: data.Body.RefreshToken,
            expires: parsedToken.exp * 1000
        }));

        return Promise.resolve();
    }).catch((res) => {
        return Promise.reject(res);
    });

    store.dispatch(authenticationActions.setRefreshPromise(promise));

    return promise;
}