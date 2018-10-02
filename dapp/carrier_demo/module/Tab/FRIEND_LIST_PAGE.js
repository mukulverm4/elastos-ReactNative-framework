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
    return [
      (
        <Button key="2" transparent onPress={this.refreshList.bind(this)}>
          <Icon type="FontAwesome" name='refresh' style={{color:'#fff'}} />
        </Button>
      ),
      (
        <Button key="1" transparent onPress={this.addFriend.bind(this)}>
          <Icon type="FontAwesome" name='plus-circle' style={{color:'#fff'}} />
        </Button>
      )
    ];
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
    });
    const wait_list = _.values(this.props.wait_accept);
    return (
      <List>
        {wait_list.length>0 && (
          <ListItem itemHeader first>
            <Text>REQUEST</Text>
          </ListItem>
        )}
        
        {wait_list.length>0 && _.map(wait_list, (item, i)=>{
          const l = {};
          if(i === wait_list.length-1){
            l.style = {
              marginBottom : 20
            };
          }
          return (
            <ListItem key={i} {...l}>
              <Left>
                <Text>{item.name || 'NA'}</Text>
              </Left>
              <Right>
                <Button success small onPress={this.acceptFriend.bind(this, item.userId)}>
                  <Text>Accept</Text>
                </Button>
              </Right>
            </ListItem>
          )
        })}

        <ListItem itemHeader first>
          <Text>ONLINE</Text>
        </ListItem>
        {_.map(list_online, (item, i)=>{
          const label = item.label ? ` [${item.label}]` : null
          return (
            <ListItem onPress={this.gotoInfo.bind(this, item.userId)}  key={i}>
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
          <Text>OFFLINE</Text>
        </ListItem>
        {_.map(list_offline, (item, i)=>{
          const label = item.label ? ` [${item.label}]` : null
          return (
            <ListItem onPress={this.gotoInfo.bind(this, item.userId)} key={i}>
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
    this.goPath('add_friend');
  }

  gotoInfo(id){

    this.goPath('friend_info', 'push', {
      userId : id
    });
  }

  async refreshList(){
    await dm.method.friends.getFriendList();
  }

  async acceptFriend(userId){
    try{
      await dm.method.friends.acceptFriend(userId);
    }catch(e){
      Toast.show({
        text: e,
        type : 'danger'
      });
    }
  }
};

export default util.createContainer(Page, (state)=>{
  console.log(222, state.friends);
  return {
    friends : state.friends.all,
    wait_accept : state.friends.wait
  };
})