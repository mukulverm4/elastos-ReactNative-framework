import {_, moment, IHStyle, util} from './util';
import Carrier from './plugin/Carrier';



const init = (param)=>{
	param = _.extend({
		theme : 'default',
		themeStyle : {}
	}, param||{});


	IHStyle.build(_.merge({}, param.themeStyle));
};

const plugin = {
	Carrier
};

export default {
	_,
	moment,
	Style : IHStyle,
	util,
	init,
	plugin
};

const Style = IHStyle;
export {
	_,
	moment,
	init,
	Style,
	plugin
}