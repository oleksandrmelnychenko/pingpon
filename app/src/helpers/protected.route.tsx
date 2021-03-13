import * as React from "react";
import { Redirect, Route } from "react-router-dom";

interface IProtectedRouteProps {
    component: Function;
    path: string;
    authenticated: boolean;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = (props: any) => {
    return props.authenticated === true ?
        <Route path={`${props.path}`} component={props.component} /> :
        <Redirect from={`${props.path}`} to={'/account-security'} />
}