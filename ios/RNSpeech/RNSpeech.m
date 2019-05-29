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

@interface RNSpeech () <AVAudioPlayerDelegate, AVSpeechSynthesizerDelegate>
@end

@implementation RNSpeech {
  AVAudioPlayer *player_;
  AVSpeechSynthesizer *synth_;
  NSString *token_;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSDictionary *)constantsToExport {
  return [self getConstants];
}

- (NSDictionary *)getConstants {
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

// Native synth engine
RCT_EXPORT_METHOD(speak:(NSString *)utterance
                  options:(NSDictionary *)options)
{
  [self setupSynth];
  
  // stop speaking if we are already speaking
  if ([synth_ isSpeaking]) {
    [synth_ stopSpeakingAtBoundary:AVSpeechBoundaryImmediate];
  }
  
  // NSNumber is like a nilable BOOL
  NSNumber *shouldDuck = options[@"ducking"];
  if (shouldDuck == nil || [shouldDuck isEqual:@(1)]) {
    NSError *error;
    AVAudioSession *session = [AVAudioSession sharedInstance];
    [session setActive:YES error:&error];
    if (error != nil) {
      RCTLogError(@"Playback error");
      return;
    }
  }
  
  AVSpeechUtterance *synthUtterance = [[AVSpeechUtterance alloc] initWithString:utterance];
  
  NSString *voiceID = options[@"voiceId"];
  
  if (voiceID) {
    [synthUtterance setVoice:[AVSpeechSynthesisVoice voiceWithIdentifier:voiceID]];
  }
  
  [synth_ speakUtterance:synthUtterance];
  [self resetAudioSession];
}

RCT_EXPORT_METHOD(getVoices:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  NSArray<AVSpeechSynthesisVoice *>* voices = [AVSpeechSynthesisVoice speechVoices];
  NSMutableArray *convertedVoices = [[NSMutableArray alloc] initWithCapacity:voices.count];
  for (AVSpeechSynthesisVoice *voice in voices) {
    [convertedVoices addObject:@{@"id": voice.identifier, @"name": voice.name}];
  }
  
  // this doesn't reject, but we gotta include it anyway
  resolve(convertedVoices);
}

RCT_EXPORT_METHOD(playAudioContent:(NSString*)base64AudioContent options:(NSDictionary *)options)
{
  NSData *audio = [[NSData alloc] initWithBase64EncodedData:[base64AudioContent dataUsingEncoding:NSUTF8StringEncoding]
                                                    options:kNilOptions];
  
  NSError *error;

  NSNumber *shouldDuck = options[@"ducking"];
  if (shouldDuck == nil || [shouldDuck isEqual:@(1)]) {
    AVAudioSession *session = [AVAudioSession sharedInstance];
    [self resetAudioSession];
    [session setActive:YES error:&error];
    if (error != nil) {
      RCTLogError(@"Playback error");
      return;
    }
  }
  
  self->player_ = [[AVAudioPlayer alloc] initWithData:audio error:&error];
  self->player_.delegate = self;
  [self->player_ play];
}

- (void)setupSynth
{
  if (synth_ == nil) {
    synth_ = [AVSpeechSynthesizer new];
    synth_.delegate = self;
  }
}

- (void)speechSynthesizer:(AVSpeechSynthesizer *)synthesizer didFinishSpeechUtterance:(AVSpeechUtterance *)utterance
{
  [self stopAudioSession];
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag
{
  [self stopAudioSession];
}

- (void)stopAudioSession
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
