import { EventSubscriptionVendor, NativeModules } from 'react-native';

export interface Voice {
  id: string;
  name: string;
}

export interface SpeechOptions {
  // UUID for the Voice we want to use
  voiceId?: string;

  // Default is 1.0. 2.0 is the fastest, 0.1 is the slowest.
  speakingRate?: number;

  // Default is 0.0. -1.0 is the lowest, 1.0 is the highest.
  pitch?: number;

  // Default is 1.0. 1.0 is the loudest, 0.0 is the lowest.
  volume?: number;

  // Should we fallback to the native synth if anything goes wrong
  // default is `true`
  fallbackToNativeSynth?: boolean;

  // Should lower audio when talking
  // default is `true`
  ducking?: boolean;

  // The codec to retrieve
  // currently only supports mp3 cross providers
  // providers would need to transform this in some cases.
  codec?: 'mp3';
}

/**
 * The interface for interacting with the native side of things
 */
export interface NativeSpeechModule extends EventSubscriptionVendor {
  getConstants: () => {
    events: {
      SPEECH_LOADING_EVENT: string;
      SPEECH_START_EVENT: string;
      SPEECH_END_EVENT: string;
      SPEECH_ERROR_EVENT: string;
    };
    provider?: string;
  };
  /**
   * Play LINEAR16 audio encoded in base64
   */
  playAudioContent: (
    base64AudioContent: string,
    utterance: string,
    options: SpeechOptions
  ) => void;

  /**
   * Use the native synth to communicate
   */
  speak: (utterance: string, options: SpeechOptions) => void;

  /**
   * Get the native voices.
   */
  getVoices: () => Promise<Voice[]>;

  /**
   * Persists the provider, will be used at next launch
   */
  saveProviderAsDefault: (name: string) => void;
}

export const RNSpeech: NativeSpeechModule = NativeModules.RNSpeech;
