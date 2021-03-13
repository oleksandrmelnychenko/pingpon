import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { epics } from '../services/root.epics';
import { reducers } from "../reducers/root.reducer";
import { configureStore } from "@reduxjs/toolkit";
import refreshTokenMiddleware from "../helpers/refresh.token.middleware";

export default function configure(history, preloadedState) {
    const simpleRouter = routerMiddleware(history);
    const epicMiddleware = createEpicMiddleware();

    let middleware;
    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger({
            collapsed: true,
        });

        middleware = [thunkMiddleware, simpleRouter, refreshTokenMiddleware, logger, epicMiddleware];
    } else {
        middleware = [thunkMiddleware, simpleRouter, refreshTokenMiddleware, epicMiddleware];
    }

    const middlewareEnhancer = applyMiddleware(...middleware);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = configureStore({
        reducer: reducers,
        middleware,
        devTools: process.env.NODE_ENV !== 'production',
    });

    if (module.hot) {

        module.hot.accept('../reducers/root.reducer', () => {
            const nextRootEpic = require('../services/root.epics').epics;
            const nextRootReducer = require('../reducers/root.reducer').reducers;

            epicMiddleware.replaceEpic(epics);
            store.replaceReducer(nextRootReducer);
        })
    }

    epicMiddleware.run(epics);

    return store
}
