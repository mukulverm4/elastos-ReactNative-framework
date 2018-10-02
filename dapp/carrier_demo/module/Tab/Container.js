import {util} from 'CR';
import Component from './Component';
import dm from '../../data';

export default util.createContainer(Component, (state, props)=>{
  console.log(111, props.navigation)
  const unread_total = dm.method.message.getTotalUnreadNumber();
  return {
    unread_total
  };
}, ()=>{
  return {
    
  };
});