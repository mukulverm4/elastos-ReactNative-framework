import React from 'react';
import BasePage from '../common/BasePage';
import {Cache} from 'app/lib';
import {_, Style} from 'CR';

import { Container, Header, Content, Button, Text, Grid, Col, View} from 'native-base';

const sy = Style.create({
  add_box: {
    marginTop : 20
  }
})

export default class extends BasePage{
  ord_init(){
    this.state = {
      loading : true
    };
  }
  ord_renderMain(){
    return (
      <Content>
        {this.renderAppList()}

        {this.renderAddButton()}
      </Content>
    );
  }

  ord_checkLoading(){
    return this.state.loading;
  }

  ord_defineHeaderTitle(){
    return 'DApp List';
  }

  renderAppList(){
    const list = this.props.list;
    return (
      <Grid>
        {
          _.map(list, (item, i)=>{
            return (
              <Col key={i}><Text>{item}</Text></Col>
            )
          })
        }
      </Grid>
    );
  }

  renderAddButton(){
    return (
      <View padder style={sy.add_box}>
        <Button block success onPress={this.toInstallPage.bind(this)}>
          <Text> Add New DApp </Text>
        </Button>
      </View>
    );
  }

  toInstallPage(){
    Cache.method.call('goPath', 'install_app', 'modal');
  }

  async componentDidMount(){
    await this.props.getDAppList();
    this.setState({loading : false});
  }
}