import Assets from 'app/native/native.asset';
import config from 'app/config';

export default (dm)=>{
  const F = {
    async list(){
      return new Promise((resolve, reject)=>{
        Assets.listResourcesInCache(config.DAPP_CACHE_DIR, (list)=>{
          dm.dispatch(dm.action.dapp_list(list));
          resolve(list);
        }, (err)=>{
          reject(err);
        });
      });
    }

    
  };

  return F;
};