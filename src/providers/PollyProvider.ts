import Polly from 'aws-sdk/clients/polly';
import { Voice } from '../../build/main';
import { Provider, SpeechOptions } from './BaseProvider';

export class PollyProvider extends Provider {
  private polly: Polly;

  constructor(accessKeyId: string, secretAccessKey: string) {
    super(secretAccessKey);

    this.polly = new Polly({
      signatureVersion: 'v4',
      region: 'us-east-1',
      accessKeyId,
      secretAccessKey
    });
  }

  public getVoices = async (): Promise<Voice[]> => {
    // TODO: this.polly.describeVoices()
    return [];
  };

  public getAudioContent = async (
    utterance: string,
    options: SpeechOptions
  ) => {
    return new Promise((resolve, reject) => {
      const Text = this.getSSML(utterance, options);
      this.polly.synthesizeSpeech(
        {
          Text,
          OutputFormat: 'mp3',
          TextType: 'ssml',
          VoiceId: options.voiceId || 'Amy' // random default picked
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
  };
}
