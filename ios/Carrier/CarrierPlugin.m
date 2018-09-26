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
  [_carrier start:config completion:^(NSError *error) {
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

@end
