import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { UsersModule } from "../components/application/user/users.module";
import { GameModule } from "../components/application/game/game.module";

import * as routes from "../constants/routes.constants";


export const AdminRoute: React.FC = () => {
      
    return <Switch>
        <Route path={`${routes.USER_MODULE_URI}`} component={UsersModule} />
        <Route path={`${routes.GAME_MODULE_URI}`} component={GameModule} />
    </Switch>
}

export const OperatorRoute: React.FC = () => {

    return <Switch>
        <Route path={`${routes.USER_MODULE_URI}`} component={UsersModule} />
        <Route path={`${routes.GAME_MODULE_URI}`} component={GameModule} />
    </Switch>
}

export const UserRoute: React.FC = () => {
    return <Switch>
        <Route path={`${routes.GAME_MODULE_URI}`} component={GameModule} />
    </Switch>
}

