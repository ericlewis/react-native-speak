import { NativeModules } from 'react-native';

interface NativeSpeechModule {
  // JS
  getVoices: (key: string) => Promise<any[]>;
  getAudioContent: (key: string, utterance: string) => Promise<string>;
  speak: (key: string, utterance: string) => Promise<any>;

  // Native
  playAudioContent: (base64AudioContent: string) => void;
}

const Speech: NativeSpeechModule = NativeModules.RNSpeech;

const baseURL = 'https://texttospeech.googleapis.com/v1beta1/';

function url(endpoint: string): string {
  return `${baseURL}${endpoint}`;
}

function headers(key: string, other = {}): any {
  return {
    'X-Goog-Api-Key': key,
    ...other
  };
}

function defaultAudioSettings() {
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

Speech.getVoices = async (key: string) => {
  const res = await fetch(url('voices?languageCode=en-US'), {
    headers: headers(key)
  });
  return res.json();
};

Speech.getAudioContent = async (key: string, utterance: string) => {
  const raw = await fetch(url('text:synthesize'), {
    method: 'POST',
    body: JSON.stringify({
      input: {
        text: utterance
      },
      ...defaultAudioSettings()
    }),
    headers: headers(key)
  });
  const result: { audioContent: string } = await raw.json();
  return result.audioContent;
};

Speech.speak = async function(key: string, utterance: string) {
  const audioContent = await Speech.getAudioContent(key, utterance);
  return Speech.playAudioContent(audioContent);
};

export default Speech;
