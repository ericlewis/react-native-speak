//
//  RNSpeech.m
//  RNSpeech
//
//  Created by Eric Lewis on 5/24/19.
//  Copyright © 2019 TruckMap. All rights reserved.
//

#import "RNSpeech.h"

#import <AVFoundation/AVFoundation.h>
#import <React/RCTLog.h>

@interface RNSpeech () <AVAudioPlayerDelegate>
@end

@implementation RNSpeech {
  AVAudioPlayer *player_;
  NSString *token_;
}

RCT_EXPORT_MODULE();

+ (NSDictionary *)constantsToExport {
  // TODO: implement
  return @{};
}

RCT_EXPORT_METHOD(getAudioSources:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryMultiRoute error:nil];
  NSArray *sources = [[session currentRoute] outputs];
  NSMutableArray *mutableSources = [[NSMutableArray alloc] initWithCapacity:sources.count];
  
  for (AVAudioSessionPortDescription *source in sources) {
    [mutableSources addObject:@{@"name": source.portName}];
  }
  
  resolve(mutableSources);
}

RCT_EXPORT_METHOD(setup:(NSString *)token)
{
  token_ = token;
  // TODO:
  // should we also setup default audio settings here?
  // we should at least cache them instead of constantly hitting NSUserDefaults
}

- (NSMutableURLRequest *)createBaseMutableURLRequest:(NSString *)path
{
  NSURL *URL = [[NSURL alloc] initWithString:[NSString stringWithFormat:@"https://texttospeech.googleapis.com/%@", path]];
  NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:URL];
  [request setAllHTTPHeaderFields:@{
                                    @"X-Goog-Api-Key": @"AIzaSyC5f8uwyf1frmbIeLz0s5UfaHwDwGBBmgw",
                                    @"Content-Type": @"application/json; charset=utf-8"}];
  return request;
}

- (NSData *)createRequestBodyWithText:(NSString *)text
{
  NSError *error;
  NSData *bodyData = [NSJSONSerialization dataWithJSONObject:@{
                                                               @"input": @{
                                                                   @"text": text
                                                                   },
                                                               @"voice": @{
                                                                   @"name": @"en-AU-Standard-C",
                                                                   @"languageCode": @"en-US"
                                                                   },
                                                               @"audioConfig": @{
                                                                   @"audioEncoding": @"LINEAR16"
                                                                   }
                                                               } options:kNilOptions error:&error];
  if (error != nil) {
    RCTLogError(@"Request body parse error occured");
    return nil;
  }
  
  return bodyData;
}

RCT_EXPORT_METHOD(playAudioContent:(NSString*)base64AudioContent)
{
  NSData *audio = [[NSData alloc] initWithBase64EncodedData:[base64AudioContent dataUsingEncoding:NSUTF8StringEncoding]
                                                    options:kNilOptions];
  NSError *error;
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [self resetAudioSession];
  [session setActive:YES error:&error];
  if (error != nil) {
    RCTLogError(@"Playback error");
    return;
  }
  self->player_ = [[AVAudioPlayer alloc] initWithData:audio error:&error];
  self->player_.delegate = self;
  [self->player_ play];
}

RCT_EXPORT_METHOD(speak:(NSString *)key
                  utterance:(NSString *)utterance
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  NSMutableURLRequest *request = [self createBaseMutableURLRequest:@"v1beta1/text:synthesize"];
  [request setHTTPMethod:@"POST"];
  
  NSData *body = [self createRequestBodyWithText:utterance];
  if (body != nil) {
    [request setHTTPBody:body];
  } else {
    reject(@"request_error", @"An error occured while parsing the request body", nil);
    return;
  }
  
  NSURLSessionTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request
                                                           completionHandler:^(NSData * _Nullable data,
                                                                               NSURLResponse * _Nullable response,
                                                                               NSError * _Nullable error) {
                                                             if (error != nil) {
                                                               NSLog(@"%@", error);
                                                               reject(@"response_error", @"An error occured.", error);
                                                             } else {
                                                               NSError *error;
                                                               NSDictionary *res = [NSJSONSerialization JSONObjectWithData:data
                                                                                                                   options:kNilOptions
                                                                                                                     error:&error];
                                                               if (error != nil) {
                                                                 reject(@"response_error", @"An error occured while parsing the response body", error);
                                                               } else {
                                                                 [self playAudioContent:res[@"audioContent"]];
                                                                 resolve(res);
                                                               }
                                                             }
                                                           }];
  [task resume];
  
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag
{
  // TODO:
  // may need to set active on diff thread (or possibly don't even need to do it)
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setActive:NO error:nil];
}

- (void)resetAudioSession
{
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryAmbient
           withOptions:AVAudioSessionCategoryOptionDuckOthers
                 error:nil];
}

@end
