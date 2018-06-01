import 'core-js/es6'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
// import ruRU from 'antd/lib/locale-provider/ru_RU'
import promise from 'redux-promise'
import reducer from './reducers'
import './style/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
    reducer,
    applyMiddleware(promise)
);

ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={enUS}>
            <App />
        </LocaleProvider>
    </Provider>,
    document.getElementById('app')
);

registerServiceWorker();
