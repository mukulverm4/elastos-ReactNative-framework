import HomePage from '../module/Home/Container';
import TabPage from '../module/Tab/Container';

export default {

	home : {
		path : 'home',
		screen : HomePage,
		statusBar : {
			show : true
		},
		navigationOptions : {
			gesturesEnabled : false
		}
	},
	tab: {
		path : 'tab',
		screen : TabPage
	},




	init : 'home'
};