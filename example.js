import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';

import React from "react";
import Setup from "./src/boot/setup";

console.log(AppRegistry)
class App extends React.Component {
  render() {
    return <Setup />;
  }
}


AppRegistry.registerComponent(appName, () => App);