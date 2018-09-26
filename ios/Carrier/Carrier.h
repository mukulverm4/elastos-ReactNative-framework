//
//  Carrier.h
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/25.
//  Copyright © 2018 Facebook. All rights reserved.
//
#import <Foundation/Foundation.h>
#import <ElastosCarrier/ElastosCarrier.h>


@interface Carrier : NSObject

-(void) start:(NSDictionary *)config completion:(void (^)(NSError *error))completion;
-(ELACarrier *) getIntance;
@end
