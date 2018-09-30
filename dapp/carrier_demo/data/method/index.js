
import {plugin} from 'CR';
const Carrier = plugin.Carrier;
import me from './me';

let _carrier = null;
const F = {
  buildCallback(dm){
    return {
      onReady : async ()=>{
        const address = await _carrier.getAddress();
        dm.dispatch(dm.action.me_set({
          address
        }));
      },
      onConnection : async (status)=>{
        const profile = await _carrier.getSelfInfo();
        if(status === '0'){
          dm.dispatch(dm.action.me_set({
            online : true,
            profile
          }));
        }
        else if(status === '1'){
          dm.dispatch(dm.action.me_set({
            online : false
          }));
        }
      },
      // onFriends : (list)=>{
        
      // },
      // onFriendMessage : (data)=>{
        
      // }
    };
  }
};
export default (dm)=>{
  return {
    async start(){
      // try{
      //   const tmp = new Carrier('carrier_demo', {});
      //   await tmp.close();
      // }catch(e){
      //   console.log(111, e);
      // }
      // TODO : when use CMD+R to refresh page in debug mode. how to restart carrier node?

      _carrier = new Carrier('carrier_demo', F.buildCallback(dm));
      await _carrier.start();
    },
    getCarrier(){
      if(!_carrier){
        throw 'carrier not started';
      }
      return _carrier;
    },




    me : me(dm)
  };
};