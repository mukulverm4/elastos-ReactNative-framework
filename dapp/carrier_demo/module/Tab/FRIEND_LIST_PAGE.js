import React from 'react';
import BasePage from 'app/module/common/BasePage';
import {_, Style, Cache, util} from 'CR';
import { Container, Content, Icon, List, ListItem, Text, Left, Body, Right, Button, Toast} from 'native-base';
import dm from '../../data';

const sy = Style.create({

});

const Page = class extends BasePage{
  ord_defineHeaderTitle(){
    return 'FRIEND LIST'
  }

  ord_renderHeaderRight(){
    return (
      <Button transparent onPress={this.addFriend.bind(this)}>
        <Icon type="FontAwesome" name='plus-circle' style={{color:'#fff'}} />
        {/* <Text>ADD</Text> */}
      </Button>
    );
  }

  ord_renderMain(){
    return (
      <Content>
        {this.renderFriendList()}
      </Content>
    );
  }

  renderFriendList(){
    const list = _.values(this.props.friends);
    const list_online = _.filter(list, (item)=>{
      return item.status === '0';
    });
    const list_offline = _.filter(list, (item)=>{
      return item.status === '1';
    })
    return (
      <List>
        <ListItem itemHeader first>
          <Text>Online</Text>
        </ListItem>
        {_.map(list_online, (item, i)=>{
          const label = item.label ? ` [${item.label}]` : null
          return (
            <ListItem key={i}>
              <Left>
                <Text>{item.name || 'NA'}{label}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          )
        })}

        <ListItem itemHeader last>
          <Text>Offline</Text>
        </ListItem>
        {_.map(list_offline, (item, i)=>{
          const label = item.label ? ` [${item.label}]` : null
          return (
            <ListItem key={i}>
              <Left>
                <Text>{item.name || 'NA'}{label}</Text>
              </Left>
              <Right>
                {/* <Icon name="arrow-forward" /> */}
              </Right>
            </ListItem>
          )
        })}
      </List>
    );
  }

  addFriend(){
    Cache.method.call('goPath', 'add_friend');
  }
};

export default util.createContainer(Page, (state)=>{
  console.log(222, state.friends.all);
  return {
    friends : state.friends.all
  };
})