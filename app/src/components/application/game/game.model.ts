import { PlayerModel } from "./player.model";

export class GameModel {
    public id: number;

    public name: string;

    public hostUserNetId: string;

    public players: PlayerModel[];
}