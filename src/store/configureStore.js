import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import reducer from '../reducers'


export function configureStore(initialState) {
    const finalCreateStore = compose(
        applyMiddleware(promise),
        //applyMiddleware(thunk, promise),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

    const store = finalCreateStore(reducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const store = configureStore();

export default store