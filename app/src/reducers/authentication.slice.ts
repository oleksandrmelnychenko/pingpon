import { createSlice } from "@reduxjs/toolkit";

export class AuthenticationState {
    fetching: boolean;
    message: string;
    isErrorMessage: boolean;
    name: string;
    email: string;
    role: string;
    netUid: string;
    token: string;
    refreshToken: string;
    expires: number;
    refreshPromise: any;
    formRef: any;
}

export const DefaultAuthenticationState: AuthenticationState = {
    fetching: false,
    message: '',
    isErrorMessage: true,
    name: '',
    email: '',
    role: '',
    netUid: '',
    token: '',
    refreshToken: '',
    expires: 0,
    refreshPromise: null,
    formRef: null
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: DefaultAuthenticationState,
    reducers: {
        api_requestToken(state, action) {
            return Object.assign(state, {
                fetching: true
            } as AuthenticationState)
        },
        requestTokenSuccess(state, action: { type: string; payload: any }) {
              
            return Object.assign(state, {
                fetching: false,
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role,
                netUid: action.payload.netUid,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                expires: action.payload.expires,
                refreshPromise: DefaultAuthenticationState.refreshPromise
            } as AuthenticationState);
        },
        requestTokenFailed(state, action) {
            return Object.assign(state, {
                fetching: false,
                isErrorMessage: true,
                message: action.payload
            } as AuthenticationState);
        },
        setRefreshPromise(state, action) {
            return Object.assign(state, {
                refreshPromise: action.payload
            } as AuthenticationState);
        },
        showSuccessMessage(state, action) {
            return Object.assign(state, {
                isErrorMessage: false,
                message: action.payload
            } as AuthenticationState);
        },
        clearMessage(state) {
            return Object.assign(state, {
                message: DefaultAuthenticationState.message,
                isErrorMessage: DefaultAuthenticationState.isErrorMessage,
            } as AuthenticationState);
        },
        logoutSuccess(state) {
            return DefaultAuthenticationState;
        },
    }
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;