export default (dm)=>{
  return {
    async sendAddRequest(address, message){
      const carrier = dm.method.getCarrier();
      const rs = await carrier.addFriend(address, message);
      return rs;
    }
  };
};