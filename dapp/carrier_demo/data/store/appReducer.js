import {_} from 'CR';
import type from './constant';

const DEFAULT = {
  me : {
    profile : {},
    address : '',
    online : false
  }
};

export const me = (state=DEFAULT.me, action={})=>{
  switch(action.type){
    case type.me['profile:set']:
      return _.merge({}, state, {
        profile : action.profile,
        address : action.address,
        online : action.online
      })
  }

  return state;
};