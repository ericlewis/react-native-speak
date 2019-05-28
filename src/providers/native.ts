import { Provider, SpeechOptions } from './base';

/**
 * Native speech synth provider
 * It is the simplest provider, with no audioContent
 */
export class NativeProvider extends Provider {
  public getVoices = async () => {
    return this.native.getVoices();
  };

  public playAudioContent = (utterance: string, options: SpeechOptions) => {
    return this.native.speak(utterance, options);
  };
}
