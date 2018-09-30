import HomePage from '../module/Home/Container';
import TabPage from '../module/Tab/Container';
import EditProfilePage from '../module/EditProfile/Container';

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
	profile_edit : {
		path : 'profile_edit',
		screen : EditProfilePage
	},




	init : 'home'
};