import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import * as routes from "../../../constants/routes.constants";
import { IdentityRoles } from '../../../entities/IdentityRoles';
import { GetIdentityRole } from '../../../helpers/role.helper';
import { AdminRoute, OperatorRoute, UserRoute } from '../../../helpers/user.routes';
import { IApplicationState } from '../../../reducers/application.state';

const MasterPageView: React.FC = () => {
    const dispatch = useDispatch()

    const authenticationUser = useSelector<IApplicationState, any>((state) => state.authentication)

    const renderRoutes = (role: string) => {
        switch (GetIdentityRole(role)) {
            case IdentityRoles.Admin:
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
        <div className="content__CONTAINER">
            hi
            <Switch>
                {renderRoutes(authenticationUser.role)}

                    { /*
                     <Redirect
                        exact={true}
                        from={routes.APP_URI}
                        to={`${routes.SERVER_CONFIG}`} />


                    <Route path={`${routes.SERVER_CONFIG}`} component={ServerConfigModule} />
                    <Route path={`${routes.USERS_MODULE}`} component={UsersModule} />
                    <Route path={`${routes.ITEMS_MODULE}`} component={ItemsConfigModule} />
                    <Route path={`${routes.LOCATIONS_MODULE}`} component={LocationsConfigModule} />
                    <Route path={`${routes.QUESTS_MODULE}`} component={QuestsConfigModule} />
                    <Route path={`${routes.MOBS_MODULE}`} component={MobsConfigModule} />
                    <Route path={`${routes.NPC_MODULE}`} component={NPCConfigModule} />

                    <Route path={`${routes.SETTINGS}`} component={SettingsView} />
                     */}
                    
                </Switch>
            </div>
    )
}
export default MasterPageView;
