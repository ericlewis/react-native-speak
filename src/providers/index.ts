// All available Providers
export * from './BaseProvider';
export * from './GoogleProvider';
export * from './NativeProvider';
export * from './PollyProvider';

import invariant from 'invariant';
import { keyBy } from 'lodash';
import { NativeModules } from 'react-native';
import { NativeSpeechModule, Provider } from './BaseProvider';
import { NativeProvider } from './NativeProvider';

const RNSpeech: NativeSpeechModule = NativeModules.RNSpeech;

export default class ProviderManager {
  // the currently selected provider
  public currentProvider: Provider;

  // always have access to the native synth
  public nativeProvider = new NativeProvider(null);

  private providers: { [key: string]: Provider };

  constructor(providers?: Provider[], providerToUse?: string) {
    // this automatically dedupes.
    this.providers = keyBy(
      providers ? [...providers, this.nativeProvider] : [this.nativeProvider],
      provider => provider.getClassName()
    );

    if (providerToUse) {
      // TODO: we probably don't want to error out, we should fallback to avail
      invariant(
        this.hasProvider(providerToUse),
        'Default provider not found in providers'
      );
      this.currentProvider = this.getProviderForName(providerToUse);
    } else {
      const defaultProvider = RNSpeech.getConstants().provider;
      this.currentProvider = defaultProvider
        ? this.getProviderForName(defaultProvider)
        : Object.values(this.providers)[0];

      if (!defaultProvider) {
        RNSpeech.saveProviderAsDefault(this.currentProvider.getClassName());
      }
    }
  }

  /**
   * Change the active provider, optionally set to default too.
   */
  public setCurrentProvider = (providerName: string, setDefault = true) => {
    const provider = this.getProviderForName(providerName);

    // TODO: this may not be very efficient, we should check if this has to happen first
    if (setDefault) {
      RNSpeech.saveProviderAsDefault(providerName);
    }

    // only update the current provider if they aren't matching
    if (!this.currentProvider.isEqualToProvider(provider)) {
      this.currentProvider = provider;
    }
  };

  /**
   * Returns a list of all the provider class names
   */
  public getProviderNames(): string[] {
    return Object.keys(this.providers);
  }

  /**
   * Register a new provider
   * @param provider
   */
  public addProvider(provider: Provider) {
    invariant(!this.hasProvider(provider), 'Provider already exists.');
    this.providers[provider.getClassName()] = provider;
  }

  /**
   * Remove an old provider
   * @param provider
   */
  public removeProvider(provider: Provider) {
    invariant(
      this.hasProvider(provider),
      'Provider not managed, did you mean to add it?'
    );
    // we want to remove the prop, not just null it out.
    delete this.providers[provider.getClassName()];
  }

  /**
   * Check if we are managing a particular provider
   * @param provider
   */
  public hasProvider(provider?: Provider | string): boolean {
    if (!provider) {
      return false;
    }

    return typeof provider === 'string'
      ? Boolean(this.providers[provider])
      : Boolean(this.providers[provider.getClassName()]);
  }

  /**
   * Returns a provider for a given (class) name
   * @param name
   */
  public getProviderForName(name: string): Provider {
    invariant(name, `Must provide a valid name, not: ${name}`);
    const provider = this.providers[name];
    invariant(
      provider,
      `Provider: ${name} not found, please register the provider first.`
    );
    return provider;
  }
}
