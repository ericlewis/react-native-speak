import { Provider } from './base';

export class GoogleProvider extends Provider {
  protected static baseURL = 'https://texttospeech.googleapis.com/v1beta1/';

  public getVoices = async (): Promise<any> => {
    // TODO: use invariant
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

  public getAudioContent = async (utterance: string) => {
    // TODO: use invariant
    if (this.accessToken === null) {
      throw new Error('No access token provided');
    }

    const raw = await fetch(this.getBaseURL('text:synthesize'), {
      method: 'POST',
      body: JSON.stringify({
        input: {
          text: utterance
        },
        voice: {
          name: 'en-AU-Standard-C',
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
