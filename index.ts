import { NativeModules } from 'react-native';

interface NativeSpeechModule {
  // JS
  getVoices: (key: string) => Promise<any>;
  getAudio: (key: string, utterance: string) => Promise<string>;

  // Native
  playAudioContent: (base64AudioContent: string) => void;
  speak: (
    key: string,
    utterance: string,
    useNativeFetch?: boolean
  ) => Promise<any>;
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

Speech.getAudio = async (key: string, utterance: string) => {
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

const speakOrig = Speech.speak;
Speech.speak = async function(
  key: string,
  utterance: string,
  useNativeFetch = false
) {
  if (useNativeFetch) {
    speakOrig(key, utterance);
  } else {
    const audioContent = await Speech.getAudio(key, utterance);
    Speech.playAudioContent(audioContent);
  }
};

export default Speech;
