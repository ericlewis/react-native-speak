import { NativeModules } from 'react-native';

export interface Voice {
  id: string;
  name: string;
}

/**
 * The interface for interacting with the native side of things
 */
export interface NativeSpeechModule {
  /**
   * Play LINEAR16 audio encoded in base64
   */
  playAudioContent: (base64AudioContent: string) => void;

  /**
   * Use the native synth to communicate
   */
  speak: (utterance: string, options: SpeechOptions) => void;

  /**
   * Get the native voices.
   */
  getVoices: () => Promise<Voice[]>;
}

export interface SpeechOptions {
  // UUID for the Voice we want to use
  voiceId?: string;

  // Default is 0.5. 1.0 is the fastest, 0.0 is the slowest.
  speakingRate?: number;

  // Default is 0.5. 1.0 is the fastest, 0.0 is the slowest.
  pitch?: number;

  // Should we fallback to the native synth if anything goes wrong
  // default is `true`
  fallbackToNativeSynth?: boolean;
}

export interface ProviderInterface {
  getVoices: () => Promise<any>;
  getAudioContent?: (utterance: string, options: SpeechOptions) => Promise<any>;
  playAudioContent: (content: string, options: SpeechOptions) => void;
}

export abstract class Provider implements ProviderInterface {
  protected static baseURL: string;
  protected accessToken: string | null;
  protected native: NativeSpeechModule = NativeModules.RNSpeech;

  constructor(accessToken: string | null) {
    this.accessToken = accessToken;
  }

  public abstract getVoices(): Promise<any>;

  public getAudioContent?(
    utterance: string,
    options: SpeechOptions
  ): Promise<any>;

  public playAudioContent(content: string, _: SpeechOptions): void {
    return this.native.playAudioContent(content);
  }

  protected getBaseURL(endpoint: string): string {
    return `${(this.constructor as typeof Provider).baseURL}${endpoint}`;
  }
}
