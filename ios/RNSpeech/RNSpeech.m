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
  NSString *currentUtterance_; // this may not be stable
  NSDictionary *currentOptions_; // this may not be stable
}

RCT_EXPORT_MODULE();

static NSString *DEFAULT_PROVIDER_KEY = @"DEFAULT_PROVIDER_KEY";
static NSString *SPEECH_LOADING_EVENT = @"SPEECH_LOADING_EVENT";
static NSString *SPEECH_START_EVENT = @"SPEECH_START_EVENT";
static NSString *SPEECH_END_EVENT = @"SPEECH_END_EVENT";
static NSString *SPEECH_ERROR_EVENT = @"SPEECH_ERROR_EVENT";

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSDictionary *)constantsToExport {
  return [self getConstants];
}

- (NSDictionary *)getConstants {
  return @{
           @"events": @{
             @"SPEECH_LOADING_EVENT" : SPEECH_LOADING_EVENT,
             @"SPEECH_START_EVENT"   : SPEECH_START_EVENT,
             @"SPEECH_END_EVENT"     : SPEECH_END_EVENT,
             @"SPEECH_ERROR_EVENT"   : SPEECH_ERROR_EVENT
           },
           @"provider": RCTNullIfNil([NSUserDefaults.standardUserDefaults valueForKey:DEFAULT_PROVIDER_KEY])
           };
}

- (NSArray<NSString *> *)supportedEvents
{
  return [[[self getConstants] valueForKey:@"events"] allValues];
}

RCT_EXPORT_METHOD(saveProviderAsDefault:(NSString *)name)
{
  [NSUserDefaults.standardUserDefaults setObject:name forKey:DEFAULT_PROVIDER_KEY];
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

RCT_EXPORT_METHOD(playAudioContent:(NSString*)base64AudioContent
                  forUtterance:(NSString *)utterance
                  withOptions:(NSDictionary *)options)
{
  [self sendEventWithName:SPEECH_START_EVENT body:@{@"utterance": utterance, @"options": options}];
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
      [self sendEventWithName:SPEECH_ERROR_EVENT body:@{@"utterance": utterance, @"options": options, @"error": error}];
      return;
    }
  }
  
  self->player_ = [[AVAudioPlayer alloc] initWithData:audio error:&error];
  
  // TODO: set from options
  NSNumber *volume = options[@"volume"];
  if (volume) {
    self->player_.volume = [volume floatValue];
  }
  
  self->player_.delegate = self;
  
  currentUtterance_ = utterance;
  currentOptions_ = options;
  [self->player_ play];
  
  if (error != nil) {
    [self sendEventWithName:SPEECH_ERROR_EVENT body:@{@"utterance": utterance, @"options": options, @"error": error}];
  }
}

// Native synth engine
RCT_EXPORT_METHOD(speak:(NSString *)utterance
                  options:(NSDictionary *)options)
{
  [self setupSynth];
  [self sendEventWithName:SPEECH_START_EVENT body:@{@"utterance": utterance, @"options": options}];
  
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
      [self sendEventWithName:SPEECH_ERROR_EVENT body:@{@"utterance": utterance, @"options": options, @"error": error}];
      RCTLogError(@"Playback error");
      return;
    }
  }
  
  AVSpeechUtterance *synthUtterance = [[AVSpeechUtterance alloc] initWithString:utterance];
  
  NSNumber *volume = options[@"volume"];
  if (volume) {
    // TODO: check the min/max, i think these values aren't just 0-1
    synthUtterance.volume = [volume floatValue];
  }
  
  NSNumber *speakingRate = options[@"speakingRate"];
  if (speakingRate) {
    synthUtterance.rate = [speakingRate floatValue] / 2.0;
  }
  
  NSNumber *pitch = options[@"pitch"];
  if (pitch) {
    // TODO: we need to normalize this value probably
    // -1 is the lowest pitch, 0 is normal, 1.0 is highest
    synthUtterance.pitchMultiplier = [pitch floatValue];
  }

  
  NSString *voiceID = options[@"voiceId"];
  
  if (voiceID) {
    [synthUtterance setVoice:[AVSpeechSynthesisVoice voiceWithIdentifier:voiceID]];
  }
  
  currentUtterance_ = utterance;
  currentOptions_ = options;
  [synth_ speakUtterance:synthUtterance];
  [self resetAudioSession];
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
  [self sendEventWithName:SPEECH_END_EVENT body:@{@"utterance": utterance, @"options": currentOptions_}];
  [self stopAudioSession];
  currentOptions_ = nil;
  currentUtterance_ = nil;
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag
{
  [self sendEventWithName:SPEECH_END_EVENT body:@{@"utterance": currentUtterance_, @"options": currentOptions_}];
  [self stopAudioSession];
  currentOptions_ = nil;
  currentUtterance_ = nil;
}

- (void)stopAudioSession
{
  // TODO:
  // may need to set active on diff thread (or possibly don't even need to do it)
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setActive:NO
         withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation
               error:nil];
}

- (void)resetAudioSession
{
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryPlayback
           withOptions:AVAudioSessionCategoryOptionInterruptSpokenAudioAndMixWithOthers | AVAudioSessionCategoryOptionDuckOthers
                 error:nil];
}

@end
