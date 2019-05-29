import invariant from 'invariant';
import { SpeechOptions, Voice } from '../NativeSpeechModule';
import { Provider } from './BaseProvider';

export class GoogleProvider extends Provider {
  protected static baseURL = 'https://texttospeech.googleapis.com/v1beta1/';

  public getVoices = async (): Promise<Voice[]> => {
    invariant(this.accessToken, 'No access token provided');

    const res = await fetch(this.getBaseURL('voices?languageCode=en-US'), {
      headers: {
        'X-Goog-Api-Key': this.accessToken!
      }
    });

    const { voices }: { voices: Array<{ name: string }> } = await res.json();
    return voices.map(({ name }) => ({
      id: this.sluggifyVoiceId(name),
      name
    }));
  };

  public getAudioContent = async (
    utterance: string,
    options: SpeechOptions
  ) => {
    invariant(this.accessToken, 'No access token provided');

    const ssml = this.getSSML(utterance, options);
    const raw = await fetch(this.getBaseURL('text:synthesize'), {
      method: 'POST',
      body: JSON.stringify({
        input: {
          ssml
        },
        voice: {
          ...(options.voiceId
            ? { name: this.stripVoiceIdSlug(options.voiceId) }
            : {}),
          languageCode: 'en-US'
        },
        audioConfig: {
          audioEncoding:
            options.codec && options.codec === 'pcm' ? 'LINEAR16' : 'mp3'
        }
      }),
      headers: {
        'X-Goog-Api-Key': this.accessToken!
      }
    });

    const { audioContent }: { audioContent: string } = await raw.json();
    return audioContent;
  };
}
