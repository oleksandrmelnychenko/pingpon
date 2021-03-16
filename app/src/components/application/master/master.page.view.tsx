import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router';
import * as routes from "../../../constants/routes.constants";
import { IdentityRoles } from '../../../entities/IdentityRoles';
import { GetIdentityRole } from '../../../helpers/role.helper';
import { AdminRoute, OperatorRoute, UserRoute } from '../../../helpers/user.routes';
import { IApplicationState } from '../../../reducers/application.state';
import Header from '../default.components/header';
import MenuComponent from '../default.components/menu';

const MasterPageView: React.FC = () => {
    const dispatch = useDispatch()

    const authenticationUser = useSelector<IApplicationState, any>((state) => state.authentication)

    const renderRoutes = (role: string) => {
        switch (GetIdentityRole(role)) {
            case IdentityRoles.Administrator:
                return AdminRoute(null)
            case IdentityRoles.Operator:
                return OperatorRoute(null)
            case IdentityRoles.User:
                return UserRoute(null)
            default:
                break;
        }
    }

    return (
        <div className="component__MasterPage_VIEW">
            <Header />
            <MenuComponent />

            <Switch>
                <Redirect
                    exact={true}
                    from={routes.APP_URI}
                    to={authenticationUser.role === 'Administrator' ? routes.USERS_URI : 'app/uuuuuu'} />

                {renderRoutes(authenticationUser.role)}
            </Switch>
        </div>
    )
}
export default MasterPageView;
