import {createContainer} from 'app/lib';
import HomeComponent from './HomeComponent';
import dm from 'app/data';

export default createContainer(HomeComponent, (state)=>{
  console.log(123, state.app.dapp_list);
  return {
    list : state.app.dapp_list
  };
}, ()=>{
  return {
    async getDAppList(){
      await dm.method.dapp.list();
    }
  };
});