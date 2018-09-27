import {NativeModules, NativeEventEmitter} from 'react-native';
import _ from 'lodash';
import config from './config';

const NativeCarrier = NativeModules.CarrierPlugin;
const Listener = new NativeEventEmitter(NativeCarrier);

/*
 * This is Elastos Carrier plugin
 * 
 */


const STREAM_CB_NAMES = [
  "onStateChanged",
  "onStreamData",
  "onChannelOpen",
  "onChannelOpened",
  "onChannelClose",
  "onChannelData",
  "onChannelPending",
  "onChannelResume",
];

const exec = async (fnName, ...args)=>{
  return new Promise((resolve, reject)=>{
    NativeCarrier[fnName](...args, (err, rs)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(rs);
      }
    });
  });
};

const Carrier = class {
  static getVersion(){
    return exec('getVersion');
  }

  static isValidAddress(address){
    return exec('isValidAddress', address);
  }

  constructor(id, callbacks){
    this.id = id;

    this.config = {
      name : this.id,
      udp_enabled : true,
      bootstraps : config.bootstraps
    };

    this.buildCallbacks(callbacks);
  }

  buildCallbacks(callbacks){
    const _def = _.map(config.CARRIER_CB_NAMES, (name)=>{
      const fn = ()=>{
        console.log(`callback [${name}] fired`);
      };
      const tmp = {};
      tmp[name] = fn;
      return tmp;
    });

    const cb = _.extend(_def, callbacks || {});
    _.each(cb, (item)=>{
      const name = _.keys(item)[0];
      const fn = _.values(item)[0];
      Listener.addListener(name, (data)=>{
        console.log(123, data);
        fn(data);
      });
    });
  }

  start(){
    return exec('createObject', this.config);
  }

  getAddress(){
    return exec('getAddress', this.id);
  }

  getSelfInfo(){
    return exec('getSelfInfo', this.id);
  }
  setSelfInfo(info){
    const user_info = _.extend({
      name : '',
      description : '',
      email : '',
      phone : '',
      gender : '',
      region : ''
    }, info);
    return exec('setSelfInfo', this.id, user_info);
  }

  

  

  

  test(){
    NativeCarrier.test();
  }
};


export default Carrier;