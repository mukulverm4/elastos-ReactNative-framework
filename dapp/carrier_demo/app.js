import React from 'react';
import {StatusBar} from 'react-native';
import {StyleProvider, Container, Tabs, Tab, Root} from 'native-base';
import { Provider } from 'react-redux';
import { addNavigationHelpers, NavigationActions, StackNavigator } from 'react-navigation';
import {_, Cache} from 'CR';
import './boot';

import router from './config/router';
import dm from './data';
import dapp from '../shared/dapp';

import GlobalModal from 'app/module/common/GlobalModal';

const r = _.omit(router, ['init']);
const CardStackNavigator = StackNavigator(r, {
	headerMode : 'none',

});


const App = class extends React.Component{
	constructor(p){
		super(p);

		this.state = {
			page : CardStackNavigator.router.getStateForAction(CardStackNavigator.router.getActionForPathAndParams(router.init))
		};

		Cache.method.register('goPath', this.goPath.bind(this));
	}
	render(){
		const content = (
			<CardStackNavigator
				navigation={addNavigationHelpers({
					state : this.state.page,
					goPath : (p)=>{this.goPath(p);},
					dispatch : (p)=>{this.goPath(p);}
				})}
			/>
		);
		return (
			<Provider store={dm.store}>
				<Root>
					<StatusBar
						backgroundColor="blue"
						barStyle="default"
					/>
	
					{content}
					<GlobalModal />
				</Root>
				
			</Provider>
		);
	}

	goPath(name, type='navigate', opts={}){
		let rs = null;
		if(!name || _.isString(name)){
			let config = {};
			if(type === 'back'){
				config = {
					actions : [NavigationActions.back({ routeName: name})]
				};
			}
			else if(type === 'reset'){
				config = {
					index : opts.index || 0,
					actions : opts.actions || [NavigationActions.navigate({ routeName: name})]
				};
			}
			else if(type === 'modal'){
				//show modal
				config = router[name];
				if(!config){
					throw ('goPath modal error : '+name);
				}
				Cache.method.apply('modal', ['open', {
					child : config.screen
				}]);
				return false;
			}
			else{
				config = {
					routeName : name,
					params : opts.params || {},
					action : opts.action || null
				};
			}

			rs = CardStackNavigator.router.getStateForAction(NavigationActions[type](config), this.state.page);
		}
		else if(_.isObject(name)){
			rs = CardStackNavigator.router.getStateForAction(name, this.state.page);
		}
		else{
			throw (`${name} is not valid`);
		}

		const statusBar = router[name] ? router[name].statusBar : null;
		if(statusBar){
			if(statusBar.show){
				StatusBar.setHidden(false);
			}
			else{
				StatusBar.setHidden(true);
			}
		}


		this.setState({page : rs});
	}
};

dapp.start(App);