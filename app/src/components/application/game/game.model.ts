import { GameStatus } from "./game.status";
import { PlayerModel } from "./player.model";

export class GameModel {
    public id: number;

    public name: string;

    public hostUserNetId: string;

    public gameStatus: GameStatus;

    public players: PlayerModel[];
}