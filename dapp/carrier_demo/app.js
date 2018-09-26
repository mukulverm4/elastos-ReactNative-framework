import React, {Component} from 'react';

import {AppRegistry, StyleSheet, View, Image, ActionSheetIOS, NativeModules} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';

import dapp from '../shared/dapp';

import {plugin} from 'CR';
const Carrier = plugin.Carrier;


class App extends Component{
  constructor(){
    super();
    this.state = {
      log : []
    };

    this.carrier = null;
  }
  render() {
    return (
      <Content style={styles.container}>
        <Text style={styles.log}>{this.state.log.join('\n')}</Text>

        <Button style={styles.btn} success block onPress={this.testFn.bind(this, 'getVersion')}>
          <Text>getVersion</Text>
        </Button>
        <Button style={styles.btn} success block onPress={this.testFn.bind(this, 'isValidAddress')}>
          <Text>isValidAddress</Text>
        </Button>
        
      </Content>
    );
  }

  async testFn(name){
    let rs = null;
    
    switch(name){
      case 'getVersion':
        rs = await Carrier.getVersion();
        break;
      case 'isValidAddress':
        rs = await Carrier.isValidAddress('aaabbb');
        break;
    }

    if(!_.isNull(rs)){
      this.setLog(rs.toString());
    }
  }

  setLog(log){
    const mlog = this.state.log;
    mlog.unshift(log)
    this.setState({log : mlog});
  }

  componentDidMount(){
    this.carrier = new Carrier;
    this.setLog('carrier init success');
  }
    
      
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 50
    },
    btn : {
      marginTop: 12
    },
    log : {
      backgroundColor: '#000',
      color: 'green',
      fontSize:14, 
      width:"100%"
    }
  });

dapp.start(App);