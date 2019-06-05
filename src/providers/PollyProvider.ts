import Polly from 'aws-sdk/clients/polly';
import { SpeechOptions, Voice } from '../NativeSpeechModule';
import { Provider } from './BaseProvider';

export class PollyProvider extends Provider {
  private polly: Polly;

  constructor(config: Polly.ClientConfiguration) {
    super(null);
    this.polly = new Polly(config);
  }

  public async getVoices(): Promise<Voice[]> {
    const { Voices } = await this.polly.describeVoices().promise();
    // TODO: handle this force unwrapping
    return Voices!.map(({ Id, Name }) => ({
      id: this.sluggifyVoiceId(Id!),
      name: Name!
    }));
  }

  public async getAudioContent(utterance: string, options: SpeechOptions) {
    return new Promise((resolve, reject) => {
      const Text = this.getSSML(utterance, options);
      this.polly.synthesizeSpeech(
        {
          Text,
          OutputFormat: options.codec || 'mp3',
          TextType: 'ssml',
          VoiceId: options.voiceId
            ? this.stripVoiceIdSlug(options.voiceId)
            : 'Amy' // random default picked
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else if (data) {
            if (data.AudioStream) {
              const buf = data.AudioStream.toString('base64');
              resolve(buf);
            }
          } else {
            // TODO: improve me
            throw new Error('Unknown error: polly');
          }
        }
      );
    });
  }
}
