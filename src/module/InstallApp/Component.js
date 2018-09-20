import React from 'react';
import ModalPage from '../common/ModalPage';
import { Container, Header, Content, Button, Text } from 'native-base';

export default class extends ModalPage{
  ord_renderMain(){
    return (
      <Container>
        <Content>
          <Button light><Text> Light </Text></Button>
          
        </Content>
      </Container>
    );
  }

  ord_defineHeaderTitle(){
    return 'Install page';
  }
}