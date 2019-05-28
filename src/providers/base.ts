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

  /**
   * Plays a base64 encoded string on the native platform
   * @param content base64 encoded string
   * @param options
   */
  public playAudioContent(content: string, _: SpeechOptions): void {
    return this.native.playAudioContent(content);
  }

  /**
   * Convenience method for request URL
   * @param endpoint
   */
  protected getBaseURL(endpoint: string): string {
    return `${(this.constructor as typeof Provider).baseURL}${endpoint}`;
  }

  /**
   * Generate's an SSML wrapped utterance string based on the options provided
   * SSML is fairly standardized (w3c) so we shouldn't have too much trouble
   * with basic wrapping for adjustments.
   * @param utterance
   * @param options
   */
  protected getSSML(utterance: string, options: SpeechOptions): string {
    // the rate is a float between 0.0 and 1.0
    // we truncate the value after multiply bc
    // we do not want the float in a percentage
    const speakingRate = options.speakingRate
      ? (options.speakingRate * 100).toFixed(0)
      : 100;

    return `<speak><prosody rate="${speakingRate}%">${utterance}</prosody></speak>`;
  }
}
