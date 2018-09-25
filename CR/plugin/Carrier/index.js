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

const Carrier = class {
  constructor(){
    this.callbacks = {};

  }

  static getVersion(){
    // TODO
  }

  static isValidAddress(address){
    // TODO
    return true;
  }

  

  

  test(){
    NativeCarrier.test();
  }
};


export default Carrier;