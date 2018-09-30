import React from 'react';
import {Icon, Button} from 'native-base';
import {Cache} from 'app/lib';
import BasePage from './BasePage';

export default class extends BasePage{

  ord_renderHeaderLeft(){
    return (
      <Button transparent onPress={this.goBack.bind(this)}>
        <Icon type="FontAwesome" name='angle-left' />
      </Button>
    );
  }

  goBack(){
    Cache.method.call('goPath', null, 'back');
  }
};