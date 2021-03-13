import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import storeProvider from './helpers/store.provider';
import configure from './store/store.config';
import { Router } from 'react-router-dom';
import Routing from './components/routing';
import { AppInit } from './helpers/app.init';
import './assets/scss/main.scss';
import 'antd/dist/antd.css';

const history = createBrowserHistory();
const initialState = (window as any).initialRedusState;
const store = configure(history, initialState);

storeProvider.init(store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Routing path='/' onEnter={AppInit(store)} />
        </Router>
    </Provider>,
    document.getElementById('root')
);