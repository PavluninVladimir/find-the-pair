import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const initState = {}

const store = createStore(
    reducer,
    initState,
    applyMiddleware(thunk)
)

export default store;