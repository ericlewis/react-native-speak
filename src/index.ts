import get from 'lodash.get';
import { NativeEventEmitter, Platform } from 'react-native';
import striptags from 'striptags';
import {
  Constants,
  RNSpeak,
  SpeechOptions,
  Voice
} from './NativeSpeechModule';
import ProviderManager, { Provider } from './providers';
import Queue, { EventName } from './Queue';

/**
 * The interface for the JS Module
 */
export interface SpeechModuleInterface {
  events: NativeEventEmitter;

  /**
   * Returns a list of available outputs in human readable format
   */
  getOutputs: (key: string) => Promise<string[]>;

  /**
   * Returns a list of available voices for the current provider
   */
  getVoices: (key: string) => Promise<Voice[]>;

  /**
   * Returns a list of available voices for a given providers name
   */
  getVoicesForProvider: (name: string) => Promise<Voice[]>;

  /**
   * Convenience method for fetching & playing a given utterance
   */
  speak: (utterance: string, options: SpeechOptions) => Promise<any>;

  /**
   * Sets the active provider (persisted across launches)
   */
  setCurrentProvider: (name: string) => void;

  /**
   * Returns the active providers name
   */
  getCurrentProvider: () => string;

  /**
   * Returns a list of available provider names
   */
  getProviders: () => string[];
}

export interface SpeechUtterance {
  currentProvider: Provider;
  utterance: string;
  options: SpeechOptions;
}

class Speech implements SpeechModuleInterface {
  /**
   * Native event emitter
   */
  public events = new NativeEventEmitter(RNSpeak);

  /**
   * Exported constants from native
   */
  public constants =
    Platform.OS === 'ios'
      ? RNSpeak.getConstants()
      : ((RNSpeak as unknown) as Constants);

  private providerManager: ProviderManager;
  private queue = new Queue<SpeechUtterance>();

  /**
   * Creates a new instance of Speech
   * Can optionally the name for default provider
   * Note: You should not try to use multiple instances of this
   */
  constructor(providers?: Provider[], defaultProviderName?: string) {
    this.providerManager = new ProviderManager(providers, defaultProviderName);
    this.queue.addListener(this.queueListener);

    this.events.addListener(
      this.constants.events.SPEECH_END,
      this.playbackEndedListener
    );
  }

  /**
   * Returns a list of available outputs in human readable format
   */
  public getOutputs() {
    return RNSpeak.getOutputs();
  }

  /**
   * Sets the active provider (persisted across launches)
   */
  public setCurrentProvider(name: string) {
    this.providerManager.setCurrentProvider(name);
  }

  /**
   * Returns the active providers name
   */
  public getCurrentProvider(): string {
    return this.providerManager.currentProvider.getClassName();
  }

  /**
   * Returns a list of available provider names
   */
  public getProviders(): string[] {
    return this.providerManager.getProviderNames();
  }

  /**
   * Returns a list of available voices for the current provider
   */
  public async getVoices() {
    return this.providerManager.currentProvider.getVoices();
  }

  /**
   * Returns a list of available voices for a given providers name
   */
  public async getVoicesForProvider(name: string) {
    return this.providerManager.getProviderForName(name).getVoices();
  }

  /**
   * Stops speaking/audio playback
   */
  public stop() {
    RNSpeak.stop();
  }

  /**
   * Note: speakInstantly option is ignored if you add a batch of utterances
   * @param utterance
   * @param options
   */
  public async speak(
    utterance: string | string[],
    options: SpeechOptions = {}
  ) {
    const currentProvider = this.providerManager.currentProvider;
    if (Array.isArray(utterance)) {
      this.queue.batchAdd(
        utterance.map(u => ({ currentProvider, utterance: u, options }))
      );
    } else if (options.instant) {
      this.queue.flush();
      this.stop();
      this.speakWithProvider(currentProvider, utterance, options);
    } else {
      this.queue.add({ currentProvider, utterance, options });
    }
  }

  /**
   * Use an arbitrary provider to speak
   * protected so you can extend this class and use it however you like
   */
  protected async speakWithProvider(
    provider: Provider,
    utterance: string,
    options: SpeechOptions
  ) {
    try {
      // TODO: maybe don't strip the tags here. we should allow SSML through if a user is doing it on purpose
      // TODO: this would result in us ignoring the options passed, this should be *documented*
      const cleanedUtterance = striptags(utterance);

      // check option compatibility, will throw if there is any problem
      provider.optionsCompatible(options);

      // see if we need to get some audio content first
      // if we don't that means we should just try to play the utterance
      if (provider.getAudioContent) {
        this.events.emit(this.constants.events.SPEECH_LOADING);
        const content = await provider.getAudioContent(
          cleanedUtterance,
          options
        );
        return provider.playAudioContent(content, utterance, options);
      } else if (provider.speak) {
        return provider.speak(cleanedUtterance, options);
      } else {
        // this provider seems incomplete or broken
        // we could move to the next one
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
  }

  private playbackEndedListener = () => {
    // remove the last spoken item
    this.queue.remove();

    // there are more items in the queue still, lets work it!
    if (!this.queue.isEmpty()) {
      const { currentProvider, utterance, options } = this.queue.first();
      this.speakWithProvider(currentProvider, utterance, options);
    }
  };

  private queueListener = (eventName: EventName, _: any[], item?: any) => {
    RNSpeak.isSpeaking().then(speaking => {
      if (!speaking && eventName === 'ADDED_ITEM') {
        const { currentProvider, utterance, options } = item;
        this.speakWithProvider(currentProvider, utterance, options);
      }
    });
  };

  private fallback(
    originalError: Error,
    utterance: string,
    options: SpeechOptions
  ) {
    // log the OG error
    if (__DEV__) {
      console.warn(originalError);
    }

    // attempt to speak natively
    try {
      return this.providerManager.nativeProvider.speak(utterance, options);
    } catch (error) {
      // we are in serious trouble if we got here.
    }
  }
}

export * from './providers';
export * from './NativeSpeechModule';
export default Speech;
