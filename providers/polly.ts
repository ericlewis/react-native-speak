import Polly from 'aws-sdk/clients/polly';
import { Provider } from './base';

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

  public getAudioContent = async (utterance: string) => {
    return new Promise((resolve, reject) => {
      this.polly.synthesizeSpeech(
        {
          Text: utterance,
          OutputFormat: 'mp3',
          VoiceId: 'Kimberly'
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else if (data) {
            if (data.AudioStream) {
              const buf = data.AudioStream.toString('base64');
              resolve(buf);
            }
          }
        }
      );
    });
  };
}
