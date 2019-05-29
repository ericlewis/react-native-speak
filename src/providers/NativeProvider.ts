import { SpeechOptions, Voice } from '../NativeSpeechModule';
import { Provider } from './BaseProvider';

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

    const scale = (
      num: number,
      in_min: number,
      in_max: number,
      out_min: number,
      out_max: number
    ) => {
      if (num < 0.001 && num > -0.001) {
        return 1.0;
      }
      return (
        ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    };

    return this.native.speak(utterance, {
      ...options,
      pitch: options.pitch ? scale(options.pitch, -1, 1, 0.5, 2.0) : 1.0,
      voiceId: options.voiceId
        ? this.stripVoiceIdSlug(options.voiceId)
        : undefined
    });
  };
}
