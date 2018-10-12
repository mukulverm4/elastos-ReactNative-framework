import React from 'react';
import StackPage from 'app/module/common/StackPage';
import {_, Style, Cache} from 'CR';
import KeyboardSpacer from 'react-native-keyboard-spacer';
// import {TextInput} from 'react-native';
import { Container, View, Content, Button, Text, Form, Item, Label, Input, Row, Col, Icon, Toast} from 'native-base';

const sy = Style.create({
  box : {
    // height: '100%'
    flex: 1
  },
  cont: {
    flex: 1
  },
  send_ared: {
    // width: '100%',
    height: 50,
    // position : 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#eee',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
  send_input: {
    backgroundColor: '#fff',
    borderColor: '#c9c9c9',
    borderRadius: 5,
    borderWidth: 1,
    color: '#333',
    paddingLeft: 5
  },

  col_l: {
    width : 50,
    // justifyContent : 'center',
    alignItems : 'center'
  },
  col_b: {
    backgroundColor: '#00ff00',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,
  },
  col_r: {
    width : 50,
    // justifyContent : 'center',
    alignItems : 'center'
  },
  bt: {
    width: 'auto'
  },
  bt1: {
    
    textAlign: 'right',
    width: 'auto'
  },
  row: {
    marginTop: 12
  }
});

export default class extends StackPage{

  ord_init(){
    this.state = {
      loading : false,
      text : ''
    };

    this.tmp = this.state.text;

  }

  ord_checkLoading(){
    return this.state.loading;
  }
  
  ord_renderMain(){
    return (
      <Container style={sy.box}>
        {this.renderList()}
        {this.renderSendArea()}
        <KeyboardSpacer />
      </Container>
    );
  }

  renderList(){
    const list = this.props.list;
    return (
      <Content style={sy.cont}>
        {
          _.map(list, (item, i)=>{
            return this.renderEachList(item, i);
          })
        }
        
        
      </Content>
    );
  }

  renderEachList(d, i){
    if(d.type === 'to'){
      return (
        <Row key={i} style={sy.row}>
          <Col style={sy.col_l}><Icon name="user-circle" type="FontAwesome" /></Col>
          <Col style={sy.col_b}><Text style={sy.bt}>{d.content}</Text></Col>
          <Col style={sy.col_r}></Col>
        </Row>
      );
    }
    else if(d.type === 'from'){
      return (
        <Row key={i} style={sy.row}>
          <Col style={sy.col_l}></Col>
          <Col style={sy.col_b}><Text style={sy.bt1}>{d.content}</Text></Col>
          <Col style={sy.col_r}><Icon name="user-circle" type="FontAwesome" /></Col>
        </Row>
      );
    }
  }

  renderSendArea(){
    const {info} = this.props;
    const p = {
      returnKeyType : 'send',
      // blurOnSubmit : true,
      value : this.state.text,
      // ref : (ref)=>{this.text = ref;},
      onSubmitEditing : async ()=>{
        
        try{
          const text = this.tmp;
          this.setState({text});
          await this.props.sendText(info.userId, text);
          this.tmp = '';
          this.setState({text : ''});

        }catch(e){
          Toast.show({
            text : e,
            type : 'danger'
          });
        }
      },
      onChangeText : (value)=>{
        // this.state.text = text;
        // value = value.replace(/[^\d/a-zA-Z]/g,'');
        this.tmp = value;
      }
    };
    return (
      <View style={sy.send_ared}>
        <Input {...p} style={sy.send_input} />
      </View>
    );
  }


  ord_defineHeaderTitle(){
    const name = this.props.info.name || 'NA';
    return name;
  }

  componentDidMount(){
  
    this.props.navigation.addListener('didBlur', (payload)=>{
      // remove target
      this.props.removeTarget();
    });

    this.props.navigation.addListener('didFocus', (payload)=>{
      // remove unread
      this.props.removeUnread(this.props.current);
    });
  }

  

}