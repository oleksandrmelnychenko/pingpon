import { Button, Modal, Pagination, Popconfirm, Space, Table } from "antd"
import { List } from "linq-typescript";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import API from "../../../constants/api.constants";
import * as routes from "../../../constants/routes.constants";
import { IApplicationState } from "../../../reducers/application.state";
import { AuthenticationState } from "../../../reducers/authentication.slice";
import { gameManagementActions, GameManagementState } from "../../../reducers/game.slice";
import { GameModel } from "./game.model";
import { PlayerModel } from "./player.model";

import {
    UserSwitchOutlined,
    LinkOutlined,
    ApiOutlined
} from '@ant-design/icons';



import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

export const GameView: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [hubConnection, setHubConnection] = useState<HubConnection>();

    const gameManagement = useSelector<IApplicationState, GameManagementState>(state => state.gameManagement);
    const access_token = useSelector<IApplicationState, string>(state => state.authentication.token);

    const isOpenModalGame = useSelector<IApplicationState, boolean>(state => state.gameManagement.isOpenModalGame);

    const userNetId = useSelector<IApplicationState, string>(state => state.authentication.netUid);
    useEffect(() => {

        const createHubConnection = async () => {
            const hubConnect = new HubConnectionBuilder().withUrl(API.SERVER_URL + API.GAME_HUB, { accessTokenFactory: () => access_token }).build();

            try {
                await hubConnect.start();
                hubConnect.on('GameUpdated', (response: any) => {
                    dispatch(gameManagementActions.setGames(response));
                });

                hubConnect.on('ScoreUpdated', (response: any) => {

                });

                hubConnect.on('UpdateClientAnswers', (response: any) => {
                    dispatch(gameManagementActions.setAnswers(response));
                });
            }
            catch (err) {
                alert(err);
                console.log('Error while establishing connection: ' + { err })
            }
            setHubConnection(hubConnect);
        }

        createHubConnection();
    }, []);

    const authenticationUser = useSelector<IApplicationState, any>((state) => state.authentication)

    const onCreateGame = async () => {
        debugger
        await hubConnection.invoke('CreateGame', 'Olek')
    }

    const onJoinGame = async (id) => {
        debugger
        await hubConnection.invoke('JoinGame', id)
    }

    const renderPlayerTemplate = (player: PlayerModel, key: number) => {
        return (
            <React.Fragment key={key}>
                {player.name}
            </React.Fragment>
        )
    }

    const onStartGame = async () => {
        dispatch(gameManagementActions.isOpenModalGame(true))
    }

    async function sendMessage(message: string): Promise<void> {
        try {
            if (hubConnection && message !== '') {
                await hubConnection.invoke('CreateGame', message)
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const renderGameTemplate = (gameModel: GameModel, key: number) => {
        return (
            <>
                <div key={key} className={`card__mod_ITEM`}>
                    <h2 className="item__NAME">{gameModel.name}</h2>
                    <ul>
                        <li>
                            <div className="icon"><ApiOutlined /></div>
                            <div className="value"><b>HostUserId:</b> {gameModel.hostUserNetId}</div>
                        </li>

                        <li>
                            <div className="icon"><LinkOutlined /></div>
                            <div className="value"><b>GameId:</b> {gameModel.id}</div>
                        </li>

                        <li>
                            <div className="icon"><UserSwitchOutlined /></div>
                            <div className="value">
                                <b>Players:</b>
                                {gameModel.players.map((p, k) => renderPlayerTemplate(p, k))}
                            </div>
                        </li>
                        <li className="controls">
                            <div className="icon"></div>
                            <div className="value">
                                <div className="p_right">
                                    {
                                        gameModel.players.length === 1 ?
                                            gameModel.hostUserNetId !== userNetId ?
                                                <Button type="link" size={"small"} disabled={false} onClick={() => onJoinGame(gameModel.id)}>Join game</Button> : "Waiting player for connection..." :
                                            <Button type="link" size={"small"} disabled={false} onClick={onStartGame}>Start game</Button>
                                    }
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>


            </>
        )
    }

    return (
        <div className="component__UserManagment__VIEW">
            <div className="allUsers__PAGE">

                <div className="view__CONTROLS">
                    <div className="controls__WRAPPER">
                        <div className="controls__LEFT">
                            <h2 className="page__TITLE">Game</h2>
                        </div>

                        <div className="controls__RIGHT">
                            <Button type="primary" onClick={onCreateGame}>Start Game</Button>
                        </div>
                    </div>
                </div>

                <div className="view__CONTENT fixed_pagination__CONTENT isScrollable">
                    <div className="gameList__WRAPPER">
                        {
                            gameManagement.games.map((v, i) => renderGameTemplate(v, i))
                        }
                    </div>
                </div>
            </div>

            <Modal
                title="Game"
                centered
                visible={!isOpenModalGame}
                footer={false}
                onCancel={() => dispatch(gameManagementActions.isOpenModalGame(false))}
            >
                <div className="answer__ITEMS">
                    <div className="answer__ITEM">
                        <span>10</span>
                    </div>
                    <div className="answer__ITEM">
                        <span>15</span>
                    </div>
                    <div className="answer__ITEM">
                        <span>20</span>
                    </div>
                </div>
                {
                    gameManagement.answers.map((answer, key) => <div className="answer__ITEM" key={key}>{answer}</div>)
                }
            </Modal>
        </div>

    )
}
