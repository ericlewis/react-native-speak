import { Provider, SpeechOptions, Voice } from './BaseProvider';

/**
 * Native speech synth provider
 * It is the simplest provider, with no audioContent
 */
export class NativeProvider extends Provider {
  public getVoices = async (): Promise<Voice[]> => {
    const voices = await this.native.getVoices();
    return voices.map(({ name, id }) => ({
      id: this.sluggifyVoiceId(id),
      name
    }));
  };

  public speak = (utterance: string, options: SpeechOptions) => {
    // TODO: this voiceId stuff is pretty lame, clean it up
    // TODO: these settings may vary between OS
    return this.native.speak(utterance, {
      ...options,
      voiceId: options.voiceId
        ? this.stripVoiceIdSlug(options.voiceId)
        : undefined
    });
  };
}
