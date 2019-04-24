import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers';
import Api from './Api';
export default createStore(reducers, applyMiddleware(thunk, logger))