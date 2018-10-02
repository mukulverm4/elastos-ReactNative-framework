import React from 'react';
import Parent from 'app/module/common/StackPage';
import {_, Style, Cache} from 'CR';

import { Container, View, Content, Button, Text, Form, Item, Label, Input, Toast} from 'native-base';

const sy = Style.create({
  btn: {},
});

export default class extends Parent{

  ord_init(){
    this.param = {
      address : '7c6j4w1Mc7XtabuQzb11axb8dNTbCbsSwyWLMbTsHAGEzfBYiTfz',
      message : 'hey, friend'
    };

    this.state = {
      loading : false
    };
  }

  ord_checkLoading(){
    return this.state.loading;
  }
  
  ord_renderMain(){
    return (
      <Content>
        {this.renderForm()}
        {this.renderButton()}
      </Content>
    );
  }

  renderForm(){
    return (
      <Form>
        {_.map(['address', 'message'], (key, i)=>{
          // this.param[key] = '';
          const p = {
            value : this.param[key],
            onChangeText : (t)=>{
              this.param[key] = t;
            }
          };
          return (
            <Item key={i} inlineLabel>
              <Label>{_.capitalize(key)}</Label>
              <Input {...p} />
            </Item>
          )
        })}
      </Form>
    );
  }

  renderButton(){
    return (
      <View style={{paddingLeft:15, paddingRight:15, marginTop:40}}>
        <Button style={sy.btn} success block onPress={this.addFriend.bind(this)}>
          <Text>Confirm</Text>
        </Button>
      </View>
    );
  }

  async addFriend(){
    const {address, message} = this.param;
    if(!address || !message){
      Toast.show({
        text : 'invalid address or message',
        type : 'danger'
      });
      return false;
    }

    this.setState({loading : true});

    try{
      await this.props.addFriend(this.param.address, this.param.message);
      this.setState({loading : false});
      Toast.show({
        text : 'send request success',
        type : 'success'
      });
      this.param = {};
    }catch(e){
      Toast.show({
        text : e,
        type : 'danger'
      });

      this.setState({loading : false});
    }
    
  }

  ord_defineHeaderTitle(){
    return 'EDIT PROFILE';
  }

}