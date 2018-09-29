import {util} from 'CR';
import Component from './Component';
import dm from '../../data';

export default util.createContainer(Component, (state)=>{
  return {
    
  };
}, ()=>{
  return {
    async startCarrier(){
      await dm.method.start();
    }
  };
});