import { createSlice } from "@reduxjs/toolkit";
import { GameModel } from "../components/application/game/game.model"


export class GameManagementState {
    games: Array<GameModel>;
    answers: Array<number>;
    isOpenModalGame: boolean;
}

export const DefaultGameManagementState: GameManagementState = {
    games: [],
    answers: [],
    isOpenModalGame: true
}

const gameManagementSlice = createSlice({
    name: 'gameManagementState',
    initialState: DefaultGameManagementState,
    reducers: {
        setGames(state, action) {
            state.games = action.payload
        },
        setUpdatedPlayerScore(state, action) {
            
        },
        setAnswers(state, action) {
            state.answers = action.payload
        },
        isOpenModalGame(state, action) {
            state.isOpenModalGame = action.payload
        }
    },
})

export const gameManagementActions = gameManagementSlice.actions
export default gameManagementSlice.reducer