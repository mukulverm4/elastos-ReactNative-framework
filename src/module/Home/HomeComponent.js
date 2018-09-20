import React from 'react';
import BasePage from '../common/BasePage';
import {Cache} from 'app/lib';

import { Container, Header, Content, Button, Text } from 'native-base';

export default class extends BasePage{
  ord_renderMain(){
    return (
      <Container>
        <Content>
          <Button onPress={this.click.bind(this)} light><Text> Light </Text></Button>
          <Button primary><Text> Primary </Text></Button>
          <Button success><Text> Success </Text></Button>
          <Button info><Text> Info </Text></Button>
          <Button warning><Text> Warning </Text></Button>
          <Button danger><Text> Danger </Text></Button>
          <Button dark><Text> Dark </Text></Button>
        </Content>
      </Container>
    );
  }

  ord_defineHeaderTitle(){
    return 'Home page';
  }

  click(){
    Cache.method.call('goPath', 'install_app', 'modal');
  }
}