import invariant from 'invariant';
import { EventSubscriptionVendor, NativeModules } from 'react-native';

export interface Voice {
  id: string;
  name: string;
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

export interface SpeechOptions {
  // UUID for the Voice we want to use
  voiceId?: string;

  // Default is 1.0. 2.0 is the fastest, 0.1 is the slowest.
  speakingRate?: number;

  // Default is 0.5. 1.0 is the fastest, 0.0 is the slowest.
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

export interface ProviderInterface {
  getVoices: () => Promise<Voice[]>;
  getAudioContent?: (utterance: string, options: SpeechOptions) => Promise<any>;
  playAudioContent: (
    content: string,
    utterance: string,
    options: SpeechOptions
  ) => void;
  speak?: (utterance: string, options: SpeechOptions) => void;
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

  public speak?(utterance: string, options: SpeechOptions): void;

  /**
   * Plays a base64 encoded string on the native platform
   * @param content base64 encoded string
   * @param options
   */
  public playAudioContent(
    content: string,
    utterance: string,
    options: SpeechOptions
  ): void {
    return this.native.playAudioContent(content, utterance, options);
  }

  /**
   * Convenience method for getting the class name
   * we use this as a UUID essentially
   */
  public getClassName(): string {
    return this.constructor.name;
  }

  /**
   * Check if this provider is the same as the one passed
   * @param provider
   */
  public isEqualToProvider(provider: Provider): boolean {
    return this.getClassName() === provider.getClassName();
  }

  /**
   * Check if the options are compatible with the provider
   * Mostly a precheck to ensure that we have no problems with voiceId
   */
  public optionsCompatible(options: SpeechOptions) {
    const { voiceId, speakingRate } = options;
    if (voiceId) {
      invariant(
        this.isValidVoiceId(voiceId),
        'VoiceId belongs to a different provider'
      );
    }

    if (speakingRate) {
      invariant(
        speakingRate <= 2.0 || speakingRate >= 0.1,
        'Speaking rate must be between 0.1 & 2.0'
      );
    }
  }

  /**
   * VoiceId prefix, used to ensure we aren't accidentally setting voiceId's that can't work with a provider
   */
  protected getVoiceIdSlug(): string {
    return `${this.getClassName()}:`;
  }

  /**
   * Adds slug to voiceId, ignores if the slug has already been added
   */
  protected sluggifyVoiceId(voiceId: string): string {
    const slug = this.getClassName();
    return voiceId.startsWith(slug) ? voiceId : `${slug}:${voiceId}`;
  }

  /**
   * Verify the voiceId
   * @param voiceId
   */
  protected isValidVoiceId(voiceId: string): boolean {
    return voiceId.startsWith(this.getVoiceIdSlug());
  }

  /**
   * String the voiceId slug, also enforces correctness
   * @param voiceId
   */
  protected stripVoiceIdSlug(voiceId: string): string {
    invariant(this.isValidVoiceId(voiceId), `Slug doesn't belong to provider`);
    return voiceId.replace(this.getVoiceIdSlug(), '');
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
