

import React, { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router"
import * as routes from "../../../constants/routes.constants";
import { controlActions } from "../../../reducers/control.slice";
import { useDispatch } from "react-redux";
import { GameView } from "./game.view";


export const GameModule: React.FC = (props: any) => {
    const dispatch = useDispatch();

    return (
        <div className="content__CONTAINER">
            <Switch>
                <Redirect
                    exact={true}
                    from={routes.GAME_MODULE_URI}
                    to={routes.GAME_URI} />

                <Route path={routes.GAME_URI} component={GameView} />
            </Switch>
        </div>
    )
}
