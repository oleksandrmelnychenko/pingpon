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
import Timer from 'react-compound-timer';

import {
    UserSwitchOutlined,
    LinkOutlined,
    ApiOutlined,
    FieldTimeOutlined
} from '@ant-design/icons';



import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { debounce } from "rxjs/operators";
import { GameStatus } from "./game.status";

export const GameView: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [hubConnection, setHubConnection] = useState<HubConnection>();

    const gameManagement = useSelector<IApplicationState, GameManagementState>(state => state.gameManagement);
    const access_token = useSelector<IApplicationState, string>(state => state.authentication.token);

    const gameModal = useSelector<IApplicationState, GameModel>(state => state.gameManagement.gameModal);



    const userNetId = useSelector<IApplicationState, string>(state => state.authentication.netUid);
    const authenticationUser = useSelector<IApplicationState, any>((state) => state.authentication)

    if (!hubConnection) {
        const hubConnect = new HubConnectionBuilder().withUrl(API.SERVER_URL + API.GAME_HUB, { accessTokenFactory: () => access_token }).build();

        try {

            hubConnect.on('GameUpdated', (response: any) => {
                dispatch(gameManagementActions.setGames(response));
            });

            hubConnect.on('ScoreUpdated', (response: any) => {
                dispatch(gameManagementActions.setUpdatedPlayerScore(response));
                dispatch(gameManagementActions.setGameModal(new GameModel()));
            });

            hubConnect.on('UpdateClientAnswers', (response: any) => {
                debugger
                dispatch(gameManagementActions.setAnswers(response));
            });

            hubConnect.start().then(() => {
                hubConnect.invoke('GetCreatedGames');
            }).catch(err => console.error(err.toString()));
        }
        catch (err) {
            alert(err);
            console.log('Error while establishing connection: ' + { err })
        }
        setHubConnection(hubConnect);
    }

    const onCreateGame = () => {
        hubConnection.invoke('CreateGame', 'Olek').catch(err => console.error(err.toString()));
    }

    const onJoinGame = (id) => {
        hubConnection.invoke('JoinGame', id).catch(err => console.error(err.toString()));
    }

    const renderPlayerTemplate = (player: PlayerModel, key: number) => {
        return (
            <div className="player__ITEM" key={key}>
                {player.name} <span className="score"> SCORE: {player.score} </span> <span className="line"> - </span>
            </div>
        )
    }

    const onStartGame = (gameModel) => {
        hubConnection.invoke('StartGame', gameModel.id).then(() => {
            dispatch(gameManagementActions.setGameModal(gameModel))
        }).catch(err => console.error(err.toString()));
    }

    const timeStoped = () => {
        debugger
    }

    const onChangeScore = (gameModel) => {
        hubConnection.invoke('UpdateClientAnswers').then(() => {
            dispatch(gameManagementActions.setGameModal(gameModel))
        });
    }

    const timeFinished = () => {
        dispatch(gameManagementActions.setTimeFinished(true));
    }

    const renderGameTemplate = (gameModel: GameModel, key: number) => {
        return (
            <>
                <div key={key} className={`card__mod_ITEM`}>
                    <h2 className="item__NAME">{gameModel.name}
                    </h2>
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
                        <li>
                            <div className="icon"><UserSwitchOutlined /></div>
                            <div className="value">
                                <b>STATUS:</b>
                                {gameModel.gameStatus === GameStatus.Completed ?
                                    "Completed" : gameModel.gameStatus === GameStatus.Playing ? "Playing" : "Waiting"}
                            </div>
                        </li>
                        <li className="controls">
                            <div className="icon"></div>
                            <div className="value">
                                <div className="p_right">
                                    {
                                        gameModel.players.length === 1 ?
                                            gameModel.hostUserNetId !== userNetId ?
                                                <Button type="link" size={"small"} disabled={false} onClick={() => onJoinGame(gameModel.id)}>Join game</Button> :
                                                "Waiting player for connection..." :
                                            gameModel.hostUserNetId === userNetId ?
                                                <Button type="link" size={"small"} disabled={false} onClick={() => onStartGame(gameModel)}>Start game</Button> :
                                                gameModel.gameStatus === GameStatus.Waiting ? "Waiting host to start..." : null
                                    }
                                    {
                                        gameModel.players.some(c => c.score > 0) ?
                                            gameModel.gameStatus === GameStatus.Playing ?
                                                <Button type="link" size={"small"} disabled={false} onClick={() => onChangeScore(gameModel)}>Change score</Button> : null : null
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
                className="game__MODAL"
                title={`Game: ${gameModal.name}`}
                centered
                destroyOnClose={true}
                visible={gameModal.id > 0}
                footer={false}
                onCancel={() => dispatch(gameManagementActions.setGameModal({}))}
            >
                <div className="answer__ITEMS">
                    {
                        gameManagement.answers.map((answer, key) =>
                            <div className="answer__ITEM" onClick={() => onIncreasedScore(gameModal.id, answer)} key={key}><span>{answer}</span></div>
                        )
                    }
                    <div className="answer__ITEM timer">
                        <span className="timer__TITLE">{gameManagement.timeFinished ? "Time finished" : "There is time left"} </span>
                        <div className="time__WRAPPER">
                            <Timer
                                initialTime={10000} 
                                timeToUpdate={1000}
                                direction="backward"
                                checkpoints={
                                    [
                                        {
                                            time: 0,
                                            callback: () => timeFinished()
                                        }
                                    ]
                                }
                            >
                                <Timer.Seconds />
                            </Timer>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}
