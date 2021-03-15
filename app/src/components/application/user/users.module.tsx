import React, { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router"
import * as routes from "../../../constants/routes.constants";
import { UserProfileView } from "./user.profile.view";
import { UsersView } from "./users.view";
import { controlActions } from "../../../reducers/control.slice";
import { useDispatch } from "react-redux";


export const UsersModule: React.FC = (props: any) => {
    const dispatch = useDispatch();

    return (
        <Switch>
            <Redirect
                exact={true}
                from={routes.USER_MODULE_URI}
                to={routes.USERS_URI} />

            <Route exact={true} path={`${routes.USER_EDIT_URI}:id`} component={UserProfileView} />
            <Route exact={true} path={`${routes.USER_NEW_URI}`} component={UserProfileView} />
            <Route path={routes.USERS_URI} component={UsersView} />
        </Switch>
    )
}
