import { Pagination, Space, Table } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { UserProfile } from "../../../entities/UserProfile";
import { FilterDescriptor } from "../../../helpers/filter.descriptor";
import { IApplicationState } from "../../../reducers/application.state";
import { userManagementActions } from "../../../reducers/user.management.slice";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import * as routes from "../../../constants/routes.constants";



export const UsersView: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const filterDescriptor = useSelector<IApplicationState, FilterDescriptor>(state => state.userManagement.filterDescriptor);
    const userProfiles = useSelector<IApplicationState, UserProfile[]>(state => state.userManagement.userProfiles);

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
            render: role => <span onClick={() => { debugger }}>{role}</span>,
        },
        {
            title: ' ',
            dataIndex: 'NetUid',
            key: 'NetUid',
            render: (NetUid, selectedUser) => <span onClick={() => { userSelection({ NetUid, selectedUser }) }}>Edit</span>,
        },
    ]


    useEffect(() => {
        dispatch(userManagementActions.apiGetUsers(filterDescriptor))
    }, [])

    useEffect(() => {
        dispatch(userManagementActions.apiGetUsers(filterDescriptor))
    }, [filterDescriptor])

    const getHeight = () => {
        let hTable = document.getElementsByClassName('page__CONTENT')[0];
        if (hTable) {
            return hTable.clientHeight - 100
        } else {
            return 600
        }
    }

    const userSelection = (user) => {
        debugger
        dispatch(userManagementActions.setUserProfile(user.selectedUser))
        history.push(routes.USER_EDIT_URI + user.NetUid)
    }

    return (
        <div className="allUsers__PAGE">
            <div className="page__CONTENT" style={{ height: 720 }}>
                <Table
                    columns={userProfilesColumns}
                    dataSource={userProfiles}
                    size={"small"}
                    pagination={false}
                    scroll={{ y: getHeight() }}
                    rowKey={record => record.NetUid}
                    bordered
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
    )
}