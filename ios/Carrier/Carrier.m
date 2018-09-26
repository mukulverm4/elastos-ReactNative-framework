//
//  Carrier.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/25.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Carrier.h"
#import <React/RCTLog.h>



@interface Carrier () <ELACarrierDelegate>{
  BOOL _init;
  ELACarrierConnectionStatus connectStatus;
  ELACarrier *elaCarrier;
  dispatch_queue_t managerCarrierQueue;
}
@end

@implementation Carrier

-(ELACarrier *) getIntance{
  return elaCarrier;
}

- (instancetype)init {
  if (self = [super init]) {
    _init = NO;
    connectStatus = ELACarrierConnectionStatusDisconnected;
    managerCarrierQueue = dispatch_queue_create("managerCarrierQueue", NULL);
    [ELACarrier setLogLevel:ELACarrierLogLevelDebug];
    
  }
  return self;
}

-(void) start:(NSDictionary *)config completion:(void (^)(NSError *error))completion{
  if (_init) {
    return;
  }
  
  _init = YES;
  
  dispatch_async(managerCarrierQueue, ^{
    NSError *error = nil;
    if (elaCarrier == nil) {
      NSString *libraryDirectory = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES)[0];
      NSString *name = [@"elastos_rn/" stringByAppendingString:config[@"name"]];
      NSString *elaDirectory = [libraryDirectory stringByAppendingPathComponent:name];
      
      if (![[NSFileManager defaultManager] fileExistsAtPath:elaDirectory]) {
        NSURL *url = [NSURL fileURLWithPath:elaDirectory];
        if (![[NSFileManager defaultManager] createDirectoryAtURL:url withIntermediateDirectories:YES attributes:nil error:&error]){
          RCTLog(@"Create ELACarrier persistent directory failed: %@", error);
          connectStatus = ELACarrierConnectionStatusDisconnected;
          _init = NO;
          if (completion) {
            completion(error);
          }
          return;
        }
        
        [url setResourceValue:@YES forKey:NSURLIsExcludedFromBackupKey error:nil];
      }
      
//      NSString *plistPath = [[NSBundle mainBundle]pathForResource:@"ElastosCarrier" ofType:@"plist"];
//      NSDictionary *config = [[NSDictionary alloc]initWithContentsOfFile:plistPath];
      NSArray *bootstraps = config[@"bootstraps"];
      NSMutableArray *bootstrapNodes = [[NSMutableArray alloc] initWithCapacity:bootstraps.count];
      for (NSDictionary *bootstrap in bootstraps) {
        ELABootstrapNode *node = [[ELABootstrapNode alloc] init];
        node.ipv4 = bootstrap[@"ipv4"];
        node.ipv6 = bootstrap[@"ipv6"];
        node.port = bootstrap[@"port"];
        node.publicKey = bootstrap[@"publicKey"];
        [bootstrapNodes addObject:node];
      }
      
      ELACarrierOptions *options = [[ELACarrierOptions alloc] init];
      options.persistentLocation = elaDirectory;
      options.udpEnabled = [config[@"udp_enabled"] boolValue];
      options.bootstrapNodes = bootstrapNodes;
      
      [ELACarrier initializeInstanceWithOptions:options delegate:self error:&error];
      elaCarrier = [ELACarrier getInstance];
      _init = NO;
      if (elaCarrier == nil) {
        RCTLog(@"Create ELACarrier instance failed: %@", error);
        connectStatus = ELACarrierConnectionStatusDisconnected;
        if (completion) {
          completion(error);
        }
        return;
      }
    }
    
    _init = [elaCarrier startWithIterateInterval:1000 error:&error];
    if (_init) {
      
    }
    else {
      RCTLog(@"Start ELACarrier instance failed: %@", error);
      [elaCarrier kill];
      elaCarrier = nil;
      connectStatus = ELACarrierConnectionStatusDisconnected;
    }
    
    if (completion) {
      completion(error);
    }
  });
}

#pragma mark - ELACarrierDelegate
-(void) carrier:(ELACarrier *)carrier connectionStatusDidChange:(enum ELACarrierConnectionStatus)newStatus{
  RCTLog(@"connectionStatusDidChange : %d", (int)newStatus);
  
}

-(void) carrierDidBecomeReady:(ELACarrier *)carrier{
  RCTLog(@"didBecomeReady");
  
}

-(void) carrier:(ELACarrier *)carrier selfUserInfoDidChange:(ELACarrierUserInfo *)newInfo{
  RCTLog(@"selfUserInfoDidChange : %@", newInfo);
  
}

-(void) carrier:(ELACarrier *)carrier didReceiveFriendsList:(NSArray<ELACarrierFriendInfo *> *)friends{
  RCTLog(@"didReceiveFriendsList : %@", friends);
  
  
}

-(void) carrier:(ELACarrier *)carrier friendInfoDidChange:(NSString *)friendId newInfo:(ELACarrierFriendInfo *)newInfo{
  RCTLog(@"friendInfoDidChange : %@", newInfo);
  
}

-(void) carrier:(ELACarrier *)carrier friendConnectionDidChange:(NSString *)friendId newStatus:(ELACarrierConnectionStatus)newStatus{
  RCTLog(@"friendConnectionDidChange, userId : %@, newStatus : %zd", friendId, newStatus);
  
}

-(void) carrier:(ELACarrier *)carrier friendPresenceDidChange:(NSString *)friendId newPresence:(ELACarrierPresenceStatus)newPresence{
  RCTLog(@"friendPresenceDidChange, userId : %@, newPresence : %zd", friendId, newPresence);
  
}

-(void) carrier:(ELACarrier *)carrier didReceiveFriendRequestFromUser:(NSString *)userId withUserInfo:(ELACarrierUserInfo *)userInfo hello:(NSString *)hello{
  RCTLog(@"didReceiveFriendRequestFromUser, userId : %@", userId);
}

-(void) carrier:(ELACarrier *)carrier newFriendAdded:(ELACarrierFriendInfo *)newFriend{
  RCTLog(@"newFriendAdded : %@", newFriend);
  
}

-(void) carrier:(ELACarrier *)carrier friendRemoved:(NSString *)friendId{
  
}



@end
