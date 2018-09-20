import {_, moment, IHStyle, util} from './util';



const init = (param)=>{
	param = _.extend({
		theme : 'default',
		themeStyle : {}
	}, param||{});


	IHStyle.build(_.merge({}, param.themeStyle));
};

export default {
	_,
	moment,
	Style : IHStyle,
	util,
	init,
};

export {
	_,
	moment,
	init
}