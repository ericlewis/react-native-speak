import { Provider, SpeechOptions } from './base';

export class GoogleProvider extends Provider {
  protected static baseURL = 'https://texttospeech.googleapis.com/v1beta1/';

  public getVoices = async (): Promise<any> => {
    // TODO: use invariant or asserts
    if (this.accessToken === null) {
      throw new Error('No access token provided');
    }

    const res = await fetch(this.getBaseURL('voices?languageCode=en-US'), {
      headers: {
        'X-Goog-Api-Key': this.accessToken
      }
    });
    return res.json();
  };

  public getAudioContent = async (
    utterance: string,
    options: SpeechOptions
  ) => {
    // TODO: use invariant or asserts
    if (this.accessToken === null) {
      throw new Error('No access token provided');
    }

    const ssml = this.getSSML(utterance, options);

    const raw = await fetch(this.getBaseURL('text:synthesize'), {
      method: 'POST',
      body: JSON.stringify({
        input: {
          ssml
        },
        voice: {
          ...(options.voiceId ? { name: options.voiceId } : {}),
          languageCode: 'en-US'
        },
        audioConfig: {
          audioEncoding: 'LINEAR16'
        }
      }),
      headers: {
        'X-Goog-Api-Key': this.accessToken
      }
    });
    const result: { audioContent: string } = await raw.json();
    return result.audioContent;
  };
}
