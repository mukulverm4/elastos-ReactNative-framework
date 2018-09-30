import React from 'react';
import BasePage from 'app/module/common/BasePage';
import {_, Style, Cache} from 'CR';

import { Container, Content, View, Tab, Tabs, List, ListItem, Text, Badge} from 'native-base';

import ME_PAGE from './ME_PAGE';
import FRIEND_LIST_PAGE from './FRIEND_LIST_PAGE';
import CHAT_LIST_PAGE from './CHAT_LIST_PAGE';

const sy = Style.create({

});

export default class extends BasePage{
  ord_renderMain(){
    return (
      <Container>
        <Tabs tabBarPosition="bottom">
          <Tab heading={this.getChatHeader()}>
            <CHAT_LIST_PAGE />
          </Tab>
          <Tab heading="FRIENDS">
            <FRIEND_LIST_PAGE />
          </Tab>
          <Tab heading="ME">
            <ME_PAGE />
          </Tab>
        </Tabs>
      </Container>
    );
  }

  getChatHeader(){
    const {unread_total} = this.props;
    let num = null;
    if(unread_total > 0){
      num = unread_total;
    }
    if(num > 99){
      num = '99+';
    }
    return (
      <View>
        <Text>CHAT</Text>
        {num && (
          <Badge>
            <Text>{num}</Text>
          </Badge>
        )}
      </View>
    );
  }

  ord_renderHeader(){
    return null;
  }

}