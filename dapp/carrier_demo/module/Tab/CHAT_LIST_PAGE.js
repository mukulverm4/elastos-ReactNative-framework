import React from 'react';
import BasePage from 'app/module/common/BasePage';
import {_, Style, Cache, util, moment} from 'CR';
import dm from '../../data';

import { Container, Content, Icon, List, ListItem, Text, Left, Body, Right, Button} from 'native-base';

const sy = Style.create({
  
});

const Page = class extends BasePage{
  ord_renderMain(){
    return (
      <Content>
        {this.renderList()}
      </Content>
    )
  }
  ord_defineHeaderTitle(){
    return 'CHAT LIST';
  }

  renderList(){
    const {unread} = this.props;
    return (
      <List>
        {
          _.map(unread, (item, i)=>{
            return this.renderEachList(item, i);
          })
        }
      </List>
    );
  }

  renderEachList(d, i){
    const info = this.props.getInfo(d.userId);
    const data = _.last(this.props.message[d.userId]);
    const name = info.name || 'NA';
    const time = moment(data.time).format('YYYY-MM-DD HH:mm:ss');
    return (
      <ListItem onPress={this.goto.bind(this, d.userId)} key={i} avatar>
        <Left>
          <Icon type="FontAwesome" name="user" />
        </Left>
        <Body>
          <Text>{name}</Text>
          <Text note>{data.content}</Text>
        </Body>
        <Right>
          <Text note>{time}</Text>
        </Right>
      </ListItem>
    );
  }

  goto(userId){
    this.props.setTargetUser(userId);
    Cache.method.call('goPath', 'message_view');
  }
  
}

export default util.createContainer(Page, (state)=>{
console.log(state.message);
  return {
    message : state.message.all,
    unread : state.message.unread,
    friends : state.friends.all
  }
}, ()=>{
  return {
    getInfo(userId=null){
      return dm.method.message.getUserInfo(userId);
    },
    setTargetUser(userId){
      dm.dispatch(dm.action.message_target(userId));
      
    }
  };
})
