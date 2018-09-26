import {NativeModules} from 'react-native';
import _ from 'lodash';

const NativeCarrier = NativeModules.Carrier;

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
  constructor(){
    this.callbacks = {};
  }

  static getVersion(){
    return exec('getVersion');
  }

  static isValidAddress(address){
    return exec('isValidAddress', address);
  }

  

  

  test(){
    NativeCarrier.test();
  }
};


export default Carrier;