import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {me} from './appReducer';




export default () => {
	const reducers = {
		me
	};

	const middleware = [thunk];
	return createStore(
		combineReducers(reducers),
		applyMiddleware(...middleware),
	);
};