import React, {Component} from 'react';
import {Platform, StyleSheet,TextInput, View, Image, ActionSheetIOS, NativeModules} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';

const TEST = NativeModules.Test;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      ip : '192.168.1.103'
    };
  }
  render() {
    return (
      <View style={styles.container}>
        

        <Text style={styles.welcome}>Index Page</Text>

        <Text style={styles.instructions}>please input your file server ip</Text>
        <TextInput value={this.state.ip} style={{borderWidth:1, padding: 5}} onChangeText={this.changeText.bind(this)}></TextInput>

        <Text style={styles.instructions}>click below to open a new remote page</Text> 
        <Text style={styles.instructions}>{this.getUrl()}</Text>

        
        <Button onPress={this.click.bind(this)}><Text>Open test page</Text></Button>
        
      </View>
    );
  }

  changeText(t){
    this.setState({
      ip: t
    })
  }

  getUrl(){
    return `http://${this.state.ip}:3000/abc.js?platform=ios&dev=true`
  }

  async click(){
    await TEST.test(this.getUrl());
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 10,
    
  },
});
