import type from './constant';
import {_} from 'CR';


export default {
  me_set(param){
    const rs = {
      type : type.me['profile:set'],
    };
    if(param.profile){
      rs.profile = param.profile;
    }
    if(param.address){
      rs.address = param.address;
    }
    if(!_.isUndefined(param.online)){
      rs.online = param.online;
    }

    return rs;
  },

  friends_all_set(param){
    return {
      type : type.friends['all:set'],
      all : param
    };
  }

};