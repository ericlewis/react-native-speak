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
  NSMutableDictionary *utterances_;
}

RCT_EXPORT_MODULE();

static NSString *SPEECH_LOADING_EVENT = @"SPEECH_LOADING_EVENT";
static NSString *SPEECH_START_EVENT = @"SPEECH_START_EVENT";
static NSString *SPEECH_END_EVENT = @"SPEECH_END_EVENT";
static NSString *SPEECH_ERROR_EVENT = @"SPEECH_ERROR_EVENT";

static NSString *OUTPUT_PHONE_SPEAKER = @"Speaker";
static NSString *OUTPUT_BLUETOOTH = @"Bluetooth";
static NSString *OUTPUT_HEADPHONES = @"Headphones";

- (instancetype)init
{
  if (self = [super init]) {
    utterances_ = [NSMutableDictionary new];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(audioSessionRouteChanged:)
                                                 name:AVAudioSessionRouteChangeNotification
                                               object:nil];
  }
  
  return self;
}

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
             @"SPEECH_LOADING" : SPEECH_LOADING_EVENT,
             @"SPEECH_START"   : SPEECH_START_EVENT,
             @"SPEECH_END"     : SPEECH_END_EVENT,
             @"SPEECH_ERROR"   : SPEECH_ERROR_EVENT
           },
           @"outputs": @{
             @"PHONE_SPEAKER" : OUTPUT_PHONE_SPEAKER,
             @"BLUETOOTH" : OUTPUT_BLUETOOTH,
             @"HEADPHONES": OUTPUT_HEADPHONES
           },
           };
}

- (NSArray<NSString *> *)supportedEvents
{
  return [[[self getConstants] valueForKey:@"events"] allValues];
}

- (void)audioSessionRouteChanged:(NSNotification *)notification
{
  NSLog(@"%@", notification);
}

RCT_EXPORT_METHOD(getOutputs:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  AVAudioSession *session = [AVAudioSession sharedInstance];
  AVAudioSessionPortDescription *source = [[[session currentRoute] outputs] firstObject];
  NSMutableArray *outputs = [[NSMutableArray alloc] initWithCapacity:2];
  
  [outputs addObject:OUTPUT_PHONE_SPEAKER];
  
  if ([[source portType] isEqualToString:AVAudioSessionPortBluetoothA2DP] ||
      [[source portType] isEqualToString:AVAudioSessionPortBluetoothLE] ||
      [[source portType] isEqualToString:AVAudioSessionPortBluetoothHFP]) {
    [outputs addObject:OUTPUT_BLUETOOTH];
  } else if ([[source portType] isEqualToString:AVAudioSessionPortHeadphones]) {
    [outputs addObject:OUTPUT_HEADPHONES];
  }
  
  resolve(outputs);
}

RCT_EXPORT_METHOD(getVoices:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  NSArray<AVSpeechSynthesisVoice *>* voices = [AVSpeechSynthesisVoice speechVoices];
  NSMutableArray *convertedVoices = [[NSMutableArray alloc] initWithCapacity:voices.count];
  for (AVSpeechSynthesisVoice *voice in voices) {
    [convertedVoices addObject:@{@"id": voice.identifier, @"name": voice.name}];
  }
  
  resolve(convertedVoices);
}

RCT_EXPORT_METHOD(isSpeaking:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
  if (player_.isPlaying == YES || synth_.isSpeaking == YES) {
    resolve(@(YES));
  } else {
    resolve(@(NO));
  }
}

RCT_EXPORT_METHOD(stop)
{
  if (synth_.isSpeaking) {
    [synth_ stopSpeakingAtBoundary:AVSpeechBoundaryImmediate];
  } else if (player_.isPlaying) {
    NSString *utteranceId = [self hashStringForObject:player_.data];
    NSDictionary *body = [utterances_ valueForKey:utteranceId];
    [self sendEventWithName:SPEECH_END_EVENT body:body];
    [utterances_ removeObjectForKey:utteranceId];
    [player_ stop];
    [self stopAudioSession];
  }
  
}

#pragma mark - Audio Player

