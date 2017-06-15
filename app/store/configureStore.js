import {createStore} from 'redux';
import rootReducers from '../reducers/reducers_index';

export default function configureStore(initialState) {
    let store = createStore(rootReducers, initialState,
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined);
    return store;
}