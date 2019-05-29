import striptags from 'striptags';
import ProviderManager from './ProviderManager';
import { Provider, SpeechOptions, Voice } from './providers';

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
  speak: (utterance: string, options: SpeechOptions) => Promise<any>;
}

class Speech implements SpeechModule {
  private providerManager: ProviderManager;

  constructor(providers?: Provider[]) {
    this.providerManager = new ProviderManager(providers);
  }

  public getVoices = async () => {
    return this.providerManager.currentProvider.getVoices();
  };

  public speak = async (utterance: string, options: SpeechOptions = {}) => {
    try {
      const provider = this.providerManager.currentProvider;

      // TODO: maybe don't strip the tags here. we should allow SSML through if a user is doing it on purpose
      // TODO: this would result in us ignoring the options passed, this should be *documented*
      const cleanedUtterance = striptags(utterance);

      // see if we need to get some audio content first
      // if we don't that means we should just try to play the utterance
      if (provider.getAudioContent) {
        const content = await provider.getAudioContent(
          cleanedUtterance,
          options
        );
        return provider.playAudioContent(content, options);
      } else {
        return provider.playAudioContent(cleanedUtterance, options);
      }
    } catch (error) {
      // fallback to the native provider if anything goes wrong
      if (
        options.fallbackToNativeSynth &&
        (options.fallbackToNativeSynth === undefined ||
          options.fallbackToNativeSynth === true)
      ) {
        this.fallback(utterance, options);
      } else {
        // bubble the error up instead
        throw error;
      }
    }
  };

  private fallback = (utterance: string, options: SpeechOptions) => {
    try {
      // the last provider is always the native synth
      return this.providerManager.nativeProvider.playAudioContent(
        utterance,
        options
      );
    } catch (error) {
      // we are in serious trouble if we got here.
    }
  };
}

export * from './providers';
export default Speech;
