import React from 'react';

import './style.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import {render} from 'react-dom';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);