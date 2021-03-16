import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { controlActions } from "../../../reducers/control.slice";
import { IApplicationState } from "../../../reducers/application.state";
import { IdentityRoles } from "../../../entities/IdentityRoles";
import { GetIdentityRole } from "../../../helpers/role.helper";
import {
    BellOutlined
} from '@ant-design/icons';
import * as routes from "../../../constants/routes.constants";
import { useHistory } from "react-router";
import { Badge, Avatar } from "antd";


export const Header: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const authenticationUser = useSelector<IApplicationState, any>(
        (state) => state.authentication
    )

    return (
        <div className="header">
            <div className="content__CONTAINER2">
                <div className="header__LOGO">
                    <div className="lucyd__LOGO">Ping<b>Pong</b></div>
                    <div>
                        <span>{authenticationUser.role}</span>
                        <br />
                        {authenticationUser.name}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;