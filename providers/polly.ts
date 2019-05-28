import Polly from 'aws-sdk/clients/polly';
import { Provider, SpeechOptions } from './base';

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

  public getVoices = async (): Promise<any> => {
    return this.polly.describeVoices();
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
          VoiceId: options.voiceId || ''
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
