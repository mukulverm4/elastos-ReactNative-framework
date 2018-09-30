import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {me, friends} from './appReducer';




export default () => {
	const reducers = {
		me,
		friends
	};

	const middleware = [thunk];
	return createStore(
		combineReducers(reducers),
		applyMiddleware(...middleware),
	);
};