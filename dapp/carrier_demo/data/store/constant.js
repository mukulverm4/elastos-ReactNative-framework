import {util} from 'CR';


export default {
  me : util.constants('dapp', 'demo', [
    'profile:set'
  ]),

  friends : util.constants('dapp', 'demo', [
    'all:set',
    'all:add',
    'all:remove',
    'all:update',
    'wait:set',
    'wait:remove'
  ])
};
