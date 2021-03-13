import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import * as routes from "../../../constants/routes.constants";

const MasterPageView: React.FC = () => {
    const dispatch = useDispatch()

    return (
        <div className="content__CONTAINER">
            hi
                <Switch>
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
