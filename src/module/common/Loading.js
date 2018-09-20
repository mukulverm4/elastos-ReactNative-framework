import React from 'react';
import {Spinner, Container} from 'native-base';

export default class extends React.Component{
  render(){
    const p = this._defineMainProperty();
    return (
      <Container>
        <Spinner color={p.color} />
      </Container>
    );
  }

  _defineMainProperty(){
    return {
      color : this.props.color || 'green',
    };
  }
}