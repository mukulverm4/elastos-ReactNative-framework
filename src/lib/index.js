import { connect } from 'react-redux';
import {_} from 'CR';

import Error from './Error';
import Log from './Log';
import Cache from './Cache';
import _uuid from 'uuid';

const constants = (moduleName, namespace, constants) => {
  return Object.freeze(
    constants.reduce((obj, constant) => {
      return {
        ...obj,
        [constant]: `${moduleName}/${namespace}/${constant}`
      };
    }, {})
  );
};

const createContainer = (container, mapState, mapDispatch)=>{
  return connect(mapState, mapDispatch)(container);
};


const uuid = ()=>{
  return _uuid.v4();
};

const Async = {
  async sleep(ms){
    return new Promise((resolve)=>{
      _.delay(()=>{
        resolve(true);
      }, ms);
    });
  },
  async method(func, pos=[false, true]){
    return new Promise((resolve, reject)=>{
      const n = _.findIndex(pos, (l)=>l===false);
      const y = _.findIndex(pos, (l)=>l===true);
      func((...args)=>{
        if(args[n]){
          reject(args[n]);
          return false;
        }
        resolve(args[y]);
      });
    });
  },
  async test(func, error=null){
    return new Promise((resolve, reject)=>{
      _.delay(()=>{
        const rs = func();
        if(error){
          reject(error);
        }
        else{
          resolve(rs);
        }
      }, 500);
    });
  }
};



export {
  constants,
  createContainer,
  uuid,
  Cache,
  Error,
  Log,
  Async
};