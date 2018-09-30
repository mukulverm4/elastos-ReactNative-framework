import HomePage from '../module/Home/Container';
import TabPage from '../module/Tab/Container';
import EditProfilePage from '../module/EditProfile/Container';
import AddFriendPage from '../module/AddFriend/Container';
import FriendInfoPage from '../module/FriendInfo/Container';

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
	add_friend : {
		path : 'add_friend',
		screen : AddFriendPage
	},
	friend_info : {
		path : 'friend_info',
		screen : FriendInfoPage
	},





	init : 'home'
};