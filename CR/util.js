import _ from 'lodash';
import moment from 'moment';
import IHStyle from 'react-native-extended-stylesheet';

// _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;


const util = {

};

const IHSTYLE = {};
_.set(IHStyle, 'set', (key, value)=>{
	IHSTYLE[key] = (value);
});
_.set(IHStyle, 'get', (key)=>{
	return IHSTYLE[key] || {};
});

export {
	_,
	moment,
	IHStyle,
	util
};