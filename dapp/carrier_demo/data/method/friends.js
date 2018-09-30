export default (dm)=>{
  return {
    async sendAddRequest(address, message){
      const carrier = dm.method.getCarrier();
      const rs = await carrier.addFriend(address, message);
      return rs;
    },
    async setLabel(friendId, label){
      const carrier = dm.method.getCarrier();
      await carrier.setLabel(friendId, label);
      const info = await carrier.getFriendInfo(friendId);
      const param = {};
      param[friendId] = info;
      dm.dispatch(dm.action.friends_all_set(param));
    }
  };
};