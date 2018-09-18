import React, {Component} from 'react';
import {Platform, StyleSheet,TextInput, View, Image, ActionSheetIOS, NativeModules} from 'react-native';
import { Container, Header, Content, Body, Title, List, ListItem, Button, Text } from 'native-base';

import Assets from './lib/native.asset';

const TEST = NativeModules.Test;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      ip : '192.168.1.15'
    };
  }
  render() {
    return (
        <Container>
            <Header>
            <Body>
                <Title>Example List</Title>
            </Body>
            </Header>
            <Content>
                <List>
                    <ListItem onPress={this.clickItem.bind(this, 'a')}>
                        <Text>NativeBase example1</Text>
                    </ListItem>
                    <ListItem>
                        <Text onPress={this.clickItem.bind(this, 'b')}>Http example</Text>
                    </ListItem>
                    <ListItem>
                        <Text onPress={this.clickItem1.bind(this)}>qqqqqq</Text>
                    </ListItem>
                </List>
            </Content>
        </Container>
    );
  }

  changeText(t){
    this.setState({
      ip: t
    })
  }

  clickItem1(){
    Assets.listResourcesInCache('DAPP', (list)=>{
        console.log(333, list);
    }, (err)=>{
        console.log(444, err);
    })
  }

  async clickItem(type){
      
      
    let url;
    if(type === 'a'){
        url = this.getUrl('example', async (path)=>{
            await TEST.load(path);
        });
    }
    else if(type === 'b'){
        url = this.getUrl('test', async (path)=>{
            await TEST.load(path);
        });
    }

    // await TEST.load(url);

  }

  getUrl(name, callback){
    const url = `http://${this.state.ip}:3000/${name}.js`;

    // const url = `http://${this.state.ip}:3000/3214173.png`;
    console.log(url);

    Assets.downloadResourceFromUrl(url, 'DAPP', (res)=>{
        console.log(222, res);

        // const path = res.filename;
        callback(res.path);

        
    }, (error)=>{
        console.log(111, error);
    });
  }



  
}

const styles = StyleSheet.create({
  
});
