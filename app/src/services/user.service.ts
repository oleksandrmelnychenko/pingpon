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
import { userManagementActions } from '../reducers/user.management.slice';

export const RequestToken = (action$, store: Store<any>) => {
    return action$.pipe(
        ofType(authenticationActions.api_requestToken.type),
        switchMap((action: any) => {

            return ajax
                .post(`${API.SERVER_URL}${API.UserIdentityEndPoints.SIGN_IN}`,
                    action.payload,
                    { 'Content-Type': 'application/json' }
                )
                .pipe(
                    map((response: any) => {
                          
                        const parsedToken = TokenHelper.parseJwt(response.response.Body.AccessToken)

                        setCookie(
                            'token',
                            response.response.Body.AccessToken,
                            parsedToken.exp * 1000
                        )
                        setCookie(
                            'refresh',
                            response.response.Body.RefreshToken,
                            Math.round(+new Date() / 1000) + 43200 * 60
                        )

                        //storeProvider.getStore().dispatch(push('/app'))

                        window.location.href = '/app';

                        return authenticationActions.requestTokenSuccess({
                            name: parsedToken.UserName,
                            email: parsedToken.Email,
                            netUid: parsedToken.NetUid,
                            role: parsedToken.role,
                            token: response.response.body.AccessToken,
                            refreshToken: response.response.body.RefreshToken,
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
        ofType(userManagementActions.apiGetUsers.type),
        switchMap((action: any) => {

            return ajax
                .getJSON(
                    `${API.SERVER_URL}${API.UserIdentityEndPoints.GET_ALL_USERS}${action.payload.searchDescriptor}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
                    {
                        Authorization: `Bearer ${state$.value.authentication.token}`,
                        'Content-Type': 'application/json',
                    }
                )
                .pipe(
                    mergeMap((response: any) => {
                        return of(
                            userManagementActions.setUsers(response.Body),
                        )
                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error)
                    })
                )
        })
    )

export const GetUserProfileById = (action$, state$: IServiceApplicationState) =>
    action$.pipe(
        ofType(userManagementActions.apiGetUserProfileByNetId.type),

        switchMap((action: any) => {
            return ajax
                .getJSON(
                    `${API.SERVER_URL}${API.UserIdentityEndPoints.GET_USER_PROFILE_BY_USER_NET_ID}${action.payload}`,
                    {
                        Authorization: `Bearer ${state$.value.authentication.token}`,
                        'Content-Type': 'application/json',
                    }
                )
                .pipe(
                    mergeMap((response: any) => {
                        
                        return of(
                            userManagementActions.setUserProfile(response.Body),
                            userManagementActions.apiGetRoles(),
                        )
                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error)
                    })
                )
        })
    )

export const GetRoles = (action$, state$: IServiceApplicationState) =>
    action$.pipe(
        ofType(userManagementActions.apiGetRoles.type),
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
                            userManagementActions.setRoles(response.Body),
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
        ofType(userManagementActions.apiNewUser.type),
        switchMap((action: any) => {
            debugger
            return ajax
                .post(`${API.SERVER_URL}${API.UserIdentityEndPoints.NEW_USER_PROFILE}`,
                    action.payload,
                    {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${state$.value.authentication.token}`
                    }
                )
                .pipe(
                    mergeMap((response: any) => {
                        debugger
                        notification.success({
                            description: '',
                            message: "User created",
                            className: 'notification_item',
                        })
                        return of(push('/app/users'))
                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error)
                    })
                )
        }
        )
    )
}

export const apiUpdateUserEpic = (action$, state$: IServiceApplicationState) => {
    return action$.pipe(
        ofType(userManagementActions.apiUpdateUser.type),
        switchMap((action: any) => {

            return ajax
                .post(`${API.SERVER_URL}${API.UserIdentityEndPoints.UPDATE_USER_PROFILE}`,
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
                            message: response.response.Body,
                            className: 'notification_item',
                        })
                        return of(push('/app/users'))
                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error)
                    })
                )
        }
        )
    )
}

export const apiChangeUserPasswordEpic = (action$, state$: IServiceApplicationState) => {
    return action$.pipe(
        ofType(userManagementActions.apiChangeUserPassword.type),
        switchMap((action: any) => {

            return ajax
                .post(`${API.SERVER_URL}${API.UserIdentityEndPoints.CHANGE_PASSWORD}`,
                    action.payload,
                    {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${state$.value.authentication.token}`
                    }

                )
                .pipe(
                    map((response: any) => {
                        notification.success({
                            description: '',
                            message: response.response.Body,
                            className: 'notification_item',
                        })
                        return { type: '' }
                    }),
                    catchError((error: any) => {
                        return ErrorHandler(error)
                    })
                )
        }
        )
    )
}