import { Provider } from './base';

/**
 * Native speech synth provider
 * It is the simplest provider, with no audioContent
 */
export class NativeProvider extends Provider {
  public getVoices = async () => {
    return this.native.getVoices();
  };

  public playAudioContent = (utterance: string) => {
    return this.native.speak(utterance);
  };
}