RCT_EXPORT_METHOD(playAudioContent:(NSString*)base64AudioContent
                  forUtterance:(NSString *)utterance
                  withOptions:(NSDictionary *)options)
{
  NSNumber *shouldDuck = options[@"ducking"];
  [self resetAudioSession:shouldDuck == nil || [shouldDuck isEqual:@(1)]];
  
  NSData *audio = [[NSData alloc] initWithBase64EncodedData:[base64AudioContent dataUsingEncoding:NSUTF8StringEncoding]
                                                    options:kNilOptions];
  
  NSDictionary *body = @{@"utterance": utterance, @"options": options};
  NSString *utteranceId = [self hashStringForObject:audio];
  [utterances_ setValue:body forKey:utteranceId];
  [self sendEventWithName:SPEECH_START_EVENT body:body];

  NSError *error;

  AVAudioSession *session = [AVAudioSession sharedInstance];
  
  NSString *preferredOutput = options[@"preferredOutput"];
  [session overrideOutputAudioPort: [[preferredOutput lowercaseString] isEqualToString:@"speaker"] ? AVAudioSessionPortOverrideSpeaker : AVAudioSessionPortOverrideNone error:nil];
  
  [session setActive:YES error:&error];

  player_ = [[AVAudioPlayer alloc] initWithData:audio error:&error];
  
  NSNumber *volume = options[@"volume"];
  if (volume) {
    player_.volume = [volume floatValue];
  }
  
  player_.delegate = self;
  [player_ play];
  
  if (error != nil) {
    [self sendEventWithName:SPEECH_ERROR_EVENT body:@{@"utterance": utterance, @"options": options, @"error": error}];
    [utterances_ removeObjectForKey:utteranceId];
  }
}

#pragma mark - Native Synth Provider

RCT_EXPORT_METHOD(speak:(NSString *)utterance
                  options:(NSDictionary *)options)
{
  NSNumber *shouldDuck = options[@"ducking"];
  [self setupSynth];
  [self resetAudioSession:shouldDuck == nil || [shouldDuck isEqual:@(1)]];

  NSDictionary *body = @{@"utterance": utterance, @"options": options};
  
  [self sendEventWithName:SPEECH_START_EVENT body:body];
  
  // stop speaking if we are already speaking
  if ([synth_ isSpeaking]) {
    [synth_ stopSpeakingAtBoundary:AVSpeechBoundaryImmediate];
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
    synthUtterance.pitchMultiplier = [pitch floatValue];
  }

  
  NSString *voiceID = options[@"voiceId"];
  
  if (voiceID) {
    [synthUtterance setVoice:[AVSpeechSynthesisVoice voiceWithIdentifier:voiceID]];
  }
  
  NSString *utteranceId = [self hashStringForObject:synthUtterance];
  [utterances_ setValue:body forKey:utteranceId];

  AVAudioSession *session = [AVAudioSession sharedInstance];
  
  NSString *preferredOutput = options[@"preferredOutput"];
  [session overrideOutputAudioPort: [[preferredOutput lowercaseString] isEqualToString:@"speaker"] ? AVAudioSessionPortOverrideSpeaker : AVAudioSessionPortOverrideNone error:nil];
  
  [session setActive:YES error:nil];
  [synth_ speakUtterance:synthUtterance];
}

#pragma mark - Delegates

- (void)speechSynthesizer:(AVSpeechSynthesizer *)synthesizer didFinishSpeechUtterance:(AVSpeechUtterance *)utterance
{
  NSString *utteranceId = [self hashStringForObject:utterance];
  [self sendEventWithName:SPEECH_END_EVENT body:[utterances_ valueForKey:utteranceId]];
  [self stopAudioSession];
  [utterances_ removeObjectForKey:utteranceId];
}

- (void)speechSynthesizer:(AVSpeechSynthesizer *)synthesizer didCancelSpeechUtterance:(AVSpeechUtterance *)utterance {
  NSString *utteranceId = [self hashStringForObject:utterance];
  [self sendEventWithName:SPEECH_END_EVENT body:[utterances_ valueForKey:utteranceId]];
  [self stopAudioSession];
  [utterances_ removeObjectForKey:utteranceId];
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag
{
  NSString *utteranceId = [self hashStringForObject:player.data];
  NSDictionary *body = [utterances_ valueForKey:utteranceId];
  if (flag) {
    [self sendEventWithName:SPEECH_END_EVENT body:body];
  } else {
    // TODO: should we create an error?
    [self sendEventWithName:SPEECH_ERROR_EVENT body:body];
  }
  
  [self stopAudioSession];
  [utterances_ removeObjectForKey:utteranceId];
}

#pragma mark - Utils

- (void)setupSynth
{
  if (synth_ == nil) {
    synth_ = [AVSpeechSynthesizer new];
    synth_.delegate = self;
  }
}


- (void)stopAudioSession
{
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setActive:NO
         withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation
               error:nil];
}

- (void)resetAudioSession:(BOOL)shouldDuck
{
  AVAudioSession *session = [AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryPlayAndRecord
           withOptions:shouldDuck ? AVAudioSessionCategoryOptionInterruptSpokenAudioAndMixWithOthers | AVAudioSessionCategoryOptionDuckOthers : AVAudioSessionCategoryOptionInterruptSpokenAudioAndMixWithOthers
                 error:nil];
}

- (NSString*)hashStringForObject:(id)object
{
  return [NSString stringWithFormat:@"%lu", (unsigned long)[object hash]];
}

@end
