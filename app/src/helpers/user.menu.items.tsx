import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as routes from "../constants/routes.constants";
import { IdentityRoles } from "../entities/IdentityRoles";
import { IApplicationState } from "../reducers/application.state";
import { controlActions } from "../reducers/control.slice";
import { setCookie } from "./cookies.helper";
import { GetIdentityRole } from "./role.helper";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory, useParams } from "react-router";

export const UserMenuItems: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const uriParams = history.location.pathname;

    const selectedMenuItemUrl = useSelector<IApplicationState, any>((state) => state.control.isSelectedUrl)

    useEffect(() => {
        dispatch(controlActions.selectUrl(uriParams))
    }, [uriParams])

    const authenticationUser = useSelector<IApplicationState, any>((state) => state.authentication)

    const { SubMenu } = Menu;

    const adminMenu = [
        { route: routes.USER_MODULE_URI, onClick: () => dispatch(controlActions.selectUrl(routes.USER_MODULE_URI)), name: "Users" },
    ]

    const OperatorMenu = [
        { route: routes.USER_MODULE_URI, onClick: () => dispatch(controlActions.selectUrl(routes.USER_MODULE_URI)), name: "Users" },
    ]

    const UserMenu = [
       /* { route: routes.DASHBOARD_MODULE_URI, onClick: () => dispatch(controlActions.selectUrl(routes.DASHBOARD_MODULE_URI)), name: "Dashboard" },*/
    ]


    const buildMenuByUserRole = (menuItems: Array<any>) => {
        return menuItems.map((menuItem, index) =>
            <Menu.Item key={index} onClick={menuItem.onClick} className={selectedMenuItemUrl.indexOf(menuItem.route) !== -1 ? 'ant-menu-item-selected' : 'ant-menu-item_NOT_selected'} >
                <NavLink to={`${menuItem.route}`}>{menuItem.name}</NavLink>
            </Menu.Item>
        );
    }

    const renderMenuItems = (role: string) => {
        switch (GetIdentityRole(role)) {
            case IdentityRoles.Administrator:
                return buildMenuByUserRole(adminMenu)
            case IdentityRoles.Operator:
                return buildMenuByUserRole(OperatorMenu)
            case IdentityRoles.User:
                return buildMenuByUserRole(UserMenu)
            default:
                break;
        }
    }

    return <Menu
        style={{ width: 240 }}
        //defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        
    >
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation">
            {renderMenuItems(authenticationUser.role)}
        </SubMenu>
    </Menu>


}
