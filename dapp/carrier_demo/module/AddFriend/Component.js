import React from 'react';
import Parent from 'app/module/common/StackPage';
import ModalPage from 'app/module/common/ModalPage';
import {_, Style, Cache, plugin} from 'CR';

import { Container, View, Content, Button, Text, Form, Item, Label, Input, Toast} from 'native-base';

const sy = Style.create({
  btn: {},
});

const RNCamera = plugin.RNCamera;
const ScanPage = class extends ModalPage{
  ord_init(){
    this.camera = null;
  }
  ord_defineHeaderTitle(){
    return 'SCAN'
  }
  ord_renderMain(){
    const p = {
      ref : (ref)=>{this.camera = ref;},
      style : {},
      type : RNCamera.Constants.Type.back,
      flashMode : RNCamera.Constants.FlashMode.auto,
      permissionDialogTitle : 'Permission to use camera',
      permissionDialogMessage : 'We need your permission to use your camera phone',
      onBarCodeRead : (barcode)=>{
        console.log(111, barcode);
      },
      barCodeTypes : [RNCamera.Constants.BarCodeType.qr]
    };
    return (
      <Container>
        <RNCamera {...p} />
        {/* <View style={{paddingLeft:15, paddingRight:15, marginTop:40}}>
          <Button style={sy.btn} success block onPress={this.scan.bind(this)}>
            <Text>Confirm</Text>
          </Button>
        </View> */}
      </Container>
    );
  }

  async scan(){

  }
};

export default class extends Parent{

  ord_init(){
    this.param = {
      address : '',
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

  ord_renderHeaderRight(){
    return (
      <Button key="1" transparent onPress={this.openScanView.bind(this)}>
        {/* <Text style={{color:'#fff'}}>SCAN</Text> */}
      </Button>
    );
  }

  openScanView(){
    Cache.method.call('modal', 'open', {
      child : ScanPage
    });
  }

}