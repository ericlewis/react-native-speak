import { NativeProvider, Provider, Voice } from './providers';

/**
 * The interface for the JS class, typically will be used by frontend
 */
interface SpeechModule {
  /**
   * Returns a list of voices from the Google API
   */
  getVoices: (key: string) => Promise<Voice[]>;

  /**
   * Convenience method for fetching & playing a given utterance
   */
  speak: (key: string, utterance: string) => Promise<any>;
}

class Speech implements SpeechModule {
  public providers: Provider[];
  public currentProvider: Provider;

  constructor(providers?: Provider[]) {
    if (providers && providers.length > 0) {
      // if we are given a list of providers, we will tack the native provider to the end
      this.providers = [...providers, new NativeProvider(null)];
    } else {
      // By default, we always provide the native synth
      this.providers = [new NativeProvider(null)];
    }

    // Whatever the first provider is, is the one we choose to use.
    this.currentProvider = this.providers[0];
  }

  public setCurrentProvider = (newProvider: Provider) => {
    if (this.currentProvider !== newProvider) {
      // TODO: hault any current audio first
      this.currentProvider = newProvider;
    }
  };

  public getVoices = async () => {
    return this.currentProvider.getVoices();
  };

  public speak = async (utterance: string, options = {}) => {
    try {
      const provider = this.currentProvider;

      // see if we need to get some audio content first
      // if we don't that means we should just try to play the utterance
      if (provider.getAudioContent) {
        const content = await provider.getAudioContent(utterance, options);
        return provider.playAudioContent(content);
      } else {
        return provider.playAudioContent(utterance);
      }
    } catch (error) {
      // fallback to the native provider
      return this.providers[this.providers.length - 1].playAudioContent(
        utterance
      );
    }
  };
}

export * from './providers';
export default Speech;
