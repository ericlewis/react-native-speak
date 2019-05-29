import { get } from 'lodash';
import { NativeEventEmitter, NativeModules } from 'react-native';
import striptags from 'striptags';
import ProviderManager from './ProviderManager';
import {
  NativeSpeechModule,
  Provider,
  SpeechOptions,
  Voice
} from './providers';

const RNSpeech: NativeSpeechModule = NativeModules.RNSpeech;

/**
 * The interface for the JS class, typically will be used by frontend
 */
interface SpeechModule {
  events: NativeEventEmitter;

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
  public events = new NativeEventEmitter(RNSpeech);
  private providerManager: ProviderManager;

  constructor(providers?: Provider[]) {
    this.providerManager = new ProviderManager(providers);
  }

  get constants() {
    return RNSpeech.getConstants();
  }

  public setCurrentProvider(name: string) {
    this.providerManager.setCurrentProvider(name);
  }

  public getCurrentProvider(): string {
    return this.providerManager.currentProvider.getClassName();
  }

  public getProviders(): string[] {
    return this.providerManager.getProviderNames();
  }

  public getVoices = async () => {
    return this.providerManager.currentProvider.getVoices();
  };

  public getVoicesForProvider = async (name: string) => {
    return this.providerManager.getProviderForName(name).getVoices();
  };

  public speak = async (utterance: string, options: SpeechOptions = {}) => {
    const currentProvider = this.providerManager.currentProvider;
    return this.speakWithProvider(currentProvider, utterance, options);
  };

  public speakWithProvider = async (
    provider: Provider,
    utterance: string,
    options: SpeechOptions
  ) => {
    try {
      // TODO: maybe don't strip the tags here. we should allow SSML through if a user is doing it on purpose
      // TODO: this would result in us ignoring the options passed, this should be *documented*
      const cleanedUtterance = striptags(utterance);

      // check option compatibility, will throw if there is any problem
      provider.optionsCompatible(options);

      // see if we need to get some audio content first
      // if we don't that means we should just try to play the utterance
      if (provider.getAudioContent) {
        this.events.emit(this.constants.events.SPEECH_LOADING_EVENT);
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
      // default is true
      if (get(options, 'fallbackToNativeSynth', true)) {
        this.fallback(error, utterance, options);
      } else {
        // bubble the error up instead
        throw error;
      }
    }
  };

  private fallback = (
    originalError: Error,
    utterance: string,
    options: SpeechOptions
  ) => {
    // log the OG error
    if (__DEV__) {
      console.warn(originalError);
    }

    // attempt to speak natively
    try {
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
