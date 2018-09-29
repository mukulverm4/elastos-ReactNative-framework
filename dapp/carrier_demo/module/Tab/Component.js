import React from 'react';
import BasePage from 'app/module/common/BasePage';
import {_, Style, Cache} from 'CR';

import { Container, Content, Tab, Tabs, List, ListItem, Text} from 'native-base';

import ME_PAGE from './ME_PAGE';

const sy = Style.create({

});

export default class extends BasePage{
  ord_renderMain(){
    return (
      <Container>
        <Tabs tabBarPosition="bottom">
          <Tab heading="CHAT">
            
          </Tab>
          <Tab heading="FRIENDS">
            
          </Tab>
          <Tab heading="ME">
            <ME_PAGE />
          </Tab>
        </Tabs>
      </Container>
    );
  }

  ord_renderHeader(){
    return null;
  }

}