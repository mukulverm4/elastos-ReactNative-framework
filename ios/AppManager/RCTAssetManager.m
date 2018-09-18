//
//  RCTAssetManager.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/15.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RCTAssetManager.h"
#import "AFURLSessionManager.h"
#import "AFHTTPRequestOperation.h"
#import "RCTStoreManager.h"

@implementation RCTAssetManager

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(downloadResourceFromUrl:(NSURL *)url andStoreInto:(NSString *) cacheDirectory
                  onSuccesfull:(RCTResponseSenderBlock)successCallback onFailure:(RCTResponseSenderBlock)errorCallback)
{
  
  NSURLRequest *request = [NSURLRequest requestWithURL:url];
  
  AFHTTPRequestOperation *op = [[AFHTTPRequestOperation alloc] initWithRequest:request];
  op.responseSerializer = [AFHTTPResponseSerializer serializer];
  
  //On Succesfull
  [ op setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
    
    
    RCTStoreManager* storeManager = [ [RCTStoreManager alloc] init];
    NSString *stringURL = [ url absoluteString];
    NSString *fileName = [ stringURL lastPathComponent ];
    
    BOOL isStored = [ storeManager storeDataIntoLocalFilesystem:responseObject intoFile:fileName inDirectory:cacheDirectory ];
    
    
    NSString *fullPath = [ storeManager getFullPath:cacheDirectory storedFilename:fileName ];
    
    successCallback(@[@{@"filename":fullPath }]);
    
    
    
    // On Failure
  } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
    errorCallback(@[[error localizedDescription]]);
  }];
  
  [[NSOperationQueue mainQueue] addOperation:op];
  
}


RCT_EXPORT_METHOD(listResourcesInCache:(NSString *) cacheDirectory
                  onSuccesfull:(RCTResponseSenderBlock)successCallback onFailure:(RCTResponseSenderBlock)errorCallback)
{
  
  RCTStoreManager* manager = [ [RCTStoreManager alloc] init];
  NSMutableArray* filenames = [ manager retrieveFilesFromDir:cacheDirectory ];
  
  successCallback(@[filenames]);
  
  
  
}


RCT_EXPORT_METHOD(deleteResourceInCache:(NSString *) resourceFilename cacheDirectory: (NSString *) directory
                  onSuccesfull:(RCTResponseSenderBlock)successCallback )
{
  
  RCTStoreManager* manager = [ [RCTStoreManager alloc] init];
  BOOL deleted =[ manager removeFile:resourceFilename inDirectory:directory];
  
  successCallback(@[@(deleted)]);
  
  
}

@end
