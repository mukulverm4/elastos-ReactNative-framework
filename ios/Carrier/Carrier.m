//
//  Carrier.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/25.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Carrier.h"
#import <React/RCTLog.h>

#define NULL_ERR [NSNull null]

@implementation Carrier
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD (test){
  RCTLog(@"this is native carrier test");
}


RCT_EXPORT_METHOD(createObject){
  ELACarrier *carrier;
  
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

@end
