import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const logger = store => next => action => {
    console.log('previous state', store.getState());
    console.log('dispatching', action);
    next(action);
    console.log('next state', store.getState());
};
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;