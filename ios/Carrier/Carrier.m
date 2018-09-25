//
//  Carrier.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/25.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Carrier.h"
#import <React/RCTLog.h>

@implementation Carrier

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD (test){
  RCTLog(@"this is native carrier test");
}

@end
