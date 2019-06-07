/**
 * @format
 */

import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Picker,
  Platform,
  SafeAreaView,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { Voice } from '../src';
import { speech } from './module';
import { useInput, usePicker, useSlider } from './utils';

interface Props {}
const App: React.FunctionComponent<Props> = () => {
  const textInput = useInput();

  const voicePicker = usePicker(undefined);
  const providerPicker = usePicker(speech.getCurrentProvider());

  const speakingRateSlider = useSlider(1.0, 2.0, 0.0);
  const pitchSlider = useSlider(0.0, 1.0, -1.0);
  const volumeSlider = useSlider(1.0);

  const voices = useVoices(providerPicker, voicePicker);
  const outputs = useOutputs();
  const [preferredOutputIndex, setPreferredOutputIndex] = useState();

  const { active, error } = useSpeechListeners();

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
        pitch: pitchSlider.value,
        codec: Platform.OS === 'ios' ? 'mp3' : 'pcm',
        preferredOutput: outputs[preferredOutputIndex]
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'row'
        }}
      >
        {Platform.OS === 'ios' ? (
          <SegmentedControlIOS
            values={outputs}
            selectedIndex={preferredOutputIndex || outputs.length - 1}
            onChange={({ nativeEvent: { selectedSegmentIndex } }) => {
              setPreferredOutputIndex(selectedSegmentIndex);
            }}
            style={{ flex: 1 }}
          />
        ) : (
          <Picker
            onValueChange={(_, idx) => {
              setPreferredOutputIndex(idx);
            }}
            selectedValue={preferredOutputIndex || outputs.length - 1}
            style={{ flex: 1.25 }}
          >
            {outputs.map((output, idx) => {
              return <Picker.Item key={idx} label={output} value={idx} />;
            })}
          </Picker>
        )}
      </View>
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
    </SafeAreaView>
  );
};

function useOutputs() {
  const [outputs, setOutputs] = useState<string[]>([]);
  useEffect(() => {
    async function setup() {
      const res = await speech.getOutputs();
      setOutputs(res);
    }

    setup();
  }, []);

  return outputs;
}

function useVoices(providerPicker: any, voicePicker: any) {
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

function useSpeechListeners() {
  const [state, setState] = useState<{ active: boolean; error?: Error }>({
    active: false
  });

  useEffect(() => {
    const speechLoadingListener = speech.events.addListener(
      speech.constants.events.SPEECH_LOADING,
      () => {
        setState({ active: true });
      }
    );

    const speechStartListener = speech.events.addListener(
      speech.constants.events.SPEECH_START,
      () => {
        setState({ active: true });
      }
    );

    const speechEndListener = speech.events.addListener(
      speech.constants.events.SPEECH_END,
      () => {
        setState({ active: false });
      }
    );

    const speechErrorListener = speech.events.addListener(
      speech.constants.events.SPEECH_ERROR,
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
