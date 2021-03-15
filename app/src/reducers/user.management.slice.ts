import { createSlice } from '@reduxjs/toolkit'
import { UserProfile } from '../entities/UserProfile'
import { FilterDescriptor } from '../helpers/filter.descriptor'

export type UserManagementState = {
    userProfiles: UserProfile[],
    selectedUserProfile: UserProfile,
    selectedRole: string,
    totalUsers: number,
    filterDescriptor: FilterDescriptor,
    userRoles:any[]
}

export const UserManagementState: UserManagementState = {
    userProfiles: [],
    userRoles: [],
    selectedUserProfile: new UserProfile(),
    selectedRole: null,
    totalUsers: 10,
    filterDescriptor: new FilterDescriptor()
}

const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState: UserManagementState,
    reducers: {
        setTotalUsers(state, action) { state.totalUsers = action.payload },
        setFilterDescriptor(state, action) { state.filterDescriptor = action.payload },
        setUserProfile(state, action) { state.selectedUserProfile = action.payload; },
        apiGetSelectedRole() { },
        setRole(state, action) { state.selectedRole = action.payload },
        apiGetUsers(state, action) { },
        setUsers(state, action) {
            state.userProfiles = action.payload
        },
        apiGetUsersByCompanyId(state, action) { },
        apiGetRoles(state) { },
        setRoles(state, action) { state.userRoles = action.payload },
        apiGetUserProfileByNetId(state, action) { },
        apiNewUser(state, action) { },
        apiUpdateUser(state, action) { },
        apiChangeUserPassword(state, action) { },
        resetUserManagementStore(state) {
            return UserManagementState;
        }
    },
})

export const userManagementActions = userManagementSlice.actions
export default userManagementSlice.reducer