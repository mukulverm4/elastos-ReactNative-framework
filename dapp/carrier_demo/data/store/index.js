import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {me, friends, message} from './appReducer';




export default () => {
	const reducers = {
		me,
		friends,
		message
	};

	const middleware = [thunk];
	return createStore(
		combineReducers(reducers),
		applyMiddleware(...middleware),
	);
};