import { NativeModules } from 'react-native';

/**
 * The interface for the JS class, typically will be used by frontend
 */
interface SpeechModule {
  /**
   * Returns a list of voices from the Google API
   */
  getVoices: (key: string) => Promise<any[]>;

  /**
   * Convenience method for fetching & playing a given utterance
   */
  speak: (key: string, utterance: string) => Promise<any>;
}

/**
 * The interface for interacting with the native side of things
 */
interface NativeSpeechModule {
  /**
   * Play LINEAR16 audio encoded in base64
   */
  playAudioContent: (base64AudioContent: string) => void;
}

class Speech implements SpeechModule {
  private static baseURL = 'https://texttospeech.googleapis.com/v1beta1/';
  public providers: any[];
  private native: NativeSpeechModule = NativeModules.RNSpeech;

  constructor(providers: any[]) {
    this.native = NativeModules.RNSpeech;
    this.providers = providers;
  }

  public getVoices = async (key: string) => {
    const res = await fetch(this.createBaseURL('voices?languageCode=en-US'), {
      headers: this.headers(key)
    });
    return res.json();
  };

  public speak = async (key: string, utterance: string) => {
    const audioContent = await this.getAudioContent(key, utterance);
    return this.native.playAudioContent(audioContent);
  };

  /**
   * Returns a base64 encoded string of LINEAR16 audio data for a given utterance
   */
  protected getAudioContent = async (key: string, utterance: string) => {
    const raw = await fetch(this.createBaseURL('text:synthesize'), {
      method: 'POST',
      body: JSON.stringify({
        input: {
          text: utterance
        },
        ...this.defaultAudioSettings()
      }),
      headers: this.headers(key)
    });
    const result: { audioContent: string } = await raw.json();
    return result.audioContent;
  };

  protected headers(key: string, other = {}): any {
    return {
      'X-Goog-Api-Key': key,
      ...other
    };
  }

  protected createBaseURL(endpoint: string): string {
    return `${Speech.baseURL}${endpoint}`;
  }

  private defaultAudioSettings() {
    return {
      voice: {
        name: 'en-AU-Standard-C',
        languageCode: 'en-US'
      },
      audioConfig: {
        audioEncoding: 'LINEAR16'
      }
    };
  }
}

export default Speech;
