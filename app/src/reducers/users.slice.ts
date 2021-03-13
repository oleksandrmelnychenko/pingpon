import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs';
import { DashboardUser } from '../entities/user/dashboard.user';
import { DashboardUserRole } from '../entities/user/dashboard.user.role';

export type UsersState = {
    allUsers: DashboardUser[],
    selectedUser: DashboardUser | undefined,
    userRoles: any[],
    selectedRole: string | undefined
}

export const DefaultUsersState: UsersState = {
    allUsers: [],
    selectedUser: undefined,
    userRoles: [],
    selectedRole: ''
}

const usersSlice = createSlice({
    name: 'users',
    initialState: DefaultUsersState,
    reducers: {
        apiGetUsers() { },
        apiNewUser(state, action) { },
        apiGetUserRoles() { },
        setUserRoles(state, action) {
            state.userRoles = action.payload
        },
        setUserRole(state, action) {
            state.selectedRole = action.payload
        },
        setUsersDashboard(state, action) {
            state.allUsers = action.payload
        },
        setSelectedUser(state, action) {
            state.selectedUser = action.payload
        }
    }
});

export default usersSlice.reducer
export const usersActions = usersSlice.actions