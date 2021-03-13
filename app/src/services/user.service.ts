import { Store } from 'redux'
import { ofType } from 'redux-observable'
import { authenticationActions } from '../reducers/authentication.slice'
import { ajax } from 'rxjs/ajax'
import { from, of, observable, Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap, flatMap, merge } from 'rxjs/operators'
import API from '../constants/api.constants'
import { TokenHelper } from '../helpers/token.helper'
import { setCookie } from '../helpers/cookies.helper'
import storeProvider from '../helpers/store.provider'
import { push } from 'react-router-redux'
import { IServiceApplicationState } from '../reducers/application.state';
import { ErrorHandler } from '../helpers/error.handling';
import { controlActions } from '../reducers/control.slice';
import { notification } from 'antd';
import { usersActions } from '../reducers/users.slice';

export const RequestToken = (action$, store: Store<any>) => {
    return action$.pipe(
        ofType(authenticationActions.api_requestToken.type),
        switchMap((action: any) => {
             
            return ajax
                .getJSON(`${API.SERVER_URL}${API.UserIdentityEndPoints.SIGN_IN}${action.payload.Email}&password=${action.payload.Password}`,
                    { 'Content-Type': 'application/json' }
                )
                .pipe(
                    map((response: any) => {
                        const parsedToken = TokenHelper.parseJwt(response.Body.AccessToken)
                        setCookie(
                            'token',
                            response.Body.AccessToken,
                            parsedToken.exp * 1000
                        )
                        setCookie(
                            'refresh',
                            response.Body.RefreshToken,
                            Math.round(+new Date() / 1000) + 43200 * 60
                        )
                         
                        //storeProvider.getStore().dispatch(push('/'))
                        window.location.href = '/';

                        return authenticationActions.requestTokenSuccess({
                            name: parsedToken.UserName,
                            email: parsedToken.Email,
                            netUid: parsedToken.NetUid,
                            role: parsedToken.role,
                            token: response.Body.AccessToken,
                            refreshToken: response.Body.RefreshToken,
                            expires: parsedToken.exp * 1000
                        })


                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error, true)
                    })
                )
        }
        )
    )
}

export const GetUsers = (action$, state$: IServiceApplicationState) =>
    action$.pipe(
        ofType(usersActions.apiGetUsers.type),
        switchMap((action: any) => {
             
            return ajax
                .getJSON(
                    `${API.SERVER_URL}${API.UserIdentityEndPoints.GET_ALL_USERS}`,
                    {
                        Authorization: `Bearer ${state$.value.authentication.token}`,
                        'Content-Type': 'application/json',
                    }
                )
                .pipe(
                    mergeMap((response: any) => {
                         

                        return of(usersActions.setUsersDashboard(response.Body))
                        
                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error)
                    })
                )
        })
    )

export const GetRoles = (action$, state$: IServiceApplicationState) =>
    action$.pipe(
        ofType(usersActions.apiGetUserRoles.type),
        switchMap((action: any) => {
            return ajax
                .getJSON(
                    `${API.SERVER_URL}${API.UserIdentityEndPoints.GET_ALL_ROLES}`,
                    {
                        Authorization: `Bearer ${state$.value.authentication.token}`,
                        'Content-Type': 'application/json',
                    }
                )
                .pipe(
                    mergeMap((response: any) => {
                         
                        return of(
                            usersActions.setUserRoles(response.Body),
                        )
                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error)
                    })
                )
        })
    )

export const apiCreateUserEpic = (action$, state$: IServiceApplicationState) => {
    return action$.pipe(
        ofType(usersActions.apiNewUser.type),
        switchMap((action: any) => {
              
            return ajax
                .post(`${API.SERVER_URL}${API.UserIdentityEndPoints.NEW_DASHBOARD_USER}`,
                    action.payload,
                    {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${state$.value.authentication.token}`
                    }
                )
                .pipe(
                    mergeMap((response: any) => {
                          
                        notification.success({
                            description: '',
                            message: "User created",
                            className: 'notification_item',
                        })
                        return of(usersActions.setUsersDashboard(response.response.Body))
                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error)
                    })
                )
        }
        )
    )
}