
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
      if(_carrier){
        try{
          await _carrier.close();
        }catch(e){}
      }

      _carrier = new Carrier('carrier_demo', F.buildCallback(dm));
      await _carrier.start();
    },
    async getCarrier(){
      if(!_carrier){
        throw 'carrier not started';
      }
      return _carrier;
    },




    me : me(dm)
  };
};