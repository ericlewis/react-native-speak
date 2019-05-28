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
      // the rate is a float between 0.0 and 1.0
      // we truncate the value after multiply bc
      // we do not want the float in a percentage
      const speakingRate = options.speakingRate
        ? (options.speakingRate * 100).toFixed(0)
        : 100;

      this.polly.synthesizeSpeech(
        {
          Text: `<speak><prosody rate="${speakingRate}%">${utterance}</prosody></speak>`,
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
