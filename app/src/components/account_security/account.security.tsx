import { Switch, Route, Redirect } from "react-router";
import * as React from "react";
import * as routes from "../../constants/routes.constants";
import SignIn from "./signin";

const AccountSecurity: React.FC<any> = (props: any) => {
    return (
        <Switch>
            {/* <Redirect from="*" to={`/404`} />*/}

            <Redirect
                exact={true}
                from={routes.ACCOUNT_SECURITY_URI}
                to={`${routes.ACCOUNT_SECURITY_URI}${routes.SIGN_IN_URI}`}
            />
            <Route path={`${routes.ACCOUNT_SECURITY_URI}${routes.SIGN_IN_URI}`} component={SignIn} />
        </Switch>
    )
}

export default AccountSecurity;
