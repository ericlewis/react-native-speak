import invariant from 'invariant';
import { keyBy } from 'lodash';
import { NativeProvider, Provider } from './providers';

export default class ProviderManager {
  // the currently selected provider
  public currentProvider: Provider;

  // always have access to the native synth
  public nativeProvider = new NativeProvider(null);

  private providers: { [key: string]: Provider };

  constructor(providers?: Provider[]) {
    // this automatically dedupes.
    this.providers = keyBy(
      providers ? [...providers, this.nativeProvider] : [this.nativeProvider],
      provider => provider.getClassName()
    );

    // Whatever the first provider is, is the one we choose to use.
    // TODO: allow manual default setup when creating
    this.currentProvider = Object.values(this.providers)[0];
  }

  /**
   * Change the active provider
   */
  public setCurrentProvider = (newProvider: Provider) => {
    invariant(
      this.hasProvider(newProvider),
      'Provider not managed, please add the provider first.'
    );

    // only update the current provider if they aren't matching
    if (!this.currentProvider.isEqualToProvider(newProvider)) {
      this.currentProvider = newProvider;
    }
  };

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
  public hasProvider(provider: Provider): boolean {
    return Boolean(this.providers[provider.getClassName()]);
  }
}
