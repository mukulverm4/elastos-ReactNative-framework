import {_, moment, IHStyle, util} from './util';
import Cache from './Cache';
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
	Cache,
	Style : IHStyle,
	util,
	init,
	plugin
};

const Style = IHStyle;
export {
	_,
	moment,
	Cache,
	init,
	util,
	Style,
	plugin
}