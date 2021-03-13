import { createSlice } from '@reduxjs/toolkit'

export type ControlState = {
    isMenuOpen: boolean,
    isGlobalShimmerActive: boolean,
}

export const DefaultControlState: ControlState = {
    isMenuOpen: false,
    isGlobalShimmerActive: false,
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
    }
});

export default controlSlice.reducer
export const controlActions = controlSlice.actions