import { createSlice } from '@reduxjs/toolkit'

export type ControlState = {
    isMenuOpen: boolean,
    isGlobalShimmerActive: boolean,
    isSelectedUrl: string
}

export const DefaultControlState: ControlState = {
    isMenuOpen: false,
    isGlobalShimmerActive: false,
    isSelectedUrl: '',
}

const controlSlice = createSlice({
    name: 'control',
    initialState: DefaultControlState,
    reducers: {
        openMenu(state) {
            state.isMenuOpen = true
        },
        closeMenu(state) {
            state.isMenuOpen = false
        },
        showGlobalShimmer(state) {
            return Object.assign(state, {
                isGlobalShimmerActive: true,
            } as ControlState)
        },
        hideGlobalShimmer(state) {
            return Object.assign(state, {
                isGlobalShimmerActive: false,
            } as ControlState)
        },
        selectUrl(state, action: { type: string, payload: string }) {
            state.isSelectedUrl = action.payload
        },
    }
});

export default controlSlice.reducer
export const controlActions = controlSlice.actions