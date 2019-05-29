/**
 * @format
 */

import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  KeyboardAvoidingView,
  Picker,
  SafeAreaView,
  StyleSheet,
  Text,
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

interface Props {}
const App: React.FunctionComponent<Props> = () => {
  const textInput = useInput();

  const voicePicker = usePicker(undefined);
  const providerPicker = usePicker(speech.getCurrentProvider());

  const speakingRateSlider = useSlider(1.0, 2.0, 0.0);
  const pitchSlider = useSlider(0.0, 1.0, -1.0);
  const volumeSlider = useSlider(1.0);

  const voices = fetchVoices(providerPicker, voicePicker);

  const { active, error } = registerSpeechListeners();

  if (error) {
    Alert.alert(error.message);
  }

  function speak() {
    const text = textInput.value;
    if (text) {
      speech.speak(text, {
        voiceId: voicePicker.selectedValue,
        speakingRate: speakingRateSlider.value,
        volume: volumeSlider.value,
        pitch: pitchSlider.value
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.input}>
          <TextInput
            {...textInput}
            placeholder="Type something to say..."
            onSubmitEditing={speak}
            returnKeyType="done"
            enablesReturnKeyAutomatically
          />
        </View>
        <Button
          title={active ? 'Speaking...' : 'Speak'}
          disabled={!textInput.value || textInput.value.length <= 0 || active}
          onPress={speak}
        />
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Picker {...providerPicker} style={{ flex: 1 }}>
            {speech.getProviders().map(provider => {
              return (
                <Picker.Item key={provider} label={provider} value={provider} />
              );
            })}
          </Picker>
          <Picker {...voicePicker} style={{ flex: 1.25 }}>
            {voices.map(voice => {
              const { id, name } = voice;
              return <Picker.Item key={id} label={name} value={id} />;
            })}
          </Picker>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Slider {...speakingRateSlider} />
          <Text>Speaking Rate: {speakingRateSlider.value}</Text>
          <Slider {...pitchSlider} />
          <Text>Pitch: {pitchSlider.value}</Text>
          <Slider {...volumeSlider} />
          <Text>Volume: {volumeSlider.value}</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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

function registerSpeechListeners() {
  const [state, setState] = useState<{ active: boolean; error?: Error }>({
    active: false
  });

  useEffect(() => {
    const speechLoadingListener = speech.events.addListener(
      speech.constants.events.SPEECH_LOADING_EVENT,
      () => {
        setState({ active: true });
      }
    );

    const speechStartListener = speech.events.addListener(
      speech.constants.events.SPEECH_START_EVENT,
      () => {
        setState({ active: true });
      }
    );

    const speechEndListener = speech.events.addListener(
      speech.constants.events.SPEECH_END_EVENT,
      () => {
        setState({ active: false });
      }
    );

    const speechErrorListener = speech.events.addListener(
      speech.constants.events.SPEECH_ERROR_EVENT,
      error => {
        setState({ active: false, error });
      }
    );

    return () => {
      speechLoadingListener.remove();
      speechStartListener.remove();
      speechEndListener.remove();
      speechErrorListener.remove();
    };
  });

  return state;
}

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
