import React from 'react';
import BasePage from 'app/module/common/BasePage';
import {_, Style, Cache, util} from 'CR';

import { Container, Content, Icon, List, ListItem, Text, Left, Body, Right, Button} from 'native-base';

const sy = Style.create({
  t1 : {
    paddingLeft : 15,
    paddingRight : 15,
    marginTop : 10,
    marginBottom : 10,
    fontSize : 14
  }
});

const Page = class extends BasePage{
  ord_renderMain(){
    return (
      <Content>
        <List>
          <ListItem itemHeader first>
            <Text>PROFILE</Text>
          </ListItem>
          {this.renderProfileInfo()}
          <ListItem itemHeader>
            <Text>BASE</Text>
          </ListItem>
          {this.renderBaseInfo()}
        </List>
      </Content>
    )
  }
  ord_defineHeaderTitle(){
    return 'PROFILE';
  }

  ord_renderHeaderRight(){
    return (
      <Button transparent onPress={this.toEditPage.bind(this)}>
        {/* <Icon type="FontAwesome" name='edit' /> */}
        <Text>EDIT</Text>
      </Button>
    );
  }

  toEditPage(){
    this.goPath('profile_edit')
  }

  renderProfileInfo(){
    const profile = this.props.me.profile;
    const list = [
      {key : 'Name', value : profile.name},
      {key : 'Email', value : profile.email},
      {key : 'Description', value : profile.description},
      {key : 'Phone', value : profile.phone},
      {key : 'Gender', value : profile.gender},
      {key : 'Region', value : profile.region}
    ];
    return _.map(list, (item, i)=>{
      const l = {
        last : i === list.length-1,
      };
      if(item.click){
        l.onPress = item.click;
      }
      return (
        <ListItem key={i} {...l}>
          <Left>
            <Text>{item.key}</Text>
          </Left>
          <Text>{item.value}</Text>
        </ListItem>
      );
    });
  }

  renderBaseInfo(){
    const address = this.props.me.address;
    const online = this.props.me.online;
    const profile = this.props.me.profile;

    const list = [
      {key : 'Online', value : online ? 'YES' : 'NO'},
      {
        key : 'User ID', value : profile.userId ? profile.userId.substr(0, 15) : '',
        click : profile.userId ? ()=>{
          alert(profile.userId);
        } : null
      },
      {
        key : 'Address', 
        value : address ? address.substr(0, 15) : '',
        click : address ? ()=>{
          alert(address);
        } : null
      },
      
    ];
    return _.map(list, (item, i)=>{
      const l = {
        last : i === list.length-1,
      };
      if(item.click){
        l.onPress = item.click;
      }
      return (
        <ListItem key={i} {...l}>
          <Left>
            <Text>{item.key}</Text>
          </Left>
          <Text>{item.value}</Text>
          {item.click && (
            <Right><Icon name="arrow-forward" /></Right>
          )}
        </ListItem>
      );
    });
  }
}

export default util.createContainer(Page, (state)=>{
  console.log(state);
  return {
    me : state.me
  }
})
