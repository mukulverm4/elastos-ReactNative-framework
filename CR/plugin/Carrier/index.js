import {NativeModules} from 'react-native';
import _ from 'lodash';
import config from './config';

const NativeCarrier = NativeModules.CarrierPlugin;

/*
 * This is Elastos Carrier plugin
 * 
 */

const CARRIER_CB_NAMES = [
  "onIdle",
  "onConnection",
  "onReady",
  "onSelfInfoChanged",
  "onFriends",
  "onFriendConnection",
  "onFriendInfoChanged",
  "onFriendPresence",
  "onFriendRequest",
  "onFriendAdded",
  "onFriendRemoved",
  "onFriendMessage",
  "onFriendInviteRequest",
  "onSessionRequest",
];

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

  constructor(id){
    this.id = id;

    this.config = {
      name : this.id,
      udp_enabled : true,
      bootstraps : config.bootstraps
    };

    this.callbacks = {};
  }

  start(){
    return exec('createObject', this.config);
  }

  getAddress(){
    return exec('getAddress', this.id);
  }

  

  

  

  test(){
    NativeCarrier.test();
  }
};


export default Carrier;