//
//  CarrierPlugin.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/26.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "CarrierPlugin.h"
#import <React/RCTLog.h>
#import "Carrier.h"

#define NULL_ERR [NSNull null]

//NSMutableDictionary *ALL_MAP = [NSMutableDictionary dictionary];

@interface CarrierPlugin(){
  
  NSMutableDictionary *ALL_MAP;
}
@end

@implementation CarrierPlugin
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[
           @"onIdle",
           @"onConnection",
           @"onReady",
           @"onSelfInfoChanged",
           @"onFriends",
           @"onFriendConnection",
           @"onFriendInfoChanged",
           @"onFriendPresence",
           @"onFriendRequest",
           @"onFriendAdded",
           @"onFriendRemoved",
           @"onFriendMessage",
           @"onFriendInviteRequest",
           @"onSessionRequest"
           ];
}

RCT_EXPORT_METHOD (test){
  RCTLog(@"this is native carrier test");
}

RCT_EXPORT_METHOD
(createObject : (NSDictionary *)config :(RCTResponseSenderBlock)callback){
  NSString *name = config[@"name"];
  if(ALL_MAP!=nil && [ALL_MAP objectForKey:name]){
    return;
  }
  
  Carrier *_carrier = [[Carrier alloc] init];
//  ELACarrier *elaCarrier = [_carrier getIntance];
  CarrierSendEvent sendEvent = [self carrierCallback:config];
  [_carrier start:config sendEvent:sendEvent completion:^(NSError *error) {
    if(error != nil){
      callback(@[error]);
      return;
    }
    if(ALL_MAP == nil){
      ALL_MAP = [NSMutableDictionary dictionary];
    }
    [ALL_MAP setObject:_carrier forKey:name];
    callback(@[NULL_ERR, @"ok"]);
  }];
}

RCT_EXPORT_METHOD
(getVersion : (RCTResponseSenderBlock)callback){
  NSString *version = [ELACarrier getVersion];
  callback(@[NULL_ERR, version]);
}

RCT_EXPORT_METHOD
(isValidAddress : (NSString *)address :(RCTResponseSenderBlock)callback){
  BOOL rs = [ELACarrier isValidAddress:address];
  callback(@[NULL_ERR, @(rs)]);
}

RCT_EXPORT_METHOD
(isValidId : (NSString *)Id :(RCTResponseSenderBlock)callback){
  BOOL rs = [ELACarrier isValidId:Id];
  callback(@[NULL_ERR, @(rs)]);
}

RCT_EXPORT_METHOD
(getAddress : (NSString *)cid :(RCTResponseSenderBlock)callback){
  if(![self checkCarrierInstance:cid cb:callback]){
    return;
  }
  
  ELACarrier *elaCarrier = [self getELACarrier:cid];
  NSString *address = [elaCarrier getAddress];
  callback(@[NULL_ERR, address]);
}

RCT_EXPORT_METHOD
(getNodeId : (NSString *)cid :(RCTResponseSenderBlock)callback){
  if(![self checkCarrierInstance:cid cb:callback]){
    return;
  }
  
  ELACarrier *elaCarrier = [self getELACarrier:cid];
  NSString *address = [elaCarrier getNodeId];
  callback(@[NULL_ERR, address]);
}

RCT_EXPORT_METHOD
(getUserId : (NSString *)cid :(RCTResponseSenderBlock)callback){
  if(![self checkCarrierInstance:cid cb:callback]){
    return;
  }
  
  ELACarrier *elaCarrier = [self getELACarrier:cid];
  NSString *address = [elaCarrier getUserId];
  callback(@[NULL_ERR, address]);
}

RCT_EXPORT_METHOD
(getSelfInfo : (NSString *)cid :(RCTResponseSenderBlock)callback){
  if(![self checkCarrierInstance:cid cb:callback]){
    return;
  }
  
  ELACarrier *elaCarrier = [self getELACarrier:cid];
  ELACarrierUserInfo *info = [elaCarrier getSelfUserInfo:nil];
  NSDictionary *rs = [self user_info:info];
  
  callback(@[NULL_ERR, rs]);
}
RCT_EXPORT_METHOD
(setSelfInfo : (NSString *)cid :(NSDictionary *)info :(RCTResponseSenderBlock)callback){
  if(![self checkCarrierInstance:cid cb:callback]){
    return;
  }
  ELACarrier *elaCarrier = [self getELACarrier:cid];
  ELACarrierUserInfo *f = [elaCarrier getSelfUserInfo:nil];
  f.name = info[@"name"];
  f.briefDescription = info[@"description"];
  f.gender = info[@"gender"];
  f.region = info[@"region"];
  f.phone = info[@"phone"];
  f.email = info[@"email"];
  
  [elaCarrier setSelfUserInfo:f error:nil];
  callback(@[NULL_ERR, @"ok"]);
}

-(CarrierSendEvent) carrierCallback : (NSDictionary *)config{
  __weak __typeof(self) weakSelf = self;
  CarrierSendEvent sendEvent = ^(ELACarrier *carrier, NSDictionary* param){
    NSString *type = param[@"type"];
    NSDictionary *data = param[@"data"];
    if([type isEqualToString:@"carrierDidBecomeReady"]){
      [weakSelf carrierDidBecomeReady:data];
    }
    else if([type isEqualToString:@"connectionStatusDidChange"]){
      [weakSelf connectionStatusDidChange:data];
    }
    else if([type isEqualToString:@"selfUserInfoDidChange"]){
      [weakSelf selfUserInfoDidChange:data];
    }

  };
  
  return sendEvent;
}

-(void) carrierDidBecomeReady: (NSDictionary *)param{
  [self sendEventWithName:@"onReady" body:@[@"ok"]];
}
-(void) connectionStatusDidChange: (NSDictionary *)param{
  [self sendEventWithName:@"onConnection" body:@[param[@"newStatus"]]];
}
-(void) selfUserInfoDidChange: (NSDictionary *)param{
  NSDictionary *info = [self user_info:param[@"userInfo"]];
  [self sendEventWithName:@"onSelfInfoChanged" body:@[info]];
}

-(NSString *) createError: (NSString *)errorString{
  return errorString;
}

-(BOOL) checkCarrierInstance: (NSString *)cid cb:(RCTResponseSenderBlock)callback{
  ELACarrier *elaCarrier = [self getELACarrier:cid];
  if(!elaCarrier){
    callback(@[[self createError:@"carrier instance not exist"]]);
    return NO;
  }
  return YES;
}

-(Carrier *) getCarrier: (NSString *)cid{
  Carrier *rs = [ALL_MAP objectForKey:cid];
  return rs;
}
-(ELACarrier *) getELACarrier: (NSString *)cid{
  Carrier *carrier = [ALL_MAP objectForKey:cid];
  return [carrier getIntance];
}

-(NSDictionary *) user_info: (ELACarrierUserInfo *)info{
  NSDictionary *dic = @{
                        @"name" : info.name,
                        @"description" : info.briefDescription,
                        @"userId" : info.userId,
                        @"gender" : info.gender,
                        @"region" : info.region,
                        @"email" : info.email,
                        @"phone" : info.phone,
                        @"hasAvatar" : info.hasAvatar ? @YES : @NO
                        };
  return dic;
}

@end
