import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducer from './appReducer';




export default () => {
	const reducers = {
		app : appReducer
	};

	const middleware = [thunk];
	return createStore(
		combineReducers(reducers),
		applyMiddleware(...middleware),
	);
};