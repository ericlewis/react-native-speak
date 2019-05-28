import { NativeModules } from 'react-native';
const Speech = NativeModules.tts;

Speech.getVoices = async (key: string) => {
  const res = await fetch(
    'https://texttospeech.googleapis.com//v1beta1/voices?languageCode=en-US',
    {
      headers: {
        'X-Goog-Api-Key': key
      }
    }
  );
  return res.json();
};

export default Speech;
