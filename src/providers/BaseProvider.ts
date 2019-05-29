import invariant from 'invariant';
import { RNSpeech, SpeechOptions, Voice } from '../NativeSpeechModule';

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
  protected native = RNSpeech;

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

    const pitch = options.pitch ? (options.pitch * 100).toFixed(0) : 0;

    return `<speak><prosody rate="${speakingRate}%" pitch="${pitch}%">${utterance}</prosody></speak>`;
  }
}
