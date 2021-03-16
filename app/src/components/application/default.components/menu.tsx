import * as React from "react"
import { useDispatch, useSelector } from "react-redux";
import { setCookie } from "../../../helpers/cookies.helper";
import { IApplicationState } from "../../../reducers/application.state";
import { UserMenuItems } from "../../../helpers/user.menu.items";
import { Menu } from "antd";
import { LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';

const MenuComponent: React.FC = (props: any) => {
    const dispatch = useDispatch()

    const { SubMenu } = Menu;

    const onLogOut = (event: any) => {
        setCookie('token', null, 0)
        setCookie('refresh', null, 0)
        window.location.href = '/';
    }

    const authenticationUser = useSelector<IApplicationState, any>(
        (state) => state.authentication
    )

    return (
        <div className="menu__CONTENT">
            <div className="selected__USER hide">
                <div className="user__NAME">{authenticationUser.name}</div>
                <div className="user__ROLE">{authenticationUser.role}</div>
            </div>

            { UserMenuItems(props) }

            <Menu
                className="logOut__MenuItem"
                style={{ width: 240 }}
                mode="inline">
                <Menu.Item onClick={(event) => onLogOut(event)} icon={<LogoutOutlined />}>
                    Log Out
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default MenuComponent;