import * as React from "react";
import * as routes from "../constants/routes.constants";
import { useSelector } from "react-redux";
import { IApplicationState } from "../reducers/application.state";
import MasterPageView from "./application/master/master.page.view";
import { ProtectedRoute } from "../helpers/protected.route";
import AccountSecurity from "./account_security/account.security";
import { AuthenticationState } from '../reducers/authentication.slice'
import { Route, Switch, Redirect } from "react-router-dom";

interface IRouting {
    onEnter: void;
    path: string
}

const Routing: React.FC<IRouting> = (props) => {
    const AuthenticationState = useSelector<IApplicationState, AuthenticationState>((state) => state.authentication);

    if (AuthenticationState.netUid && AuthenticationState.netUid !== '') {
        
        return (
            <Switch>
                <Redirect exact={true} from={'/'} to={`${routes.APP_URI}`} />
                <ProtectedRoute
                    path={`${routes.APP_URI}`}
                    authenticated={!!AuthenticationState.netUid}
                    component={MasterPageView}
                />
            </Switch>
        )
    }
    else {
        return (
            <Switch>
                {/*
                 <Redirect
                    exact
                    from={'/'}
                    to={`${routes.APP_URI}`} />
                <Route path={routes.APP_URI} component={MasterPageView} />
                 */}
                <Redirect
                    exact
                    from={'/'}
                    to={`${routes.ACCOUNT_SECURITY_URI}`} />
                 <Route path={routes.ACCOUNT_SECURITY_URI} component={AccountSecurity} />
                

                 
            </Switch>
        )
    }
}

export default Routing;