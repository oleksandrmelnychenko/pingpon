import { createSlice } from "@reduxjs/toolkit";
import { GameModel } from "../components/application/game/game.model"


export class GameManagementState {
    games: Array<GameModel>;
    answers: Array<number>;
    gameModal: GameModel;
}

export const DefaultGameManagementState: GameManagementState = {
    games: [],
    answers: [],
    gameModal: new GameModel()
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
        setGameModal(state, action) {
            state.gameModal = action.payload
        }
    },
})

export const gameManagementActions = gameManagementSlice.actions
export default gameManagementSlice.reducer