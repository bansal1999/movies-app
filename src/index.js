import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';


//function logger (obj, next, action)         {curried form}
//logger(obj)(next)(action)       {internally react works somewhat like this }
const logger = function({dispatch, getState}) {
    return function (next) {
        return function (action) {

            if(typeof action !== 'function'){
                //middleware code
                console.log('ACTION_TYPE = ', action.type);
            }
            next(action);  
        }
    }
}

//cleaner way to write middleware

// const logger = ({dispatch, getState}) => (next) => (action) => {

//     //logger code
//     console.log('ACTION_TYPE = ', action.type);
//     next(action);  
// }

const store =  createStore( rootReducer, applyMiddleware(logger, thunk));
console.log('store', store);

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);
 