import get from 'lodash.get';
import { NativeEventEmitter, Platform } from 'react-native';
import striptags from 'striptags';
import {
  Constants,
  RNSpeech,
  SpeechOptions,
  Voice
} from './NativeSpeechModule';
import ProviderManager, { Provider } from './providers';
import Queue, { EventName } from './Queue';

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

interface SpeakPacket {
  currentProvider: Provider;
  utterance: string;
  options: SpeechOptions;
}

class Speech implements SpeechModule {
  public events = new NativeEventEmitter(RNSpeech);
  private providerManager: ProviderManager;

  private queue = new Queue<SpeakPacket>();

  constructor(providers?: Provider[]) {
    this.providerManager = new ProviderManager(providers);
    this.queue.addListener(this.queueListener);

    // TODO: we should have these constants somewhere in JS too, would be cool to auto gen as well..
    this.events.addListener('SPEECH_END_EVENT', this.playbackEndedListener);
  }

  get constants(): Constants {
    // have to cast types bc android doesn't like getConstants
    return Platform.OS === 'ios'
      ? RNSpeech.getConstants()
      : ((RNSpeech as unknown) as Constants);
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

  public async getVoices() {
    return this.providerManager.currentProvider.getVoices();
  }

  public async getVoicesForProvider(name: string) {
    return this.providerManager.getProviderForName(name).getVoices();
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
    } else if (options.speakInstantly) {
      // TODO: also stop any inflight speech
      this.queue.flush();
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
        this.events.emit(this.constants.events.SPEECH_LOADING_EVENT);
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
    // the queue is FIFO, so it's pretty safe to react this way probably. but not clearly how it should be used.
    if (eventName === 'ADDED_ITEM' && !RNSpeech.isSpeaking()) {
      // we obviously should check if we should be speaking first.
      const { currentProvider, utterance, options } = item;
      this.speakWithProvider(currentProvider, utterance, options);
    } else {
      // an item was removed, we can log it here if we want
    }
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
