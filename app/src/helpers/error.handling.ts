import { of, Observable } from "rxjs";
import { deleteCookie } from "./cookies.helper";
import { controlActions } from "../reducers/control.slice";
import { notification } from "antd";
import { authenticationActions } from "../reducers/authentication.slice";

export function ErrorHandler(error, isAuth?: boolean): Observable<any> {
   
     if (error.status === 401) {
        //deleteCookie('token');
        //deleteCookie('refresh');

        window.location.href = '/'

         notification.info({
             description: '',
             message: "401",
             className: 'notification_item',
         })

        //return of(authenticationActions.logoutSuccess());
    }

    if (error.status === 400) {
        notification.error({
            description: '',
            message: error.response.Message,
            className: 'notification_item'
        })

        return isAuth ?
            of(authenticationActions.requestTokenFailed(error.response.Message)) :
            of(controlActions.hideGlobalShimmer());
    }
    

    return of({ type: 'unhandled Error' });
}