import React, {Component} from 'react';
import {Platform, StyleSheet,TextInput, View, Image, ActionSheetIOS, NativeModules} from 'react-native';
import { Container, Header, Content, Body, Title, List, ListItem, Button, Text } from 'native-base';

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
        <Container>
            <Header>
            <Body>
                <Title>Example List</Title>
            </Body>
            </Header>
            <Content>
                <List>
                    <ListItem onPress={this.clickItem.bind(this, 'a')}>
                        <Text>NativeBase example</Text>
                    </ListItem>
                    <ListItem>
                        <Text onPress={this.clickItem.bind(this, 'b')}>Http example</Text>
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

  async clickItem(type){
    let url;
    if(type === 'a'){
        url = this.getUrl('example');
    }
    else if(type === 'b'){
        url = this.getUrl('test');
    }

    await TEST.load(url);
  }

  getUrl(name){
    return `http://${this.state.ip}:3000/${name}.js?platform=ios&dev=true`;
  }

  
}

const styles = StyleSheet.create({
  
});
