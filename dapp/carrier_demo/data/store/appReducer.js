import {_} from 'CR';
import type from './constant';

const DEFAULT = {
  me : {
    profile : {},
    address : '',
    online : false
  },

  friends : {
    all : {}
  }
};

export const me = (state=DEFAULT.me, action={})=>{
  switch(action.type){
    case type.me['profile:set']:
      const tmp = _.merge({}, state, {
        profile : action.profile,
        address : action.address,
        online : action.online
      });
      return {
        ...state,
        ...tmp
      };
  }

  return state;
};

export const friends = (state=DEFAULT.friends, action={})=>{
  let tmp;
  switch(action.type){
    case type.friends['all:set']:
      tmp = _.merge({}, state.all, action.all);
      return {
        ...state,
        all : {
          ...tmp
        }
      };
    case type.friends['all:add']:
    case type.friends['all:update']:
      tmp = {};
      tmp[action.param.userId] = action.param.userId;
      return {
        ...state,
        all : {
          ...state.all,
          ...tmp
        }
      };
    case type.friends['all:remove']:
      const userId = action.param;
      delete state.all[userId];
      return {
        ...state,
        all : {
          ...state.all
        }
      }
  }

  return state;
}