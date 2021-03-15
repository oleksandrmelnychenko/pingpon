import { Button, Pagination, Popconfirm, Space, Table } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { UserProfile } from "../../../entities/UserProfile";
import { FilterDescriptor } from "../../../helpers/filter.descriptor";
import { IApplicationState } from "../../../reducers/application.state";
import { userManagementActions } from "../../../reducers/user.management.slice";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import * as routes from "../../../constants/routes.constants";
import { GetIdentityRole } from "../../../helpers/role.helper";
import { IdentityRoles } from "../../../entities/IdentityRoles";



export const UsersView: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const filterDescriptor = useSelector<IApplicationState, FilterDescriptor>(state => state.userManagement.filterDescriptor);
    const userProfiles = useSelector<IApplicationState, UserProfile[]>(state => state.userManagement.userProfiles);

    const authenticationUser = useSelector<IApplicationState, any>((state) => state.authentication)

    const userProfilesColumns: any[] = [
        {
            title: 'UserName',
            dataIndex: 'UserName',
            key: 'UserName',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            render: email => <span>{email}</span>,
        },
        {
            title: 'Role',
            dataIndex: 'RoleDescription',
            key: 'RoleDescription',
            render: role => <span>{role}</span>,
        },
        {
            title: ' ',
            dataIndex: 'NetUid',
            key: 'NetUid',
            width: '160px',
            align: 'right',
            render: (NetUid, selectedUser) => <>
                <Button disabled={permision({ NetUid, selectedUser })} onClick={() => { userSelection({ NetUid, selectedUser }) }} type="primary" size={"small"} style={{ marginRight: 4 }}>edit</Button>
                <Popconfirm
                    placement="topRight"
                    title={"Remove user ?"}
                    onConfirm={() => { userRemove({ NetUid, selectedUser }) }}
                    okText="Yes"
                    cancelText="Cancel"
                >
                    <Button disabled={permision({ NetUid, selectedUser })} type="primary" size={"small"} danger>remove</Button>
                </Popconfirm>
            </>,
        }
    ]


    useEffect(() => {
        dispatch(userManagementActions.apiGetUsers(filterDescriptor))
    }, [])

    useEffect(() => {
        dispatch(userManagementActions.apiGetUsers(filterDescriptor))
    }, [filterDescriptor])

    const getHeight = () => {
        let hTable = document.getElementsByClassName('fixed_pagination__CONTENT')[0];
        if (hTable) {
            return hTable.clientHeight - 100
        } else {
            return 600
        }
    }

    const permision = (user) => {
        if ((GetIdentityRole(authenticationUser.role) === IdentityRoles.Administrator ||
            (GetIdentityRole(authenticationUser.role) === user.selectedUser.IdentityRole ||
                user.selectedUser.RoleDescription === 'User'))) {
            debugger
            return false
        } else {
            debugger
            return true
        }
    }

    const userSelection = (user) => {
        dispatch(userManagementActions.setUserProfile(user.selectedUser))
        history.push(routes.USER_EDIT_URI + user.NetUid)
    }

    const userRemove = (user) => {
        debugger
        dispatch(userManagementActions.apiUpdateUser({
            ...user.selectedUser,
            Deleted: true
        }))
    }

    const onCreateProject = () => {
        dispatch(userManagementActions.setUserProfile(new UserProfile()))
        dispatch(userManagementActions.apiGetRoles())
        history.push(routes.USER_NEW_URI)
    }

    return (
        <div className="component__UserManagment__VIEW">
            <div className="allUsers__PAGE">

                <div className="view__CONTROLS">
                    <div className="controls__WRAPPER">
                        <div className="controls__LEFT">
                            <h2 className="page__TITLE">Users</h2>
                        </div>

                        {
                            (GetIdentityRole(authenticationUser.role) === IdentityRoles.Administrator) ?
                                <div className="controls__RIGHT">
                                    <Button type="primary" onClick={onCreateProject}> Create User</Button>
                                </div> : null
                        }

                    </div>

                </div>

                <div className="view__CONTENT fixed_pagination__CONTENT">
                    <Table
                        columns={userProfilesColumns}
                        dataSource={userProfiles}
                        size={"small"}
                        pagination={false}
                        scroll={{ y: getHeight() }}
                        rowKey={record => record.NetUid}
                    />
                    <div className={'pagination__CONTAINER'} style={{ marginTop: 10 }}>
                        <Pagination
                            showSizeChanger
                            defaultCurrent={1}
                            total={10}
                            onChange={(page, pageSize) => {
                                dispatch(userManagementActions.setFilterDescriptor({
                                    ...filterDescriptor,
                                    limit: pageSize,
                                    offset: pageSize * (page - 1)
                                }))
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}