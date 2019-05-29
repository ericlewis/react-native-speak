/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  KeyboardAvoidingView,
  Picker,
  Slider,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

// in your own application this would be: `import Speech from 'react-native-speech';`
import Speech, { GoogleProvider, PollyProvider, Voice } from '../src';
import { useInput, usePicker, useSlider } from './utils';
const speech = new Speech([
  new GoogleProvider('AIzaSyC5f8uwyf1frmbIeLz0s5UfaHwDwGBBmgw'),
  new PollyProvider({
    signatureVersion: 'v4',
    region: 'us-east-1',
    accessKeyId: 'AKIAJIB47SDUAFNNGQWA',
    secretAccessKey: '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'
  })
]);

function fetchVoices(providerPicker: any, voicePicker: any) {
  const provider = providerPicker.selectedValue;
  const [voices, setVoices] = useState<Voice[]>([]);
  useEffect(() => {
    async function setup() {
      if (provider) {
        speech.setCurrentProvider(provider);
      }

      const res = await speech.getVoices();
      setVoices(res);
      voicePicker.onValueChange(res[0].id);
    }

    setup();
  }, [provider]);

  return voices;
}

function registerSpeechListeners(setActive: (active: boolean) => void) {
  useEffect(() => {
    const speechLoadingListener = speech.events.addListener(
      speech.constants.events.SPEECH_LOADING_EVENT,
      () => {
        setActive(true);
      }
    );

    const speechStartListener = speech.events.addListener(
      speech.constants.events.SPEECH_START_EVENT,
      () => {
        setActive(true);
      }
    );

    const speechEndListener = speech.events.addListener(
      speech.constants.events.SPEECH_END_EVENT,
      () => {
        setActive(false);
      }
    );

    const speechErrorListener = speech.events.addListener(
      speech.constants.events.SPEECH_ERROR_EVENT,
      error => {
        Alert.alert(error.message);
        setActive(false);
      }
    );

    return () => {
      speechLoadingListener.remove();
      speechStartListener.remove();
      speechEndListener.remove();
      speechErrorListener.remove();
    };
  });
}

interface Props {}
const App: React.FunctionComponent<Props> = () => {
  const [isSpeaking, setSpeaking] = useState(false);

  const textInput = useInput();
  const voicePicker = usePicker(undefined);
  const providerPicker = usePicker(speech.getCurrentProvider());
  const speakingRateSlider = useSlider(1.0);
  const voices = fetchVoices(providerPicker, voicePicker);

  registerSpeechListeners(setSpeaking);

  function speak() {
    const text = textInput.value;
    if (text) {
      speech.speak(text, {
        voiceId: voicePicker.selectedValue,
        speakingRate: speakingRateSlider.value
      });
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.input}>
          <TextInput
            {...textInput}
            placeholder="Type something to say..."
            onSubmitEditing={speak}
          />
        </View>
        <Button
          title={isSpeaking ? 'Speaking...' : 'Say it!'}
          disabled={
            !textInput.value || textInput.value.length <= 0 || isSpeaking
          }
          onPress={speak}
        />
        <Slider {...speakingRateSlider} />
        <Picker {...providerPicker}>
          {speech.getProviders().map(provider => {
            return (
              <Picker.Item key={provider} label={provider} value={provider} />
            );
          })}
        </Picker>
        <Picker {...voicePicker}>
          {voices.map(voice => {
            const { id, name } = voice;
            return <Picker.Item key={id} label={name} value={id} />;
          })}
        </Picker>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('example', () => App);
